import type { ReactNode } from 'react'

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineMarkdown(value: string) {
  let html = escapeHtml(value)
  html = html.replace(/\[([^\]]+)\]\((\/[^)]+|https?:\/\/[^)]+)\)/g, (_, label: string, href: string) => {
    const external = href.startsWith('http')
    return external
      ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
      : `<a href="${href}">${label}</a>`
  })
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  return html
}

function isTableSeparator(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

function renderTable(lines: string[]) {
  const rows = lines.map((line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()))
  const [header, ...body] = rows
  return `<div class="overflow-x-auto"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
}

/**
 * Deliberately small Markdown renderer for the trusted editorial source files.
 * It supports the syntax used by the SEO Manager drafts and keeps the content
 * server-rendered so answer engines can read it without client JavaScript.
 */
export function MarkdownBlogBody({ markdown }: { markdown: string }): ReactNode {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i += 1; continue }

    if (/^\|/.test(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const tableLines = [line, lines[i + 1]]
      i += 2
      while (i < lines.length && /^\|/.test(lines[i])) { tableLines.push(lines[i]); i += 1 }
      blocks.push(renderTable(tableLines.filter((_, index) => index !== 1)))
      continue
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(`<li>${inlineMarkdown(lines[i].replace(/^[-*]\s+/, ''))}</li>`); i += 1 }
      blocks.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(`<li>${inlineMarkdown(lines[i].replace(/^\d+\.\s+/, ''))}</li>`); i += 1 }
      blocks.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) { quote.push(lines[i].replace(/^>\s?/, '')); i += 1 }
      blocks.push(`<blockquote>${inlineMarkdown(quote.join(' '))}</blockquote>`)
      continue
    }

    const paragraph: string[] = [line]
    i += 1
    while (i < lines.length && lines[i].trim() && !/^(#{2,3})\s+/.test(lines[i]) && !/^[-*]\s+/.test(lines[i]) && !/^\d+\.\s+/.test(lines[i]) && !/^\|/.test(lines[i]) && !/^>\s?/.test(lines[i])) {
      paragraph.push(lines[i]); i += 1
    }
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`)
  }

  return <div dangerouslySetInnerHTML={{ __html: blocks.join('') }} />
}
