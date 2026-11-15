// Saf JS süre/mesai hesapları. React import edilmez, tarih kütüphanesi kullanılmaz.
// Sahip: Öğrenci 2
// TODO (Ö2): diffInMinutes, minutesToHours, formatDuration, calcDailyHours, sumHours,
//            getWorkingDays, getAbsentDays, hasOverlap — docs/ARCHITECTURE.md §9.2


/**
 * İki ISO zaman damgası arasındaki farkı dakika olarak hesaplar.
 * @param {string} startIso 
 * @param {string} endIso 
 * @returns {number} dakika cinsinden süre
 */
export function diffInMinutes(startIso, endIso) {  //giriş çıkış saati arasındaki farkı dışaaktaran fonk.
  if (!startIso || !endIso) return 0; //Parametrelerden biri bile boş (null, undefined, "") gelirse hata vermek yerine 0 dakika döndürür.
  const start = new Date(startIso).getTime(); //Başlangıç ve bitiş ISO metinlerini tarih nesnesine çevirip milisaniye dönüştürür.
  const end = new Date(endIso).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) { //baslangıc not a num.0 dondur
    return 0;
  }
  return Math.round((end - start) / (1000 * 60)); //farkı milisan. bulur
}

/**
 * Dakika değerini 2 ondalıklı saat değerine dönüştürür.
 * @param {number} minutes 
 * @returns {number} saat (örn: 90 -> 1.5, 500 -> 8.33)
 */
export function minutesToHours(minutes) {
  const mins = Number(minutes);
  if (Number.isNaN(mins) || mins <= 0) return 0; //eğer sayıya dönüşemiyorsa 0 dondur
  return Number((mins / 60).toFixed(2));   //saati bul 60 böl ve son 2 rakamı gösterir
}

/**
 * Dakikayı "8s 30dk" veya "45dk" şeklinde insan okuyabilir formata çevirir.
 * @param {number} minutes 
 * @returns {string}
 */
export function formatDuration(minutes) {  //turkce metne cevirir
  const mins = Math.max(0, Math.round(Number(minutes) || 0));  //hatalıysa 0 yapar
  const hours = Math.floor(mins / 60); //Dakikayı 60'a böler ve küsuratı aşağı yuvarlayarak tam saat kısmını bulu
  const remainingMins = mins % 60; // bolumdan kaklan kısmı bulur

  if (hours === 0 && remainingMins === 0) return '0dk'; //Hem saat hem dakika 0 ise -> '0dk' döner.
  if (hours === 0) return `${remainingMins}dk`;//Saat 0 ise (1 saatten az çalışılmışsa) -> Sadece dakikayı yazar: '45dk'.
  if (remainingMins === 0) return `${hours}s`;//Kalan dakika 0 ise (tam saat çalışılmışsa) -> Gereksiz yere '0dk' yazmaz, sadece saati yazar: '8s'.
  return `${hours}s ${remainingMins}dk`; //İkisi de sıfırdan büyükse -> İkisini yan yana yazar: '8s 30dk'



}
