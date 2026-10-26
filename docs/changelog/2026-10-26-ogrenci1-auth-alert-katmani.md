# Auth ve Alert katmanı tamamlandı

- **Tarih:** 2026-10-26
- **Yazan:** Öğrenci 1
- **Agent:** Claude Code
- **Dal (branch):** henüz git reposu yok
- **Rubrik maddesi:** Madde 3, 4, 6

## Ne değişti
- `AuthContext` + `useAuth()`: login, register, logout; oturum `localStorage` (`eas_session`) ile kalıcı; `password` alanı context'e ve storage'a girmez.
- `AlertContext` + `useAlert()`: `showAlert(message, type)` toast'ları ve `confirm({...}) → Promise<boolean>` onay penceresi. `ToastAlert` ve `Modal` bileşenleri Provider içinde render edilir.
- `ProtectedRoute` (allowedRoles, girişsiz → `/login` + `state.from`, yanlış rol → `/unauthorized`) ve yeni `GuestRoute` (girişli kullanıcıyı `state.from` veya rol paneline yönlendirir).
- `Layout` + `Navbar` + `Sidebar`: menü `MENU_ITEMS`'dan role göre üretiliyor, NavLink `end` ile aktif link.
- `Login` ve `Register` sayfaları: düz form, `validators.js` ile alan bazlı hata, hata/başarı toast'ları. Register sadece employee açar ve otomatik giriş yapar.
- `validators.js`, `dateUtils.js` (`toLocalIso`, `toDateStr`), `authService.js`, `userService.js` (temel CRUD) yazıldı.
- `api.js`'e interceptor: json-server kapalıysa anlaşılır hata mesajı.
- `App.jsx`: `AlertProvider > AuthProvider > BrowserRouter`; tüm employee/admin rotaları `ProtectedRoute` + `Layout` altında.
- `vite.config.js`: `optimizeDeps.include` ile ilk açılıştaki "optimized dependencies changed, reloading" engellendi.
- `.oxlintrc.json`: `useAuth`/`useAlert` export'ları fast-refresh uyarısından muaf.
- **Bulunan ve düzeltilen hata:** Login sayfasının `navigate(from)` çağrısı ile GuestRoute'un `Navigate`'i yarışıyor, kullanıcı `/admin/payroll` yerine `/admin`'e düşüyordu. Yönlendirme tek noktaya (GuestRoute) taşındı.

## Değişen / eklenen dosyalar
- `src/context/AuthContext.jsx`, `src/context/AlertContext.jsx`
- `src/components/common/ProtectedRoute.jsx`, `GuestRoute.jsx` (yeni), `Layout.jsx` + `Layout.css`, `Navbar.jsx`, `Sidebar.jsx`, `ToastAlert.jsx` + `.css`, `Modal.jsx` + `.css`
- `src/pages/auth/Login.jsx`, `Register.jsx`
- `src/services/api.js`, `authService.js`, `userService.js`
- `src/utils/validators.js`, `dateUtils.js` (yeni), `constants.js` (`HOME_BY_ROLE`, `TOAST_DURATION_MS` eklendi)
- `src/App.jsx`, `src/index.css` (buton varyantları, form sınıfları)
- `vite.config.js`, `.oxlintrc.json`
- `docs/ARCHITECTURE.md` (§3, §7, §8, §9), `AGENTS.md` (§4 import kuralı)

## Diğer öğrencileri etkileyen değişiklikler
- **Kullanıma hazır API'ler:** `useAuth()` → `{ user, isAuthenticated, isAdmin, loading, login, register, logout }`; `useAlert()` → `{ showAlert, confirm }`. İmzalar ARCHITECTURE.md §7.
- `Modal` bileşeni genel amaçlı: `open, title, children, footer, onClose`. Ö3 `EmployeeFormModal` için kullanabilir.
- `utils/dateUtils.js` → `toLocalIso()`, `toDateStr()`. Ö2 `clockIn/clockOut` değerlerini bununla üretmeli.
- `utils/` ve `services/` içinde `.js` import'ları uzantılı yazılır (`'./api.js'`). AGENTS.md §4.
- Yeni sayfa ekleyen öğrenci `constants.js`'teki `MENU_ITEMS`'a satır ekler, Sidebar otomatik güncellenir.
- Sayfa içinde `navigate()` ile role göre yönlendirme yazmayın; `HOME_BY_ROLE` ve GuestRoute bunu yapıyor.
- CSS yardımcıları: `.btn`, `.btn--ghost`, `.btn--danger`, `.card`, `.form*`, `.page`, `.muted`.

## Alınan kararlar
- Register sonrası otomatik giriş (ARCHITECTURE.md §7.1).
- `loading` şu an her zaman `false`; API'de ileride asenkron oturum kaynağı için tutuluyor.
- Login/Register'da görsel tasarım yapılmadı (ekip kararı: tasarım bizim görevimiz değil).

## Doğrulama
- `npm run lint` temiz, `npm run build` başarılı.
- Servis/validator testleri node ile canlı json-server'a karşı: 23/23.
- Headless Chrome (playwright-core, proje dışında) uçtan uca: 30/30. Kapsam: yönlendirmeler, form doğrulama, yanlış şifre, admin/employee giriş, `state.from`, sidebar menüleri, rol ihlali → 403, oturum kalıcılığı, çıkış, kayıt, mükerrer e-posta, 404, console hatası yok.
- Test betikleri projeye eklenmedi (ek bağımlılık gerekir). İstenirse `tests/` altına taşınabilir.

## Açık sorular / sonraki adım
- `confirm()` modalı E2E ile test edilmedi; tetikleyen bir UI henüz yok (Ö3 silme işlemi ilk kullanıcı olacak).
- ARCHITECTURE.md §13 açık kararlar hâlâ bekliyor.
- Ö1 için kalan: `README.md` kurulum bölümü güncel; git reposu kullanıcı link verince.
