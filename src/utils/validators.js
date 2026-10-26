// Saf JS form doğrulama. React import edilmez.
// Sahip: Öğrenci 1 (tarih fonksiyonlarını Öğrenci 2 ekler)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UPPER_RE = /[A-ZÇĞİÖŞÜ]/;
const DIGIT_RE = /\d/;

export const PASSWORD_MIN_LENGTH = 8;

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_RE.test(email.trim());
}

/** @returns {{ valid: boolean, errors: string[] }} */
export function validatePassword(password) {
  const value = typeof password === 'string' ? password : '';
  const errors = [];
  if (value.length < PASSWORD_MIN_LENGTH) errors.push(`En az ${PASSWORD_MIN_LENGTH} karakter olmalı`);
  if (!UPPER_RE.test(value)) errors.push('En az bir büyük harf içermeli');
  if (!DIGIT_RE.test(value)) errors.push('En az bir rakam içermeli');
  return { valid: errors.length === 0, errors };
}

/** @returns {{ valid: boolean, errors: Record<string, string> }} */
export function validateLoginForm({ email, password } = {}) {
  const errors = {};
  if (!isRequired(email)) errors.email = 'E-posta zorunlu';
  else if (!isValidEmail(email)) errors.email = 'Geçerli bir e-posta girin';
  if (!isRequired(password)) errors.password = 'Şifre zorunlu';
  return { valid: Object.keys(errors).length === 0, errors };
}

/** @returns {{ valid: boolean, errors: Record<string, string> }} */
export function validateRegisterForm({ name, email, password, passwordConfirm, hourlyRate } = {}) {
  const errors = {};

  if (!isRequired(name)) errors.name = 'Ad Soyad zorunlu';
  else if (String(name).trim().length < 3) errors.name = 'Ad Soyad en az 3 karakter olmalı';

  if (!isRequired(email)) errors.email = 'E-posta zorunlu';
  else if (!isValidEmail(email)) errors.email = 'Geçerli bir e-posta girin';

  if (!isRequired(password)) {
    errors.password = 'Şifre zorunlu';
  } else {
    const result = validatePassword(password);
    if (!result.valid) errors.password = result.errors.join(', ');
  }

  if (!isRequired(passwordConfirm)) errors.passwordConfirm = 'Şifre tekrarı zorunlu';
  else if (password !== passwordConfirm) errors.passwordConfirm = 'Şifreler eşleşmiyor';

  const rate = Number(hourlyRate);
  if (!isRequired(hourlyRate)) errors.hourlyRate = 'Saatlik ücret zorunlu';
  else if (Number.isNaN(rate) || rate <= 0) errors.hourlyRate = 'Saatlik ücret 0\'dan büyük bir sayı olmalı';

  return { valid: Object.keys(errors).length === 0, errors };
}

// TODO (Ö2): isValidDate(str), isBefore(isoA, isoB)
