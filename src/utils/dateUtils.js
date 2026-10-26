// Tarih/saat biçimleme yardımcıları. Saf JS. docs/ARCHITECTURE.md §4 formatlarını üretir.
// Sahip: Öğrenci 1 (ortak kullanım; Ö2 hesaplamalarını timeCalculations.js'e yazar)

const pad = (n) => String(n).padStart(2, '0');

/** Yerel saatte "YYYY-MM-DDTHH:mm:ss" (saat dilimi eki yok). */
export function toLocalIso(date = new Date()) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

/** Yerel tarihte "YYYY-MM-DD". */
export function toDateStr(date = new Date()) {
  return toLocalIso(date).slice(0, 10);
}
