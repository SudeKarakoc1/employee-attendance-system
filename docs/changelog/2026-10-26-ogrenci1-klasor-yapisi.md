# Klasör yapısı toparlandı

- **Tarih:** 2026-10-26
- **Yazan:** Öğrenci 1
- **Agent:** Claude Code
- **Dal (branch):** main (henüz başka kod yokken yapısal değişiklik; bundan sonra PR ile)
- **Rubrik maddesi:** Altyapı (tüm maddeleri dolaylı etkiler)

## Ne değişti
- `src/components/common/` kaldırıldı, içeriği üçe ayrıldı:
  - `src/components/layout/` → Layout, Navbar, Sidebar, Layout.css
  - `src/components/ui/` → Modal, ToastAlert, StatSummaryCard (+ css)
  - `src/routes/` → ProtectedRoute, GuestRoute
- Rotalar `App.jsx`'ten `src/routes/AppRoutes.jsx`'e çıkarıldı. `App.jsx` artık sadece provider'lar + `BrowserRouter` + `<AppRoutes />`.
- `src/index.css` → `src/styles/index.css`.
- `db.json` → `data/db.json`; `npm run server` scripti güncellendi.
- Taşımalar `git mv` ile yapıldı, dosya geçmişi korunuyor.
- `docs/ARCHITECTURE.md` (§2, §3, §4, §7, §11), `AGENTS.md` (§2, §5, §6), `README.md` yeni yollara göre güncellendi.

## Değişen / eklenen dosyalar
- Taşınan: `src/components/common/*` → `layout/`, `ui/`, `routes/`; `src/index.css` → `src/styles/`; `db.json` → `data/`
- Yeni: `src/routes/AppRoutes.jsx`
- Düzenlenen: `src/App.jsx`, `src/main.jsx`, `src/context/AlertContext.jsx`, `src/routes/ProtectedRoute.jsx`, `src/routes/GuestRoute.jsx`, `src/services/authService.js` (yorum), `package.json`
- Doküman: `docs/ARCHITECTURE.md`, `AGENTS.md`, `README.md`

## Diğer öğrencileri etkileyen değişiklikler
- **Yeni rota eklemek:** `src/routes/AppRoutes.jsx` içindeki kendi bloğuna satır ekle (artık `App.jsx` değil).
- **Import yolları değişti:**
  - `components/common/Modal` → `components/ui/Modal`
  - `components/common/StatSummaryCard` → `components/ui/StatSummaryCard` (Ö3)
  - `components/common/Layout` → `components/layout/Layout`
  - `components/common/ProtectedRoute` → `routes/ProtectedRoute`
- Veritabanı dosyası `data/db.json`. Seed admin orada.
- Global CSS `src/styles/index.css`.
- Ö2 ve Ö3'ün dosyaları (`components/attendance`, `components/admin`, `pages/employee`, `pages/admin`, `services/attendanceService.js`, `utils/timeCalculations.js`, `utils/salaryEngine.js`) **yerinde kaldı**.

## Alınan kararlar
- Tip bazlı yapı korundu (rubrikteki components/context/utils klasörleri görünür kalsın diye). Özellik bazlı yapı (features/) değerlendirildi, reddedildi.
- Kök dizindeki `index.html`, `vite.config.js`, `.oxlintrc.json`, `AGENTS.md`, `CLAUDE.md`, `README.md` araçlar tarafından orada arandığı için taşınmadı.

## Doğrulama
- `npm run lint` temiz, `npm run build` başarılı.
- Servis/validator testleri 23/23, headless Chrome uçtan uca 30/30 (yeni yapıyla tekrar koşuldu).

## Açık sorular / sonraki adım
- Yok. ARCHITECTURE.md §13 açık kararlar hâlâ ekip onayı bekliyor.
