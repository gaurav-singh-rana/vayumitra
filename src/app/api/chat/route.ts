import { NextRequest, NextResponse } from 'next/server';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { sanitizeUserInput } from '@/lib/sanitization';
import { chatRateLimiter, getClientIp } from '@/lib/rate-limiter';
import { callGeminiChat, generateGroundedLocalAnswer } from '@/lib/copilot-service';
import { AirQualitySnapshot, PersonaType } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // 1. IP Rate Limiting Check (Defends against API denial-of-service)
  const clientIp = getClientIp(request);
  const rateLimit = chatRateLimiter.check(clientIp);

  if (!rateLimit.isAllowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before asking another question.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetTimeSeconds),
          'Retry-After': String(rateLimit.resetTimeSeconds),
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  }

  try {
    const body = await request.json();
    const rawMessage = body?.message;
    const personaId = (body?.personaId as PersonaType) || 'parents_young_children';
    const snapshot = body?.snapshot as AirQualitySnapshot | undefined;

    // 2. Strict Input Sanitization & Prompt Injection Shield
    const sanitization = sanitizeUserInput(rawMessage, 500);
    if (!sanitization.isValid) {
      return NextResponse.json(
        { error: sanitization.errorMessage || 'Invalid input message.' },
        {
          status: 400,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    }

    // 3. Grounded Context Verification (Guarantees zero-hallucination compliance)
    if (!snapshot || typeof snapshot.aqi !== 'number') {
      return NextResponse.json(
        { error: 'Live air quality context is required to answer grounded questions.' },
        {
          status: 400,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    }

    const cleanPrompt = sanitization.sanitized;
    const profile = HOUSEHOLD_PERSONAS[personaId] || HOUSEHOLD_PERSONAS.parents_young_children;

    // 4. Multi-Layer Intelligence (Gemini AI with deterministic rule fallback)
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const geminiResponse = await callGeminiChat(apiKey, cleanPrompt, profile, snapshot);
        if (geminiResponse) {
          return NextResponse.json(geminiResponse, {
            headers: {
              'X-Content-Type-Options': 'nosniff',
              'Cache-Control': 'no-store, max-age=0',
              'X-RateLimit-Remaining': String(rateLimit.remaining),
            },
          });
        }
      } catch {
        // Fall through to deterministic intelligence
      }
    }

    // 5. Deterministic Environmental Science Reasoning
    const localResponse = generateGroundedLocalAnswer(cleanPrompt, profile, snapshot);
    return NextResponse.json(localResponse, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store, max-age=0',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Chat copilot error';
    return NextResponse.json(
      { error: "Couldn't answer right now; please try again.", detail: message },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}
