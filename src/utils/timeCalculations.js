// Saf JS süre/mesai hesapları. React import edilmez, tarih kütüphanesi kullanılmaz.
// Sahip: KARYAA
// TODO (Ö2): diffInMinutes, minutesToHours, formatDuration, calcDailyHours, sumHours,
//            getWorkingDays, getAbsentDays, hasOverlap — docs/ARCHITECTURE.md §9.2

import { WORK_HOURS_PER_DAY, WORKING_DAYS } from './constants.js';
import { toDateStr } from './dateUtils.js';

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
/////////////////////aşama 1 in devamı/////////////////////////////////////
/**
 * Verilen bir kaydın 22:00 - 06:00 arasına denk gelen gece saatlerini hesaplar.
 * @param {string} startIso 
 * @param {string} endIso 
 * @returns {number} gece saati
 */
function calcNightHours(startIso, endIso) { //sadeec dosya içinde kulanılan yardımcı fonk.
  const start = new Date(startIso); //Gelen giriş (startIso) ve çıkış (endIso)
  const end = new Date(endIso);  // metinlerini Date nesnesine çevirir. 
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 0;  //Eğer tarihlerden biri geçersizse (NaN) veya çıkış saati giriş saatinden önce/eşitse hata vermemek için direkt 0 döndürür.
  }

  let nightMinutes = 0;  //gece vardiyası sayacı
  // Başlangıçtan bitişe dakika dakika değil, 15'er dakikalık adımlarla veya milisaniye aralıklarıyla kontrol
  // Hassas ve performanslı yöntem: Her dakikanın yerel saatine bakmak
  const current = new Date(start.getTime());
  while (current < end) {  //şimdiki saat çıkış saatine gelene kadar çalışan
    const hour = current.getHours();  //o anki dakikanın hangi saat olduğu 0-24
    // 22:00 - 23:59 arası VEYA 00:00 - 05:59 arası gece vardiyasıdır
    if (hour >= 22 || hour < 6) { //gecemesaisi
      nightMinutes += 1;
    }
    current.setMinutes(current.getMinutes() + 1);// saati 1 dk ileri sarar
  }

  return Number((nightMinutes / 60).toFixed(2)); // saate cevirdik ve 2 basamagını aldık
}

/**
 * Tek bir attendance kaydından normal, mesai ve gece saatlerini hesaplar.
 * @param {{ clockIn: string, clockOut: string | null }} record 
 * @returns {{ regular: number, overtime: number, night: number, total: number }}
 */
export function calcDailyHours(record) {  //Eğer kayıt boşsa veya çalışan 
  if (!record || !record.clockIn || !record.clockOut) {  //henüz çıkış yapmamışsa 
    return { regular: 0, overtime: 0, night: 0, total: 0 }; //(clockOut değeri null ise),
  } // hesaplama yapılamayacağı için tüm değerleri 0 olan varsayılan bir nesne döndürür.

  const totalMinutes = diffInMinutes(record.clockIn, record.clockOut); //toplan çalışma dk
  const totalHours = minutesToHours(totalMinutes); //saat değerini getirdi çağırdı diğer dosyadan

  const regular = Math.min(totalHours, WORK_HOURS_PER_DAY); //normal mesai saati
  const overtime = Number(Math.max(0, totalHours - WORK_HOURS_PER_DAY).toFixed(2)); //fazlası
  const night = calcNightHours(record.clockIn, record.clockOut);//gece

  return {
    regular: Number(regular.toFixed(2)),
    overtime,
    night,
    total: totalHours,
  };
}

/**
 * Birden çok attendance kaydının saatlerini toplar.
 * @param {Array<{ clockIn: string, clockOut: string | null }>} records 
 * @returns {{ regular: number, overtime: number, night: number, total: number }}
 */
export function sumHours(records) { //bir çalışanın 1 haftalık veya 1 aylık tüm 
  // griş çıkış  = array değilse yaad boşsa 0
  if (!Array.isArray(records) || records.length === 0) {
    return { regular: 0, overtime: 0, night: 0, total: 0 }; // bir çalışanın 1 haftalık-aylık kayıtlaır
  }

  return records.reduce( //Dizideki her bir elemanı tek tek gezip tek bir sonuç nesnesinde biriktiren (toplayan) JavaScript metodu
    (acc, record) => { //acc O ana kadar toplanmış saatleri tutan kümülatif sepettir.,record: Dizide o an sırası gelen tekil gün kaydıdır.
      const daily = calcDailyHours(record);
      acc.regular = Number((acc.regular + daily.regular).toFixed(2));
      acc.overtime = Number((acc.overtime + daily.overtime).toFixed(2));
      acc.night = Number((acc.night + daily.night).toFixed(2));
      acc.total = Number((acc.total + daily.total).toFixed(2));
      return acc;
    },
    { regular: 0, overtime: 0, night: 0, total: 0 }
  );
}


//////////////////////SON 3 FONKSİYONU//////////////////////
////getWorkingDay//////////getAbsentDay/////////hasOverlap/////////


/**
 * Belirtilen tarih aralığındaki çalışma günlerini (Pazartesi-Cuma) listeler.
 * @param {string} from "YYYY-MM-DD"
 * @param {string} to "YYYY-MM-DD"
 * @returns {string[]} ["YYYY-MM-DD", ...]
 */
