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
//karya 
/// buraya iki tane fonksiyon ekliyorum javascript saf
//AMAÇ: tarih kontrolü tarihin Yıl-ay-gün şeklinde girlip girilmediği kontrolü

/*çift kontrol yapıyoruz çünkü javascript esnek tarih konusunda ve yuvarlama yapıyor

1 regex (biçim kontrolü) ==> gelenin 4-2-2 rakam olup olmadığına bakacak.
2 Formatı doğru olan ama takvimde karşılığı olmayan tarihleri yakalar. jav ascript tarih nesnesine 
çevirip ****isNaN  (is Not a Number)

İşte bu yüzden isNaN tek başına yetmez. Şu karşılaştırmayı yapmamız gerekir:

Kullanıcının girdiği: Ay = 04 (Nisan), Gün = 31
JavaScript'in ürettiği: Ay = 05 (Mayıs), Gün =1

Milisaniye Farkları:
Bir tarih "2026-11-15T09:00:00Z" formatında, diğeri "2026-11-15T09:00:00.500Z" formatında
 geldiğinde metin uzunlukları ve noktalama işaretleri alfabetik sıralamayı bozabilir.
new Date(isoA) ve new Date(isoB) kullandığınızda ise JavaScript her iki metni de
 evrensel tek bir birime (UTC milisaniye sayısına) çevirir ve gerçek matematiksel 
 büyüklük-küçüklük karşılaştırması yapar.
*/

/**
 * Verilen string "YYYY-MM-DD" formatında ve geçerli bir takvim günü mü kontrol eder.
 * @param {string} str  //string girer
 * @returns {boolean}  //boolean döner
 */
export function isValidDate(str) {
  if (typeof str !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(str)) {  //string yada tpi gün ay yıl değilse
    return false;  //false döner
  }
  const [year, month, day] = str.split('-').map(Number);  // - ile ayırır
  const date = new Date(year, month - 1, day); //month 0 dan indexleni royuzden -1
  return (
    date.getFullYear() === year &&  // /tüm yılı gün ay yıl karsılastırır
    date.getMonth() === month - 1 &&  // baslangıcta girilen değer ile aynı mı diye bakıyor
    date.getDate() === day
  );
}

/**
 * İlk tarihin ikinci tarihten önce olup olmadığını kontrol eder.
 * @param {string} isoA 
 * @param {string} isoB 
 * @returns {boolean}
 */
export function isBefore(isoA, isoB) {
  if (!isoA || !isoB) return false;   // eger iki tarihten biri bile bossa false dondurur
  const timeA = new Date(isoA).getTime();//milisaniye sayısına (Unix Timestamp) dönüştürür. Örneğin 1794722400000 gibi tek bir tam sayı elde edilir. Eğer verilen metin geçersiz bir tarihse .getTime() sonucu NaN (Sayı Değil) olur.
  const timeB = new Date(isoB).getTime();
  if (Number.isNaN(timeA) || Number.isNaN(timeB)) return false;  //Eğer isoA veya isoB bozuk bir metinse (örneğin "geçersiz-tarih" yollanmışsa) timeA veya timeB değeri NaN olur.
  return timeA < timeB;
}