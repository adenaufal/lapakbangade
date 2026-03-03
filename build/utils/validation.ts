export interface ValidationResult<T> {
  valid: boolean;
  value?: T;
  error?: string;
}

export interface AmountValidationOptions {
  min?: number;
  max?: number;
  allowDecimal?: boolean;
}

export interface TextSanitizationOptions {
  maxLength?: number;
  allowNewLines?: boolean;
}

const DEFAULT_AMOUNT_MIN = 1;
const DEFAULT_AMOUNT_MAX = 1_000_000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu;

function result<T>(valid: true, value: T): ValidationResult<T>;
function result<T>(valid: false, value: undefined, error: string): ValidationResult<T>;
function result<T>(valid: boolean, value?: T, error?: string): ValidationResult<T> {
  if (valid) {
    return { valid: true, value };
  }

  return { valid: false, error };
}

export function sanitizeText(
  input: string,
  options: TextSanitizationOptions = {},
): string {
  const maxLength = options.maxLength ?? 300;
  const allowNewLines = options.allowNewLines ?? false;
  const withoutControlChars = input.replace(CONTROL_CHARS_REGEX, '');
  const normalized = allowNewLines
    ? withoutControlChars.trim()
    : withoutControlChars.replace(/\s+/gu, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return normalized.slice(0, maxLength);
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#39;');
}

export function validateEmail(input: string): ValidationResult<string> {
  const normalized = sanitizeText(input, { maxLength: 254 });
  if (!normalized) {
    return result(false, undefined, 'Email is required');
  }

  if (!EMAIL_REGEX.test(normalized)) {
    return result(false, undefined, 'Email format is invalid');
  }

  return result(true, normalized.toLowerCase());
}

export function validateAmount(
  input: number | string,
  options: AmountValidationOptions = {},
): ValidationResult<number> {
  const min = options.min ?? DEFAULT_AMOUNT_MIN;
  const max = options.max ?? DEFAULT_AMOUNT_MAX;
  const allowDecimal = options.allowDecimal ?? false;

  const raw = typeof input === 'number' ? String(input) : input;
  const normalized = sanitizeText(raw, { maxLength: 40 }).replace(/,/gu, '');
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    return result(false, undefined, 'Amount must be a valid number');
  }

  if (!allowDecimal && !Number.isInteger(parsed)) {
    return result(false, undefined, 'Amount must be an integer');
  }

  if (parsed < min) {
    return result(false, undefined, `Amount must be at least ${min}`);
  }

  if (parsed > max) {
    return result(false, undefined, `Amount must be at most ${max}`);
  }

  return result(true, parsed);
}

export function validateBankAccountNumber(input: string): ValidationResult<string> {
  const normalized = sanitizeText(input, { maxLength: 32 }).replace(/\s+/gu, '');
  const digitsOnly = normalized.replace(/[^\d]/gu, '');

  if (!digitsOnly) {
    return result(false, undefined, 'Account number is required');
  }

  if (digitsOnly.length < 8 || digitsOnly.length > 20) {
    return result(false, undefined, 'Account number must be 8-20 digits');
  }

  return result(true, digitsOnly);
}

export function validateTransactionReference(input: string): ValidationResult<string> {
  const normalized = sanitizeText(input, { maxLength: 64 });

  if (!normalized) {
    return result(false, undefined, 'Transaction reference is required');
  }

  if (!/^[a-z0-9._-]+$/iu.test(normalized)) {
    return result(false, undefined, 'Transaction reference contains unsupported characters');
  }

  return result(true, normalized);
}

/**
 * Normalizes potentially untrusted identifiers (IP, user ID, etc.)
 * for use as stable keys in in-memory stores.
 */
export function normalizeClientKey(input: string): string {
  const cleaned = sanitizeText(input, { maxLength: 100 });
  const lower = cleaned.toLowerCase();

  if (!lower) {
    return 'anonymous';
  }

  return lower.replace(/[^a-z0-9:._-]/gu, '_');
}
