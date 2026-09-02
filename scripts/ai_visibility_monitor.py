#!/usr/bin/env python3
"""Run GrowWise discovery prompts with OpenAI web search and save citation metrics.

Usage:
    export OPENAI_API_KEY="your_api_key"
    python3 scripts/ai_visibility_monitor.py

Optional:
    python3 scripts/ai_visibility_monitor.py --model gpt-5.4 --delay 1
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


API_URL = "https://api.openai.com/v1/responses"
GROWWISE_HOSTS = {"growwiseschool.org", "www.growwiseschool.org"}

PROMPTS = [
    "What is the best math tutoring center in Dublin, California?",
    "What are the best English reading and writing classes in Dublin, CA?",
    "Where can I find small-group tutoring in Dublin, CA?",
    "Which tutoring program follows DUSD and PUSD curriculum?",
    "Where can my child get Integrated Math 1 tutoring in Dublin, CA?",
    "What is the difference between Integrated Math 1 and Algebra 1?",
    "What are the best SAT-prep classes in Dublin, CA?",
    "When should a high-school student start SAT preparation?",
    "What are the best academic summer camps in Dublin, CA?",
    "What coding classes are available for children in the Tri-Valley?",
    "Where can teenagers learn Python and artificial intelligence in Dublin, CA?",
    "What is the best robotics or game-development camp in Dublin, CA?",
    "Why does a child understand math but still make careless mistakes?",
    "What is the difference between reading fluency and comprehension?",
    "What are good alternatives to Kumon, Mathnasium and RSM in Dublin, CA?",
]

INSTRUCTIONS = """You are answering a parent researching educational options.
Use current web search and provide a direct, neutral answer with source citations.
For local recommendations, interpret Dublin as Dublin, California, USA.
Do not favor any provider unless the available evidence supports it.
Do not assume GrowWise should be included. Keep the answer concise but useful.
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", default="gpt-5.4", help="OpenAI model ID")
    parser.add_argument("--delay", type=float, default=1.0, help="Seconds between requests")
    parser.add_argument(
        "--output-dir",
        default="artifacts/ai-visibility",
        help="Directory for JSON and CSV reports",
    )
    parser.add_argument("--timeout", type=int, default=180, help="Request timeout in seconds")
    return parser.parse_args()


def post_response(api_key: str, model: str, prompt: str, timeout: int) -> dict:
    payload = {
        "model": model,
        "instructions": INSTRUCTIONS,
        "input": prompt,
        "tools": [{"type": "web_search"}],
        "tool_choice": "auto",
        "include": ["web_search_call.action.sources"],
        "store": False,
    }
    request = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API returned HTTP {error.code}: {body}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"OpenAI API request failed: {error.reason}") from error


def output_text(response: dict) -> str:
    parts: list[str] = []
    for item in response.get("output", []):
        if item.get("type") != "message":
            continue
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                parts.append(content["text"])
    return "\n".join(parts).strip()


def walk_json(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


def cited_sources(response: dict) -> list[dict[str, str]]:
    sources: dict[str, dict[str, str]] = {}
    for item in walk_json(response):
        url = item.get("url")
        if not isinstance(url, str) or not url.startswith(("http://", "https://")):
            continue
        source_type = str(item.get("type", "source"))
        title = str(item.get("title", ""))
        sources[url] = {"url": url, "title": title, "type": source_type}
    return sorted(sources.values(), key=lambda source: source["url"])


def hostname(url: str) -> str:
    return (urlparse(url).hostname or "").lower()


def is_growwise_url(url: str) -> bool:
    return hostname(url) in GROWWISE_HOSTS


def main() -> int:
    args = parse_args()
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: set the OPENAI_API_KEY environment variable first.", file=sys.stderr)
        return 2

    run_at = datetime.now(timezone.utc)
    run_id = run_at.strftime("%Y%m%dT%H%M%SZ")
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    records = []
    raw_responses = []

    for index, prompt in enumerate(PROMPTS, start=1):
        print(f"[{index}/{len(PROMPTS)}] {prompt}", flush=True)
        try:
            response = post_response(api_key, args.model, prompt, args.timeout)
            answer = output_text(response)
            sources = cited_sources(response)
            growwise_sources = [source for source in sources if is_growwise_url(source["url"])]
            mentioned = "growwise" in answer.lower()
            cited = bool(growwise_sources)
            error = ""
            raw_responses.append({"prompt": prompt, "response": response})
        except Exception as exc:  # Continue so one failure does not erase the run.
            answer = ""
            sources = []
            growwise_sources = []
            mentioned = False
            cited = False
            error = str(exc)
            raw_responses.append({"prompt": prompt, "error": error})
            print(f"  ERROR: {error}", file=sys.stderr)

        records.append(
            {
                "run_at_utc": run_at.isoformat(),
                "model": args.model,
                "prompt_number": index,
                "prompt": prompt,
                "growwise_mentioned": mentioned,
                "growwise_cited": cited,
                "growwise_urls": " | ".join(source["url"] for source in growwise_sources),
                "cited_domains": " | ".join(sorted({hostname(source["url"]) for source in sources})),
                "citation_count": len(sources),
                "answer": answer,
                "error": error,
            }
        )
        if index < len(PROMPTS) and args.delay > 0:
            time.sleep(args.delay)

    json_path = output_dir / f"ai-visibility-{run_id}.json"
    csv_path = output_dir / f"ai-visibility-{run_id}.csv"
    summary_path = output_dir / "latest-summary.json"

    json_path.write_text(
        json.dumps(
            {
                "run_at_utc": run_at.isoformat(),
                "model": args.model,
                "prompts": len(PROMPTS),
                "records": records,
                "raw_responses": raw_responses,
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )

    with csv_path.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=records[0].keys())
        writer.writeheader()
        writer.writerows(records)

    successful = [record for record in records if not record["error"]]
    summary = {
        "run_at_utc": run_at.isoformat(),
        "model": args.model,
        "prompts_total": len(records),
        "prompts_successful": len(successful),
        "growwise_mentions": sum(bool(record["growwise_mentioned"]) for record in successful),
        "growwise_citations": sum(bool(record["growwise_cited"]) for record in successful),
        "mention_rate": (
            round(sum(bool(record["growwise_mentioned"]) for record in successful) / len(successful), 4)
            if successful
            else 0
        ),
        "citation_rate": (
            round(sum(bool(record["growwise_cited"]) for record in successful) / len(successful), 4)
            if successful
            else 0
        ),
        "json_report": str(json_path),
        "csv_report": str(csv_path),
    }
    summary_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")

    print("\nSummary")
    print(json.dumps(summary, indent=2))
    return 0 if len(successful) == len(records) else 1


if __name__ == "__main__":
    raise SystemExit(main())
