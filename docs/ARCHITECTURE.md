# Employee Attendance System – Mimari Dokümanı

> Bu doküman projenin **tek doğruluk kaynağıdır**. Kod yazmadan önce okunur.
> Mimariyi etkileyen her karar burada güncellenir ve `docs/changelog/` altına kayıt düşülür.

**Son güncelleme:** 2026-10-26 (Öğrenci 1) – klasör yapısı toparlandı (routes/, components/layout|ui, styles/, data/)

---

## 1. Proje Özeti

- **Ders:** Advanced Web Design with React
- **Konu:** Proje-8 Employee Attendance System
- **Tanım:** Çalışan giriş-çıkış kaydı, maaş hesabı için çalışma süresi hesaplama ve devam raporları.

Üç ana işlev:

1. Giriş-çıkış kaydı (clock in / clock out)
2. Çalışma süresi ve mesai hesabı, buna dayalı maaş özeti
3. Devam / devamsızlık raporları

Proje **basit** tutulacak. Veritabanı **lokalde** çalışacak, bulut servisi kullanılmayacak.

---

## 2. Teknoloji Yığını

| Katman      | Seçim                                   | Not                                                        |
|-------------|-----------------------------------------|------------------------------------------------------------|
| Build       | Vite 8 + React 19 (JavaScript, `.jsx`)  | TypeScript **yok**                                         |
| Routing     | `react-router-dom` 7.x (declarative)    | `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Outlet`   |
| HTTP        | `axios` 1.x                             | Tek instance: `src/services/api.js`                        |
| Veritabanı  | `json-server@0.17.4` (lokal)            | `data/db.json`, port **3001**, `--watch`                   |
| State       | React Context + hooks                   | Redux / Zustand **yok**                                    |
| Stil        | Düz CSS (`styles/index.css` + bileşen başına `.css`) | Karar bekliyor, bkz. §13                      |
| Dev araçları| `concurrently`, `oxlint` (Vite şablonu) | `npm run dev` hem Vite hem json-server'ı başlatır          |
| Tarih       | Yerleşik `Date`                         | `utils/` içinde tarih kütüphanesi **yok** (saf JS şartı)   |

**Reddedilen seçenekler:** Firebase, Supabase, uzak API. Sebep: DB lokal olacak.

---

## 3. Klasör Yapısı ve Sahiplik

`Ö1`, `Ö2`, `Ö3` = Öğrenci 1, 2, 3. `Ortak` = herkes dokunabilir, kural §11'de.