export function getWorkingDays(from, to) { // iki tarih arası iş günü benirleme
  if (!from || !to) return []; //eğer iki tarihten biri boşsa boş döndür
  const start = new Date(from + 'T00:00:00'); //saat dilimi nesnesi
  const end = new Date(to + 'T00:00:00');
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return [];  //notanum. ise yada başlangıc>bitiş ise bos dondurur
  }

  const days = [];
  const current = new Date(start.getTime());  //boş day arrayi
  while (current <= end) { // başlangıç-bitiş gününü gezer
    const dayOfWeek = current.getDay(); // 0: Pazar, 1: Pazartesi ... 6: Cumartesi o gün haftanın kaçıncı günü
    if (WORKING_DAYS.includes(dayOfWeek)) {// 
      days.push(toDateStr(current));//days dizisine ekler formata cevirirp
    }
    current.setDate(current.getDate() + 1);//takvimi 1 gün ileri sarar
  }
  return days;
}

/**
 * Belirtilen aralıkta çalışanın gelmediği (devamsız) iş günlerini listeler.
 * Kural: Bugünden sonraki gelecek günler devamsızlık sayılmaz.
 * @param {Array<{ date: string }>} records 
 * @param {string} from "YYYY-MM-DD"
 * @param {string} to "YYYY-MM-DD"
 * @returns {string[]} Devamsız günlerin listesi ["YYYY-MM-DD", ...]
 */
export function getAbsentDays(records, from, to) { //yukarıdaki getWorkingDays fonksiyonunu
  const workingDays = getWorkingDays(from, to);// çağırarak belirtilen aralıktaki tüm iş günlerini alır.
  if (workingDays.length === 0) return [];// Hiç iş günü yoksa boş dizi döndürür

  const todayStr = toDateStr(new Date());//Bugünün tarihini "YYYY-MM-DD" formatında alır
  const attendedDates = new Set(//çalışanın geldiği gün kümesi set()
    (Array.isArray(records) ? records : []).map((r) => r.date || (r.clockIn && r.clockIn.slice(0, 10)))
  );//kayıttan saati çıkarıp günü tarihi alır. r date varsa direkt al yoksa ilk 10

  // Sadece bugüne kadar olan ve kaydı bulunmayan çalışma günlerini filtrele
  return workingDays.filter((day) => day <= todayStr && !attendedDates.has(day));
}//day <= todayStr: O gün bugün veya geçmiş bir gün olmalı (yarın veya haftaya olan günler henüz yaşanmadığı için elenir).
//!attendedDates.has(day): Çalışanın geldiği günler kümesinde (attendedDates) bu tarih bulunmamalı.
/**
 * Yeni veya güncellenen bir kaydın mevcut kayıtlarla saat çakışması yapıp yapmadığını denetler.
 * @param {{ id?: number, clockIn: string, clockOut?: string | null }} newRecord 
 * @param {Array<{ id: number, clockIn: string, clockOut: string | null }>} existingRecords 
 * @returns {boolean} Çakışma varsa true, yoksa false
 */
export function hasOverlap(newRecord, existingRecords) {
  if (!newRecord || !newRecord.clockIn || !Array.isArray(existingRecords)) {
    return false;//Yeni kayıtta giriş saati (clockIn) yoksa veya mevcut kayıtlar
  }// bir dizi değilse çakışma kontrolü yapılamayacağı için false döndürür.

  const newStart = new Date(newRecord.clockIn).getTime();
  const newEnd = newRecord.clockOut ? new Date(newRecord.clockOut).getTime() : null;

  if (Number.isNaN(newStart) || (newEnd !== null && Number.isNaN(newEnd))) {
    return false;
  }//Yeni kaydın başlangıç (newStart) ve varsa bitiş (newEnd) saatini milisaniyeye çevirir.
  // Eğer çalışan yeni giriş yapıyorsa ve henüz çıkış yapmadıysa newEnd değeri null olarak tutulur.
  return existingRecords.some((existing) => {//mevcut kayıtlardan 1ibile varsa true(çakışma)
    //yoksa false çakışma yok
    // // Kendi kendisiyle karşılaştırmayı atla (düzenleme işlemlerinde)
    if (newRecord.id && existing.id === newRecord.id) {
      return false;//mevcut kayıt saatini düzenlerken problem olmasın diye
    }

    const existStart = new Date(existing.clockIn).getTime();
    const existEnd = existing.clockOut ? new Date(existing.clockOut).getTime() : null;
    //Yeni kaydın başlangıç (newStart) ve varsa bitiş (newEnd) saatini milisaniyeye çevirir. 
    if (Number.isNaN(existStart)) return false;//Eğer çalışan yeni giriş yapıyorsa ve henüz çıkış yapmadıysa newEnd değeri null olarak tutulur.

    // Durum 1: Yeni kayıt açık bir kayıt (clockOut henüz yok, yeni clock-in yapılıyor)
    if (newEnd === null) {//çıkış yoksa çalışan içerde
      if (existEnd === null) return true; // Zaten başka bir açık kayıt var
      return newStart >= existStart && newStart < existEnd; // Yeni giriş eski bir aralığın içine düşüyor
    }

    // Durum 2: Mevcut kayıt açık bir kayıt
    if (existEnd === null) {
      return newEnd > existStart;
    }//Eklenmek istenen kapalı kaydın bitiş saati (newEnd), hala açık olan 
    //vardiyanın başlangıç saatinden (existStart) sonraya taşıyorsa çakışma vardır (true).


    // Durum 3: İki kapalı aralığın çakışma formülü [A, B] ve [C, D] -> A < D && B > C
    return newStart < existEnd && newEnd > existStart;
  });
}//Yeni kaydın başlangıcı mevcut kaydın bitişinden önceyse (newStart < existEnd) VE
// yeni kaydın bitişi mevcut kaydın başlangıcından sonraysa (newEnd > existStart),
//bu iki vardiya birbirinin üzerine biniyor demektir ve true döner.
// (Not: Biri tam 12:00'de bitip diğeri tam 12:00'de başlıyorsa < ve > kullanıldığı için çakışma sayılmaz, izin verilir.)