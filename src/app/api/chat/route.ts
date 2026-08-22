import { NextRequest, NextResponse } from 'next/server';
import { clientIpFrom, isAllowed } from '@/lib/chatRateLimit';
import { evaluateGrowvyRequest } from '@/lib/growvyGuardrails';
import { isOriginAllowed } from '@/lib/requestGuard';

/** Whitelisted page context ids — must match `ChatPageContextId` in `chatbotPageContext.ts`. */
const ALLOWED_PAGE_CONTEXT_IDS = new Set([
  'default',
  'campsHub',
  'campsSummer',
  'campsAcademicSummer',
  'campsWinter',
  'campSlug',
  'assessment',
  'enroll',
  'contact',
  'courseTopic',
]);

/**
 * Input limits for a narrowly scoped GrowWise information assistant.
 */
const MAX_USER_MESSAGE_CHARS = Number(process.env.CHAT_MAX_USER_CHARS) || 600;
/** Hard ceiling on raw request body size before we attempt to parse JSON. */
const MAX_BODY_BYTES = 4 * 1024;

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    // Per-IP rate limit (P0). Done before we read the body so a flood of
    // oversized payloads still gets short-circuited.
    if (!isAllowed('chat', clientIpFrom(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    if (!isOriginAllowed(request)) {
      return bad('Invalid request.', 403);
    }

    // Read raw text first so we can enforce a body-size ceiling before JSON
    // parsing pulls a multi-MB payload into memory.
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return bad('Payload too large.', 413);
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return bad('Invalid JSON body.');
    }

    const messageRaw = body.message;
    const message =
      typeof messageRaw === 'string' ? messageRaw.trim() : '';
    if (!message) {
      return bad('Message is required and must be a string');
    }
    if (message.length > MAX_USER_MESSAGE_CHARS) {
      return bad(
        `Message too long. Limit is ${MAX_USER_MESSAGE_CHARS} characters.`,
      );
    }

    // Conversation history and page hints from the browser are deliberately
    // ignored. They cannot authorize an answer or become model instructions.
    const pageContextId = body.pageContextId;
    const ctxOk =
      typeof pageContextId === 'string' && ALLOWED_PAGE_CONTEXT_IDS.has(pageContextId);
    const safePageContextId = ctxOk ? pageContextId : 'default';
    const decision = evaluateGrowvyRequest(message, safePageContextId);

    return NextResponse.json({
      message: decision.message,
      isFallback: false,
      disposition: decision.disposition,
      formType: decision.formType,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          "I'm experiencing technical difficulties. Please try again or contact GrowWise directly for assistance.",
      },
      { status: 500 },
    );
  }
}

// Growvy is same-origin only; do not advertise cross-origin chat access.
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}
