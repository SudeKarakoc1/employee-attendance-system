// Tek axios instance. Tüm servisler bunu kullanır; bileşenler doğrudan axios çağırmaz.
// Sahip: Öğrenci 1
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// json-server kapalıysa axios "Network Error" fırlatır; kullanıcıya anlaşılır mesaj ver.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Sunucuya ulaşılamıyor. json-server çalışıyor mu? (npm run server)'));
    }
    return Promise.reject(error);
  },
);
