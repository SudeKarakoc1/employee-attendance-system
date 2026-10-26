# Mimari dokümanı, ajan yönergeleri ve changelog düzeni oluşturuldu

- **Tarih:** 2026-10-26
- **Yazan:** Öğrenci 1
- **Agent:** Claude Code
- **Dal (branch):** henüz git reposu yok
- **Rubrik maddesi:** Madde 3, 4, 6 (altyapı)

## Ne değişti
- Projenin tek doğruluk kaynağı olarak `docs/ARCHITECTURE.md` yazıldı: teknoloji yığını, klasör yapısı ve sahiplik, veri modeli, roller, rotalar, Context API imzaları, servis ve utils sözleşmeleri, iş kuralları, git kuralları, açık kararlar.
- Tüm AI ajanları için `AGENTS.md` yazıldı; `CLAUDE.md` bunu içe aktarır.
- `docs/changelog/` klasörü, şablon ve kullanım kuralı oluşturuldu.
- Henüz hiçbir kaynak kod yazılmadı.

## Değişen / eklenen dosyalar
- `docs/ARCHITECTURE.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/changelog/_TEMPLATE.md`
- `docs/changelog/README.md`
- `docs/changelog/2026-10-26-ogrenci1-mimari-dokumanlari.md`

## Diğer öğrencileri etkileyen değişiklikler
- Herkes işe başlamadan `docs/ARCHITECTURE.md` ve `AGENTS.md` okumalı.
- `services/db.js` adı `services/api.js` oldu.
- Admin tarafına `AttendanceReport.jsx` (`/admin/attendance`) sayfası eklendi (Ö3).
- `StatSummaryCard.jsx` `components/common/` altında ve Ö3'e ait.
- Çalışan kendi attendance kaydını düzenleyemez ve silemez; UPDATE/DELETE admin tarafında.
- `Register` sadece employee hesabı açar; admin `db.json` seed'inde gelir.

## Alınan kararlar
- DB: `json-server@0.17.4`, port 3001. Firebase/Supabase reddedildi.
- `id` alanları sayı. Tarih `"YYYY-MM-DD"`, saat `"YYYY-MM-DDTHH:mm:ss"` (yerel, saat dilimi eki yok).
- Context API imzaları (`useAuth`, `useAlert`, `ProtectedRoute`) ARCHITECTURE.md §7'de sabitlendi.

## Açık sorular / sonraki adım
- Arayüz dili, stil yaklaşımı, gece mesaisi kuralı, net maaş kesinti oranı ekip kararı bekliyor (ARCHITECTURE.md §13).
- Rubrik madde 1–9'un tam metinleri ARCHITECTURE.md'ye eklenecek.
- Sonraki adım (Ö1): git reposu + proje iskeleti, onay sonrası.
