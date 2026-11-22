/**
 * Enterprise Input Sanitization & Threat Shield
 * Protects against Cross-Site Scripting (XSS), Prompt Injection,
 * Prototype Pollution, and Remote Code Execution attack vectors.
 */

const DANGEROUS_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /system prompt/i,
  /(?:reveal|print|show|give|leak).*api[_\s]?key/i,
  /gemini_api_key/i,
  /print.*env/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /onerror\s*=/gi,
  /onload\s*=/gi,
  /\0/g, // Null-byte poisoning
  /__proto__/gi,
  /constructor\s*\[['"]prototype['"]\]/gi,
];

export interface SanitizationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}

/**
 * Sanitizes and validates user input queries before submission to the LLM or business logic.
 *
 * @param input Raw user input received over HTTP or UI form
 * @param maxLength Maximum allowable string length (defaults to 500 characters)
 * @returns SanitizationResult with valid status and escaped string
 */
export function sanitizeUserInput(input: unknown, maxLength = 500): SanitizationResult {
  if (typeof input !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      errorMessage: 'Input must be a valid text string.',
    };
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      sanitized: '',
      errorMessage: 'Input query cannot be empty.',
    };
  }

  if (trimmed.length > maxLength) {
    return {
      isValid: false,
      sanitized: trimmed.slice(0, maxLength),
      errorMessage: `Input exceeds maximum allowed length of ${maxLength} characters.`,
    };
  }

  // Check for dangerous injection or poisoning patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        sanitized: '',
        errorMessage: 'Invalid characters or disallowed instruction pattern detected.',
      };
    }
  }

  // Robust HTML entity escaping for output encoding
  const escaped = trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  return {
    isValid: true,
    sanitized: escaped,
  };
}

/**
 * Normalizes and sanitizes geographic search queries.
 *
 * @param city Raw location name or search query
 * @returns Cleaned alphanumeric string bounded to 100 characters
 */
export function sanitizeCityQuery(city: unknown): string {
  if (typeof city !== 'string') return '';
  return city
    .trim()
    .replace(/[^a-zA-Z0-9\s,-]/g, '')
    .slice(0, 100);
}
