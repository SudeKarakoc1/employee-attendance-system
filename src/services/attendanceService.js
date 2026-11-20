// Sahip: Öğrenci 2
// TODO (Ö2): getByUser, getAll, getOpenRecord, clockIn, clockOut, update, remove — docs/ARCHITECTURE.md §8.4
// attendance koleksiyonu CRUD işlemleri. docs/ARCHITECTURE.md §8.4
// Sahip: Öğrenci 2 - karya-karya

import { api } from './api.js'; //axios öğrenci1in hazırladığından çek
import { toLocalIso, toDateStr } from '../utils/dateUtils.js';
//tarihleri yerel iso formatına çevir gün saat
/**
 * Belirli bir kullanıcının attendance kayıtlarını getirir. Tarihe göre yeniden eskiye sıralar.
 * @param {number} userId 
 * @param {{ from?: string, to?: string }} [filters] 
 * @returns {Promise<Array>}
 */
export async function getByUser(userId, { from, to } = {}) {
  const params = {
    userId,
    _sort: 'date',
    _order: 'desc',
  };
  if (from) params.date_gte = from;
  if (to) params.date_lte = to;

  const { data } = await api.get('/attendance', { params });
  return data;
}

/**
 * Tüm kullanıcıların attendance kayıtlarını filtreli veya filtresiz getirir.
 * @param {{ from?: string, to?: string }} [filters] 
 * @returns {Promise<Array>}
 */
export async function getAll({ from, to } = {}) { // async function:
  // Sunucuya internet üzerinden istek atılacağı ve cevap bekleneceği için fonksiyon asenkron (async)
  // Birinci parametre olarak bir filtre nesnesi alır.
  // Eğer çağıran kişi hiç filtre göndermezse (getAll() gibi), kodun çökmemesi için
  // varsayılan olarak boş bir nesne (= {}) atanır.
  const params = { // URL sorgu parametreleri
    _sort: 'date', // Kayıtları tarihe göre azalan
    _order: 'desc', // (en yeniden en eskiye) şekilde sırala.
  };
  if (from) params.date_gte = from; // GreaterThanorEqual: Başlangıç tarihine eşit veya büyük olanları getir.
  if (to) params.date_lte = to; // LessThanorEqual: Bitiş tarihine eşit veya küçük olanları getir.

  const { data } = await api.get('/attendance', { params });
  return data;
} // await api.get(...): /attendance?_sort=date&_order=desc adresine
// HTTP GET isteği atar ve sunucudan yanıt gelene kadar bekler (await).
// Axios yanıt nesnesinin içinden sadece veriyi (data) ayıklar (Destructuring) ve dışarı döndürür.
/**
 * Kullanıcının henüz çıkış yapılmamış (clockOut: null) açık kaydını bulur.
 * @param {number} userId 
 * @returns {Promise<object|null>} Açık kayıt nesnesi veya null
 *///çıkış yapılmamış kaydı bulma
export async function getOpenRecord(userId) { //Çalışanın açık (çıkış yapılmamış) kaydını bulma
  const { data } = await api.get('/attendance', {
    params: { userId },
  });
  // json-server üzerinde güvenilir kontrol için JS tarafında açık kaydı buluyoruz
  const openRecord = data.find((record) => record.clockOut === null);
  return openRecord || null;
}

/**
 * Çalışan için yeni bir giriş kaydı (Clock In) açar.
 * Açık kayıt varken tekrar giriş yapılmasını engeller.
 * @param {number} userId 
 * @returns {Promise<object>} Oluşturulan kayıt
 */
export async function clockIn(userId) {
  const openRecord = await getOpenRecord(userId);
  if (openRecord) {
    throw new Error('Zaten açık bir giriş kaydınız bulunmaktadır. Önce çıkış yapmalısınız.');
  }

  const now = new Date();//o naki sistem saatini alır,veri tabanına
  const newRecord = {//eklenecek yeni veriyi hazırlar
    userId: Number(userId),
    date: toDateStr(now),
    clockIn: toLocalIso(now),
    clockOut: null,//henüz çıkış yok yapılmamış
    note: '',
  };

  const { data } = await api.post('/attendance', newRecord);
  return data;//api.post(...):nesneyi /attendance adresine HTTP POST 
  //isteği gönderdi veritabanına kayıt ekledi 
  //ve sunucunun (ID atayarak) döndürdüğü son halini geri verir.
}
/**
 * Açık olan kaydı çıkış saatiyle (Clock Out) kapatır.
 * @param {number} recordId 
 * @returns {Promise<object>} Güncellenen kayıt
 */
export async function clockOut(recordId) {//mesaiden çıkış yapmak
  const now = new Date();
  const patchData = {//sadece verilen alanı günceller
    clockOut: toLocalIso(now),
  };//api.patch(...): Veritabanındaki mevcut kaydın tamamını ezmeden,
  // sadece değişen alanını (clockOut) günceller (PUT tüm nesneyi 
  //değiştirirken, PATCH kısmi güncelleme yapar).
  // İlgili kaydın clockOut değerine o anki saati yazıp vardiyayı kapatır.

  const { data } = await api.patch(`/attendance/${recordId}`, patchData);
  return data;
}

/**
 * Bir attendance kaydını günceller (Admin kullanımı için).
 * @param {number} id 
 * @param {object} data 
 * @returns {Promise<object>}
 */
export async function update(id, data) {//yönetici düzenleme silme işlemleri
  const { data: updated } = await api.patch(`/attendance/${id}`, data);
  return updated;//{data:updated}___fonksiyon parametresinin ismi{data}
  //aynı olduğu için karışmasın diye axiostan gelen ismi {updated} yaptık
}

/**
 * Bir attendance kaydını siler (Admin kullanımı için).
 * @param {number} id 
 * @returns {Promise<void>}
 */
export async function remove(id) {//kalıcı olarak sunucudan siler
  await api.delete(`/attendance/${id}`);
}//await, İngilizce "bekle" anlamına gelen bir JavaScript anahtar kelimesidir. Sunucuya atılan bir isteğin cevabı gelene kadar kodun bir alt satıra geçmesini durdurup beklemesini sağlar.
