// Giriş ve kayıt. docs/ARCHITECTURE.md §8.3
// Sahip: Öğrenci 1
import * as userService from './userService.js';
import { ROLES } from '../utils/constants.js';
import { toLocalIso } from '../utils/dateUtils.js';

/** password alanı çıkarılmış kullanıcı. Context'e ve localStorage'a sadece bu girer. */
function toSafeUser(user) {
  const safe = { ...user };
  delete safe.password;
  return safe;
}

export async function login(email, password) {
  const user = await userService.getByEmail(email);
  if (!user || user.password !== password) {
    throw new Error('E-posta veya şifre hatalı');
  }
  return toSafeUser(user);
}

/** Her zaman employee rolüyle kayıt açar. Admin db.json seed'inden gelir. */
export async function register({ name, email, password, position = '', hourlyRate }) {
  const existing = await userService.getByEmail(email);
  if (existing) {
    throw new Error('Bu e-posta adresi zaten kayıtlı');
  }
  const created = await userService.create({
    name: String(name).trim(),
    email,
    password,
    role: ROLES.EMPLOYEE,
    position: String(position).trim(),
    hourlyRate: Number(hourlyRate),
    createdAt: toLocalIso(),
  });
  return toSafeUser(created);
}
