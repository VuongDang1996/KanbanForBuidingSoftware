/**
 * passwordValidation.js
 * Universal Client & Server Validation Helpers
 * Free of Node.js-specific modules for clean browser bundling
 */

export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'dispostable.com',
  'getairmail.com',
  'fakemailgenerator.com'
]);

/**
 * Validates email format and blocks disposable domains
 * @param {string} email
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmailAddress(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email không được để trống' };
  }
  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { valid: false, error: 'Định dạng email không hợp lệ' };
  }

  const domain = cleanEmail.split('@')[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, error: 'Hệ thống không chấp nhận địa chỉ email dùng một lần (disposable email)' };
  }

  return { valid: true };
}

/**
 * Evaluates password strength: min 8 chars, 1 uppercase, 1 lowercase, 1 number
 * @param {string} password
 * @returns {{ valid: boolean, score: number, feedback: string[] }}
 */
export function validatePasswordStrength(password) {
  const feedback = [];
  let score = 0;

  if (!password || typeof password !== 'string') {
    return { valid: false, score: 0, feedback: ['Mật khẩu không được để trống'] };
  }

  if (password.length >= 8) score += 25;
  else feedback.push('Mật khẩu phải có tối thiểu 8 ký tự');

  if (/[a-z]/.test(password)) score += 25;
  else feedback.push('Cần ít nhất một chữ cái viết thường (a-z)');

  if (/[A-Z]/.test(password)) score += 25;
  else feedback.push('Cần ít nhất một chữ cái viết hoa (A-Z)');

  if (/[0-9]/.test(password)) score += 25;
  else feedback.push('Cần ít nhất một chữ số (0-9)');

  if (/[^a-zA-Z0-9]/.test(password)) score += 10; // Bonus for special character

  return {
    valid: feedback.length === 0,
    score: Math.min(100, score),
    feedback
  };
}
