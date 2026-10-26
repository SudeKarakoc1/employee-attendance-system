// users koleksiyonu CRUD. docs/ARCHITECTURE.md §8.2
// Sahip: Öğrenci 1 oluşturdu, Öğrenci 3 genişletir.
import { api } from './api.js';

const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase();

export async function getAll() {
  const { data } = await api.get('/users');
  return data;
}

export async function getById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

/** Tek kullanıcı veya null döner. */
export async function getByEmail(email) {
  const { data } = await api.get('/users', { params: { email: normalizeEmail(email) } });
  return data[0] ?? null;
}

export async function create(user) {
  const { data } = await api.post('/users', { ...user, email: normalizeEmail(user.email) });
  return data;
}

export async function update(id, patch) {
  const body = patch.email ? { ...patch, email: normalizeEmail(patch.email) } : patch;
  const { data } = await api.patch(`/users/${id}`, body);
  return data;
}

export async function remove(id) {
  // TODO (Ö3): kullanıcının attendance kayıtlarını da sil (ARCHITECTURE.md §4.3)
  await api.delete(`/users/${id}`);
}
