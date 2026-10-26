# Proje iskeleti kuruldu (Vite + React + json-server)

- **Tarih:** 2026-10-26
- **Yazan:** Öğrenci 1
- **Agent:** Claude Code
- **Dal (branch):** henüz git reposu yok (uzak repo linki gelince push edilecek)
- **Rubrik maddesi:** Madde 3, 4, 6 (altyapı)

## Ne değişti
- Vite 8 + React 19 şablonu kuruldu; `react-router-dom` 7, `axios`, `json-server@0.17.4`, `concurrently` eklendi.
- `npm run dev` tek komutla Vite (5173) ve json-server (3001) başlatıyor. Lint, build ve iki sunucunun yanıt verdiği doğrulandı.
- `db.json` seed verisiyle oluşturuldu (1 admin, 2 employee, 3 attendance kaydı).
- `src/utils/constants.js` tam yazıldı: ROUTES, ROLES, ALERT_TYPES, MENU_ITEMS, iş kuralı sabitleri.
- `src/services/api.js` axios instance'ı yazıldı.
- `docs/ARCHITECTURE.md`'deki tüm klasör ve dosyalar oluşturuldu. Ö2 ve Ö3 sayfaları `<h1>` içeren placeholder, bileşenleri `null` dönen stub. Ö1'in context ve common bileşenleri de stub, bir sonraki adımda dolacak.
- `App.jsx` tüm rotaları bağlıyor. **Henüz koruma yok**, ProtectedRoute ve Layout sonraki adımda eklenecek.
- `index.css` tasarım değişkenleri (`--color-*`, `--radius`, `--sidebar-width`) ve temel sınıflarla (`.page`, `.card`, `.btn`, `.muted`) yazıldı.
- `README.md` kurulum ve test hesapları bölümüyle oluşturuldu; Roller, Özellikler, Ekran Görüntüleri bölümleri Ö3 için TODO.

## Değişen / eklenen dosyalar
- `package.json`, `index.html`, `vite.config.js`, `.oxlintrc.json`, `.gitignore`, `db.json`, `README.md`
- `src/main.jsx`, `src/App.jsx`, `src/index.css`
- `src/utils/constants.js` (tam), `validators.js`, `timeCalculations.js`, `salaryEngine.js` (stub)
- `src/services/api.js` (tam), `authService.js`, `userService.js`, `attendanceService.js` (stub)
- `src/context/AuthContext.jsx`, `AlertContext.jsx` (stub)
- `src/components/common/*`, `attendance/*`, `admin/*` (stub)
- `src/pages/**` (placeholder), `Unauthorized.jsx`, `NotFound.jsx` (tam)
- `docs/ARCHITECTURE.md` (sürümler, ağaç), `AGENTS.md` (lint aracı)

## Diğer öğrencileri etkileyen değişiklikler
- Lint aracı ESLint değil **oxlint** (Vite 9 şablonu böyle geliyor). Komut aynı: `npm run lint`.
- `public/favicon.ico` yerine `public/favicon.svg`.
- Herkes kendi stub dosyalarının içindeki `TODO (ÖN)` yorumuna göre ilerler; dosya adlarını değiştirmez.
- `constants.js` içindeki `MENU_ITEMS` ve `ROUTES` kullanılmaya hazır.
- `src/services/api.js` hazır: `import { api } from '../services/api'`.

## Alınan kararlar
- Sürümler sabitlendi: Vite 8, React 19, react-router-dom 7, axios 1, json-server 0.17.4. ARCHITECTURE.md §2 güncellendi.
- Git reposu kullanıcı uzak repo linkini verene kadar başlatılmayacak.

## Açık sorular / sonraki adım
- Sonraki adım (Ö1): AuthContext, AlertContext, ToastAlert, Modal, ProtectedRoute, Layout/Navbar/Sidebar, Login/Register, validators, authService, userService.
- ARCHITECTURE.md §13'teki açık kararlar hâlâ bekliyor.