```
employee-attendance-system/
├── AGENTS.md                      # AI ajan yönergeleri (Ö1)
├── CLAUDE.md                      # Claude Code için AGENTS.md'yi içe aktarır (Ö1)
├── README.md                      # Kurulum, roller, ekran görüntüleri (Ö3; kurulum bölümü Ö1 yazar)
├── package.json                   # (Ortak)
├── index.html                     # Vite giriş HTML'i (Ö1)
├── vite.config.js                 # (Ö1)
├── .oxlintrc.json                 # Lint kuralları (Ö1)
├── .gitignore
├── data/
│   └── db.json                    # json-server veritabanı + seed (Ortak)
├── docs/
│   ├── ARCHITECTURE.md            # Bu dosya (Ö1 yönetir, herkes önerir)
│   └── changelog/                 # Her değişiklik için bir .md (herkes)
│       └── _TEMPLATE.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                   # React giriş noktası (Ö1)
    ├── App.jsx                    # Sadece provider'lar + <AppRoutes /> (Ö1)
    ├── routes/                    # Yönlendirme (Ö1)
    │   ├── AppRoutes.jsx          # Tüm rotalar tek yerde (Ortak: kendi bloğuna rota satırı eklenir)
    │   ├── ProtectedRoute.jsx     # Rol tabanlı rota koruması
    │   └── GuestRoute.jsx         # Girişliyse paneline yönlendirir; login/register için
    ├── styles/
    │   └── index.css              # Global stiller, CSS değişkenleri (Ortak)
    ├── assets/                    # Logo, ikon, görsel (Ortak)
    │
    ├── components/
    │   ├── layout/                # Girişli sayfaların çerçevesi (Ö1)
    │   │   ├── Layout.jsx         # Navbar + Sidebar + <Outlet/>
    │   │   ├── Navbar.jsx         # Üst bar: kullanıcı adı, rol, çıkış
    │   │   ├── Sidebar.jsx        # MENU_ITEMS'dan role göre menü
    │   │   └── Layout.css
    │   ├── ui/                    # Yeniden kullanılabilir arayüz parçaları
    │   │   ├── Modal.jsx (+.css)  # Genel modal; confirm() ve formlar için (Ö1)
    │   │   ├── ToastAlert.jsx (+.css) # Toast/pop-up uyarı (Ö1)
    │   │   └── StatSummaryCard.jsx# Özet kart: toplam saat, mesai vb. (Ö3)
    │   ├── attendance/
    │   │   ├── ClockInOutCard.jsx # Giriş/çıkış butonu + canlı sayaç (Ö2)
    │   │   └── AttendanceTable.jsx# Kayıt tablosu; readOnly prop'u ile (Ö2)
    │   └── admin/
    │       └── EmployeeFormModal.jsx # Çalışan ekle/düzenle formu (Ö3)
    │
    ├── context/
    │   ├── AuthContext.jsx        # Oturum, rol, login/register/logout (Ö1)
    │   └── AlertContext.jsx       # showAlert, confirm (Ö1)
    │
    ├── pages/
    │   ├── auth/
    │   │   ├── Login.jsx          # (Ö1)
    │   │   └── Register.jsx       # Sadece employee hesabı açar (Ö1)
    │   ├── employee/
    │   │   ├── EmployeeDashboard.jsx # Clock in/out + bugünkü özet (Ö2)
    │   │   └── MyRecords.jsx      # Kendi kayıtlarını filtreleme (Ö2)
    │   ├── admin/
    │   │   ├── AdminDashboard.jsx # Şirket geneli özet ve trendler (Ö3)
    │   │   ├── ManageEmployees.jsx# Çalışan CRUD (Ö3)
    │   │   ├── PayrollReport.jsx  # Bordro raporu (Ö3)
    │   │   └── AttendanceReport.jsx # Devam/devamsızlık raporu (Ö3)
    │   ├── Unauthorized.jsx       # 403 (Ö1)
    │   └── NotFound.jsx           # 404 (Ö1)
    │
    ├── services/
    │   ├── api.js                 # axios instance, baseURL (Ö1)
    │   ├── authService.js         # login, register (Ö1)
    │   ├── userService.js         # users CRUD (Ö1 oluşturur, Ö3 genişletir)
    │   └── attendanceService.js   # attendance CRUD (Ö2)
    │
    └── utils/                     # Saf JS, React bağımsız
        ├── constants.js           # Roller, rotalar, iş kuralı sabitleri (Ö1 oluşturur, Ortak)
        ├── dateUtils.js           # toLocalIso, toDateStr — §4 formatlarını üretir (Ö1, ortak kullanım)
        ├── validators.js          # Form doğrulama (Ö1; tarih doğrulamaları Ö2 ekler)
        ├── timeCalculations.js    # Süre, mesai, gece, devamsızlık hesabı (Ö2)
        └── salaryEngine.js        # Brüt/net bordro hesabı (Ö3)
```

**Not:** Önceki taslaktaki `services/db.js` adı `services/api.js` olarak değiştirildi. Dosya bir axios yapılandırmasıdır, DB değil.

---

## 4. Veri Modeli (`data/db.json`)

json-server iki koleksiyon sunar. `id` alanı **sayı** olup json-server tarafından otomatik üretilir.

### 4.1 `users`

