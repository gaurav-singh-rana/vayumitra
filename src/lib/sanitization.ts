/**
 * Input Sanitization & Security Utilities
 * Protects against XSS, prompt injection, and excessive payload sizes.
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
];

export interface SanitizationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}

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

  // Check for dangerous injection patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        sanitized: '',
        errorMessage: 'Invalid characters or disallowed instruction pattern detected.',
      };
    }
  }

  // Basic HTML entity escaping
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

export function sanitizeCityQuery(city: unknown): string {
  if (typeof city !== 'string') return '';
  return city
    .trim()
    .replace(/[^a-zA-Z0-9\s,-]/g, '')
    .slice(0, 100);
}