| Alan         | Tip      | Zorunlu | Açıklama                                              |
|--------------|----------|---------|-------------------------------------------------------|
| `id`         | number   | otomatik| json-server üretir                                    |
| `name`       | string   | evet    | Ad Soyad                                              |
| `email`      | string   | evet    | Benzersiz, küçük harf saklanır, login anahtarı        |
| `password`   | string   | evet    | **Düz metin** (ders projesi; README'de belirtilecek)  |
| `role`       | string   | evet    | `"admin"` \| `"employee"`                             |
| `position`   | string   | hayır   | Unvan, örn. "Yazılım Geliştirici"                     |
| `hourlyRate` | number   | evet    | Saatlik brüt ücret (TRY). Admin için `0`              |
| `createdAt`  | string   | evet    | ISO 8601, örn. `"2026-10-26T10:00:00"`                |

### 4.2 `attendance`

| Alan       | Tip            | Zorunlu | Açıklama                                                     |
|------------|----------------|---------|--------------------------------------------------------------|
| `id`       | number         | otomatik|                                                              |
| `userId`   | number         | evet    | `users.id`                                                   |
| `date`     | string         | evet    | `"YYYY-MM-DD"`, clock-in gününün tarihi                      |
| `clockIn`  | string         | evet    | Yerel ISO, `"YYYY-MM-DDTHH:mm:ss"` (saat dilimi eki yok)     |
| `clockOut` | string \| null | evet    | Açık kayıtta `null`                                          |
| `note`     | string         | hayır   | Admin düzenlemesinde açıklama                                |

### 4.3 Veri kuralları

- Bir kullanıcının aynı anda **en fazla bir açık kaydı** (`clockOut === null`) olabilir.
- `clockOut` her zaman `clockIn`'den sonra olmalı.
- Gece yarısını geçen vardiya **tek kayıt** olarak tutulur; `date` giriş günüdür. Bölme işini `timeCalculations.js` yapar.
- Tarih karşılaştırmaları string olarak değil `new Date(...)` ile yapılır.
- Silinen kullanıcının attendance kayıtları da silinir (Ö3, `userService.remove` içinde).

### 4.4 Seed verisi

`data/db.json` ilk halinde şunları içerir. **Seed admin silinmez, şifresi değiştirilmez.**

```json
{
  "users": [
    { "id": 1, "name": "Sistem Yöneticisi", "email": "admin@eas.local", "password": "Admin123!", "role": "admin", "position": "Yönetici", "hourlyRate": 0, "createdAt": "2026-10-26T09:00:00" },
    { "id": 2, "name": "Ayşe Yılmaz", "email": "ayse@eas.local", "password": "Ayse123!", "role": "employee", "position": "Yazılım Geliştirici", "hourlyRate": 350, "createdAt": "2026-10-26T09:00:00" },
    { "id": 3, "name": "Mehmet Kaya", "email": "mehmet@eas.local", "password": "Mehmet123!", "role": "employee", "position": "Muhasebe Uzmanı", "hourlyRate": 300, "createdAt": "2026-10-26T09:00:00" }
  ],
  "attendance": [
    { "id": 1, "userId": 2, "date": "2026-10-20", "clockIn": "2026-10-20T09:02:00", "clockOut": "2026-10-20T18:10:00", "note": "" },
    { "id": 2, "userId": 2, "date": "2026-10-21", "clockIn": "2026-10-21T08:55:00", "clockOut": "2026-10-21T17:30:00", "note": "" },
    { "id": 3, "userId": 3, "date": "2026-10-20", "clockIn": "2026-10-20T09:15:00", "clockOut": "2026-10-20T17:45:00", "note": "" }
  ]
}
```

---

## 5. Roller ve Yetkiler

| İşlem                                   | admin | employee |
|-----------------------------------------|:-----:|:--------:|
| Login / logout                          |  ✔    |   ✔      |
| Register (yeni employee hesabı)         |  –    | herkes (girişsiz) |
| Clock in / clock out                    |  –    |   ✔ (sadece kendisi) |
| Kendi attendance kayıtlarını görme      |  –    |   ✔      |
| Tüm attendance kayıtlarını görme        |  ✔    |   –      |
| Attendance kaydı düzenleme / silme      |  ✔    |   **–**  |
| Çalışan ekleme / düzenleme / silme      |  ✔    |   –      |
| Bordro ve devam raporları               |  ✔    |   –      |
| Admin dashboard                         |  ✔    |   –      |

**Karar:** Çalışan kendi kaydını düzenleyemez ve silemez (sahte mesai önlemi). Admin clock in/out yapmaz.

---

## 6. Rotalar

| Path                 | Sayfa                              | Erişim         | Sahip |
|----------------------|------------------------------------|----------------|-------|
| `/`                  | Yönlendirme                        | role → `/admin` veya `/employee`; girişsiz → `/login` | Ö1 |
| `/login`             | `pages/auth/Login.jsx`             | Girişsiz (girişliyse dashboard'a yönlendir) | Ö1 |
| `/register`          | `pages/auth/Register.jsx`          | Girişsiz       | Ö1 |
| `/employee`          | `pages/employee/EmployeeDashboard` | employee       | Ö2 |
| `/employee/records`  | `pages/employee/MyRecords`         | employee       | Ö2 |
| `/admin`             | `pages/admin/AdminDashboard`       | admin          | Ö3 |
| `/admin/employees`   | `pages/admin/ManageEmployees`      | admin          | Ö3 |
| `/admin/payroll`     | `pages/admin/PayrollReport`        | admin          | Ö3 |
| `/admin/attendance`  | `pages/admin/AttendanceReport`     | admin          | Ö3 |
| `/unauthorized`      | `pages/Unauthorized.jsx`           | Herkes         | Ö1 |
| `*`                  | `pages/NotFound.jsx`               | Herkes         | Ö1 |

Rota sabitleri `utils/constants.js` içindeki `ROUTES` nesnesinden okunur; string literal rota yazılmaz.

Yönlendirme kuralları:
- Girişsiz kullanıcı korumalı sayfaya giderse → `/login` (gitmek istediği sayfa `state.from` ile taşınır).
- Yanlış rol → `/unauthorized`.

---

## 7. Global Sistemler (Ö1 sağlar, herkes kullanır)

### 7.1 `AuthContext` — `useAuth()`

```js
const { user, isAuthenticated, isAdmin, loading, login, register, logout } = useAuth();

// user: { id, name, email, role, position, hourlyRate }  → password asla context'e girmez
// isAuthenticated: boolean
// isAdmin: boolean  (user?.role === 'admin')
// loading: boolean  (şu an her zaman false; localStorage senkron. API'de ileride asenkron kaynak için duruyor)
// login(email, password)            => Promise<user>   hata: throw new Error('E-posta veya şifre hatalı')
// register({ name, email, password, position, hourlyRate }) => Promise<user>   role her zaman 'employee'; başarılı kayıt = otomatik giriş
// logout()                          => void
```

Oturum `localStorage` içinde `SESSION_KEY` (`"eas_session"`) anahtarıyla saklanır. Sayfa yenilenince oturum korunur.

### 7.2 `AlertContext` — `useAlert()`

```js
const { showAlert, confirm } = useAlert();

showAlert('Kayıt eklendi', 'success');
// type: 'success' | 'error' | 'warning' | 'info'   (varsayılan 'info')
// 3.5 sn sonra kendiliğinden kapanır, sağ üstte yığılır

const ok = await confirm({
  title: 'Çalışanı sil',
  message: 'Bu işlem geri alınamaz. Devam edilsin mi?',
  confirmText: 'Sil',        // varsayılan 'Onayla'
  cancelText: 'Vazgeç',      // varsayılan 'İptal'
  danger: true,              // kırmızı onay butonu
});
// ok: boolean
```

`window.alert`, `window.confirm` **kullanılmaz**. Tüm uyarılar bu API üzerinden.

`Modal` bileşeni tek başına da kullanılabilir (örn. Ö3 `EmployeeFormModal`):

```jsx
<Modal open={open} title="Çalışan Ekle" onClose={close} footer={<button className="btn">Kaydet</button>}>
  ...form...
</Modal>
```

Buton sınıfları: `.btn`, `.btn--ghost`, `.btn--danger`, `:disabled`. Form sınıfları: `.form`, `.form__field`, `.form__error`, `.form__actions`.

### 7.3 `ProtectedRoute`

```jsx
<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route element={<Layout />}>
    <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
  </Route>
</Route>
```

`allowedRoles` verilmezse sadece giriş kontrolü yapar. `loading` iken hiçbir şey render etmez (yanlış yönlendirmeyi önler).

`GuestRoute` tersidir: `/login` ve `/register` için. Girişli kullanıcıyı önce `location.state.from` (ProtectedRoute'un bıraktığı hedef), yoksa `HOME_BY_ROLE[role]`'a yönlendirir. **Login ve Register sayfaları `navigate()` çağırmaz**; tek yönlendirme noktası GuestRoute'tur. Aksi halde iki yönlendirme yarışır ve `state.from` kaybolur (E2E testinde yakalandı).
`/` rotası `routes/AppRoutes.jsx` içindeki `HomeRedirect` ile role göre yönlenir. `App.jsx` yalnızca provider'ları ve `BrowserRouter`'ı kurar; **yeni rota `routes/AppRoutes.jsx`'e eklenir**.

### 7.4 `Layout`

Üstte `Navbar`, solda `Sidebar`, ortada `<Outlet />`. Sidebar menüsü `user.role`'e göre `constants.js`'teki `MENU_ITEMS`'dan üretilir. Öğrenci 2 ve 3 yeni sayfa eklerken sadece `MENU_ITEMS`'a satır ekler.

---

## 8. Servis Katmanı

Bileşenler **asla** doğrudan `axios`/`fetch` çağırmaz; her şey `services/` üzerinden geçer.

### 8.1 `api.js` (Ö1)

```js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
export const api = axios.create({ baseURL: API_BASE_URL }); // http://localhost:3001
```

Response interceptor: json-server kapalıysa (`error.response` yok) hata mesajı `"Sunucuya ulaşılamıyor. json-server çalışıyor mu? (npm run server)"` olur. Diğer HTTP hataları olduğu gibi fırlatılır.

**Import kuralı:** `services/` ve `utils/` içindeki saf JS dosyaları birbirini **`.js` uzantısıyla** import eder (`from './api.js'`). Böylece dosyalar Vite olmadan doğrudan `node` ile test edilebilir. `.jsx` dosyaları uzantısız import kullanmaya devam eder.

### 8.2 `userService.js` (Ö1 oluşturur, Ö3 genişletir)

```js
getAll()                 // GET /users
getById(id)              // GET /users/:id
getByEmail(email)        // GET /users?email=...  → tek kayıt veya null
create(data)             // POST /users
update(id, data)         // PATCH /users/:id
remove(id)               // DELETE /users/:id  (+ ilgili attendance kayıtlarını siler, Ö3)
```

### 8.3 `authService.js` (Ö1)

```js
login(email, password)   // userService.getByEmail + şifre karşılaştırma; password alanı çıkarılmış user döner
register(data)           // email benzersiz mi kontrol → userService.create({ ...data, role: 'employee', createdAt })
```

### 8.4 `attendanceService.js` (Ö2)

```js
getByUser(userId, { from, to } = {})   // GET /attendance?userId=..&date_gte=..&date_lte=..&_sort=date&_order=desc
getAll({ from, to } = {})              // GET /attendance?...
getOpenRecord(userId)                  // clockOut === null olan kayıt veya null
clockIn(userId)                        // açık kayıt varsa throw; POST /attendance
clockOut(recordId)                     // PATCH /attendance/:id { clockOut: now }
update(id, data)                       // PATCH (admin)
remove(id)                             // DELETE (admin)
```

### 8.5 json-server hatırlatma

| İşlem   | HTTP                          |
|---------|-------------------------------|
| SELECT  | `GET /users`, `GET /users/1`, `GET /attendance?userId=2` |
| INSERT  | `POST /users`                 |
| UPDATE  | `PATCH /users/1` (kısmi), `PUT /users/1` (tam) |
| DELETE  | `DELETE /users/1`             |
| Filtre  | `?date_gte=2026-10-01&date_lte=2026-10-31` |
| Sırala  | `?_sort=date&_order=desc`     |

---

## 9. Utils (saf JS)

Kurallar: `React` import edilmez, DOM'a dokunulmaz, dış kütüphane yok, her fonksiyon saf ve test edilebilir.

### 9.1 `validators.js` (Ö1; tarih fonksiyonları Ö2)

```js
isValidEmail(email)                 // boolean
validatePassword(password)          // { valid, errors: string[] }  → min 8 karakter, 1 büyük harf (Türkçe dahil), 1 rakam
isRequired(value)                   // boolean
validateLoginForm(values)           // { valid, errors: { email?, password? } }
validateRegisterForm(values)        // { valid, errors: { name?, email?, password?, passwordConfirm?, hourlyRate? } }
PASSWORD_MIN_LENGTH                 // 8
// Ö2 ekler:
isValidDate(str)                    // "YYYY-MM-DD"
isBefore(isoA, isoB)
```

### 9.2 `timeCalculations.js` (Ö2)

```js
diffInMinutes(startIso, endIso)     // number
minutesToHours(minutes)             // number, 2 ondalık
formatDuration(minutes)             // "8s 30dk"
calcDailyHours(record)              // { regular, overtime, night }  saat cinsinden
sumHours(records)                   // { regular, overtime, night, total }
getWorkingDays(from, to)            // ["YYYY-MM-DD", ...]  Pzt–Cum
getAbsentDays(records, from, to)    // çalışma günü olup kaydı olmayan günler
hasOverlap(newRecord, existing)     // çakışma kontrolü
```

### 9.3 `salaryEngine.js` (Ö3)

```js
calcGrossSalary({ regularHours, overtimeHours, nightHours, hourlyRate })  // number
calcNetSalary(gross, deductionRate = DEDUCTION_RATE)                      // number
buildPayrollRow(user, records, from, to)   // { userId, name, regular, overtime, night, gross, net, absentDays }
```

### 9.4 `dateUtils.js` (Ö1, ortak kullanım)

```js
toLocalIso(date = new Date())       // "YYYY-MM-DDTHH:mm:ss" yerel saat, saat dilimi eki yok (clockIn/clockOut/createdAt için)
toDateStr(date = new Date())        // "YYYY-MM-DD"
```

### 9.5 `constants.js` (Ö1 oluşturur, herkes ekler)

```js
export const API_BASE_URL = 'http://localhost:3001';
export const SESSION_KEY = 'eas_session';
export const TOAST_DURATION_MS = 3500;
export const HOME_BY_ROLE = { admin: ROUTES.ADMIN, employee: ROUTES.EMPLOYEE };
export const ROLES = { ADMIN: 'admin', EMPLOYEE: 'employee' };
export const ALERT_TYPES = { SUCCESS: 'success', ERROR: 'error', WARNING: 'warning', INFO: 'info' };
export const ROUTES = { HOME: '/', LOGIN: '/login', REGISTER: '/register', EMPLOYEE: '/employee', MY_RECORDS: '/employee/records', ADMIN: '/admin', MANAGE_EMPLOYEES: '/admin/employees', PAYROLL: '/admin/payroll', ATTENDANCE_REPORT: '/admin/attendance', UNAUTHORIZED: '/unauthorized' };
export const MENU_ITEMS = [ /* { label, path, roles: ['admin'] } */ ];
export const WORK_HOURS_PER_DAY = 8;
export const OVERTIME_MULTIPLIER = 1.5;
export const NIGHT_SHIFT = { start: '22:00', end: '06:00', multiplier: 1.25 };
export const DEDUCTION_RATE = 0.15;
export const WORKING_DAYS = [1, 2, 3, 4, 5]; // Pzt–Cum (Date.getDay)
export const CURRENCY = 'TRY';
```

---

## 10. İş Kuralları

| Kural                        | Değer / Davranış                                                      | Durum          |
|------------------------------|-----------------------------------------------------------------------|----------------|
| Günlük normal çalışma        | 8 saat                                                                | Kabul          |
| Fazla mesai                  | Günde 8 saati aşan kısım, ×1.5                                        | Kabul          |
| Gece mesaisi                 | 22:00–06:00 arası saatler, ×1.25. Gece ve fazla mesai çakışırsa yüksek katsayı uygulanır | **Öneri, ekip onayı bekliyor** |
| Çalışma günleri              | Pazartesi–Cuma                                                        | Kabul          |
| Devamsızlık                  | Çalışma günü olup hiç kaydı olmayan gün. Gelecek günler sayılmaz      | Kabul          |
| Net maaş                     | Brüt × (1 − 0.15)                                                     | **Öneri**      |
| Açık kayıt                   | Kullanıcı başına en fazla 1; açık kayıt varken clock in engellenir    | Kabul          |
| Para birimi                  | TRY, `Intl.NumberFormat('tr-TR')`                                     | Kabul          |

---

## 11. Ekip, Rubrik ve Sahiplik

| Öğrenci | Alan                                      | Rubrik           | Sahip olduğu dosyalar                                                                 |
|---------|-------------------------------------------|------------------|---------------------------------------------------------------------------------------|
| Ö1      | Mimari, Auth, Global sistemler            | Madde 3, 4, 6    | Proje iskeleti, `context/*`, `routes/*`, `components/layout/*`, `components/ui/*` (StatSummaryCard hariç), `pages/auth/*`, `Unauthorized`, `NotFound`, `services/api.js`, `authService.js`, `userService.js` (temel), `utils/constants.js`, `utils/validators.js`, `utils/dateUtils.js`, `App.jsx`, `main.jsx`, `styles/index.css`, `AGENTS.md`, `docs/ARCHITECTURE.md` |
| Ö2      | Çalışan portalı, devamlılık motoru        | Madde 2, 5, 7    | `components/attendance/*`, `pages/employee/*`, `services/attendanceService.js`, `utils/timeCalculations.js`, `validators.js` tarih fonksiyonları |
| Ö3      | Admin paneli, bordro, raporlama           | Madde 5, 8, 9    | `components/admin/*`, `components/ui/StatSummaryCard.jsx`, `pages/admin/*`, `utils/salaryEngine.js`, `userService.js` genişletme, `README.md`, CSV/print |

**Ortak dosyalar** (küçük, bildirimli değişiklik): `routes/AppRoutes.jsx` (rota ekleme), `data/db.json` (seed), `utils/constants.js`, `styles/index.css`, `package.json`.

Ortak dosya kuralı: en küçük değişiklik yapılır, changelog'un "Diğer öğrencileri etkileyen değişiklikler" bölümüne yazılır.

Bağımlılık sırası: Ö1 iskeleti, context'leri ve `constants.js`'i teslim etmeden Ö2 ve Ö3 sayfa içeriğine başlayamaz. Ö1 bu yüzden diğerlerinin sayfalarını **boş placeholder** olarak oluşturur.

---

## 12. Git Çalışma Kuralları

- `main` dalı korumalıdır; doğrudan push yok, PR ile birleştirme.
- Dal adı: `ogrenci1/auth-context`, `ogrenci2/clock-in-out`, `ogrenci3/payroll-report`.
- Commit mesajı: `feat(auth): login sayfası`, `fix(attendance): çakışma kontrolü`, `docs: changelog`.
- Her PR en az bir changelog dosyası içerir.
- `node_modules`, `dist`, `.env` commit edilmez.

---

## 13. Açık Kararlar

| Konu                         | Seçenekler                                  | Karar veren | Durum   |
|------------------------------|---------------------------------------------|-------------|---------|
| Arayüz dili                  | Türkçe / İngilizce                          | Ekip        | Açık    |
| Stil yaklaşımı               | Düz CSS / CSS Modules / Tailwind            | Ekip        | Açık    |
| Gece mesaisi kuralı          | §10'daki öneri                              | Ö2 + ekip   | Açık    |
| Net maaş kesinti oranı       | %15 sabit / kademeli                        | Ö3 + ekip   | Açık    |
| Rubrik madde metinleri       | Madde 1–9'un tam metni buraya eklenecek     | Ö1          | Açık    |

Karar alındığında bu tablo güncellenir ve changelog yazılır.
