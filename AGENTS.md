# AGENTS.md – Yapay Zeka Ajanı Yönergeleri

Bu projede çalışan **her AI ajanı** (Claude Code, Cursor, Codex, Copilot, Gemini CLI vb.) bu dosyaya uyar.
Claude Code için `CLAUDE.md` bu dosyayı içe aktarır.

Proje: Employee Attendance System (React + Vite + json-server). Üç öğrenci birlikte geliştiriyor.

---

## 1. Oturuma başlarken (her seferinde)

1. `docs/ARCHITECTURE.md` dosyasını oku. Tek doğruluk kaynağı odur.
2. Kullanıcının **hangi öğrenci** olduğunu öğren (Öğrenci 1, 2 veya 3). Belirtmediyse işe başlamadan sor.
3. `docs/changelog/` içindeki **en yeni 5 kaydı** oku. Özellikle "Diğer öğrencileri etkileyen değişiklikler" bölümlerine bak; seni etkileyen bir imza veya rota değişikliği olabilir.
4. `git status` ve `git log --oneline -10` ile hangi daldasın ve son commitler neymiş gör.
5. Büyük bir işe başlamadan önce kısa bir plan sun ve kullanıcı onayı al.

---

## 2. Sahiplik sınırları

- Sadece kullanıcının öğrencisine ait dosyalarda çalış. Tablo: `docs/ARCHITECTURE.md` §11.
- Başka öğrencinin dosyasında değişiklik gerekiyorsa **dokunma**. Changelog'un "Açık sorular" bölümüne yaz ve kullanıcıya söyle.
- Ortak dosyalar (`src/routes/AppRoutes.jsx`, `data/db.json`, `src/utils/constants.js`, `src/styles/index.css`, `package.json`): en küçük değişikliği yap, changelog'da bildir.
- Yeni sayfa eklerken: sayfa `src/pages/<alan>/`, rota `src/routes/AppRoutes.jsx`'te kendi bloğuna, menü satırı `MENU_ITEMS`'a.
- Başkasının sayfası henüz yoksa sadece bir `<h1>` içeren boş placeholder bileşen oluştur; içini doldurma.
- Başkasının fonksiyon imzasını (ARCHITECTURE.md §7–§9) değiştirme. Değişiklik şartsa önce ARCHITECTURE.md'yi güncelle, changelog'a yaz, kullanıcıya bildir.

---

## 3. Her değişiklikten sonra changelog yaz (ZORUNLU)

- Konum: `docs/changelog/YYYY-MM-DD-ogrenciN-kisa-slug.md`
  Örnek: `docs/changelog/2026-10-27-ogrenci2-clock-in-out.md`
- Aynı gün ikinci kayıt: `-2`, `-3` eki. Örnek: `2026-10-27-ogrenci2-clock-in-out-2.md`
- Şablon: `docs/changelog/_TEMPLATE.md`. Kopyala, **hiçbir bölümü boş bırakma**; içerik yoksa "Yok" yaz.
- Ne zaman: her mantıksal iş paketinin sonunda (bir özellik, bir düzeltme, bir refactor). Turn sonunda changelog yoksa **iş bitmemiş sayılır**.
- Mimariyi etkileyen karar aldıysan `docs/ARCHITECTURE.md`'yi de güncelle ve dosyanın başındaki "Son güncelleme" satırını değiştir.
- Changelog'u commit'e dahil et.

---

## 4. Kodlama kuralları

- JavaScript + JSX. TypeScript **yok**. Fonksiyon bileşenleri ve hooks; class bileşen yok.
- `src/utils/` altı **saf JS**: `React` import yok, DOM yok, dış kütüphane yok.
- `src/utils/` ve `src/services/` içindeki `.js` dosyaları birbirini **`.js` uzantısıyla** import eder (`from './api.js'`). Böylece `node dosya.js` ile Vite olmadan test edilebilir. `.jsx` dosyaları uzantısız import kullanır.
- API erişimi **sadece** `src/services/` üzerinden. Bileşen içinde doğrudan `axios`/`fetch` yazma.
- Uyarılar **sadece** `useAlert()` ile. `window.alert`, `window.confirm`, `window.prompt` yasak.
- Yetki kontrolü `ProtectedRoute` + `useAuth()` ile. Sayfa içinde rol kontrolünü tekrar yazma.
- Rotalar `utils/constants.js` içindeki `ROUTES`'tan okunur; string literal rota yazma.
- Tarih ve saat formatları ARCHITECTURE.md §4'e uyar. `id` alanları sayıdır.
- Dosya adı: bileşen ve sayfa `PascalCase.jsx`, diğerleri `camelCase.js`.
- Kod ve identifier İngilizce. UI metinleri ve yorumlar Türkçe (ekip kararı değişirse ARCHITECTURE.md §13'e bak).
- Yeni bağımlılık eklemeden önce kullanıcıya sor; eklersen changelog'a yaz.
- Gereksiz soyutlama yapma. Proje **basit** kalacak.

---

## 5. Yapma

- Firebase, Supabase veya herhangi bir uzak veritabanı/servis ekleme.
- `data/db.json` içindeki seed admin'i silme veya şifresini değiştirme.
- Kullanıcı onayı olmadan büyük refactor, klasör taşıma, bağımlılık yükseltme.
- Başkasının klasörüne özellik yazma.
- `node_modules`, `dist`, `.env` commit etme.
- `main` dalına doğrudan push.

---

## 6. Komutlar

```bash
npm install          # bağımlılıklar
npm run dev          # Vite (5173) + json-server (3001) birlikte
npm run client       # sadece Vite
npm run server       # sadece json-server
npm run build        # üretim derlemesi
npm run lint         # oxlint
```

Seed hesaplar (data/db.json): `admin@eas.local / Admin123!`, `ayse@eas.local / Ayse123!`, `mehmet@eas.local / Mehmet123!`

---

## 7. Teslim öncesi kontrol listesi

- [ ] `npm run lint` hatasız
- [ ] `npm run dev` ile ilgili sayfa açılıyor ve çalışıyor
- [ ] Changelog dosyası yazıldı ve commit'e dahil
- [ ] Ortak dosya değiştiyse changelog'da bildirildi
- [ ] ARCHITECTURE.md ile çelişen bir şey yapılmadı (yapıldıysa doküman güncellendi)
- [ ] Başkasının dosyasına dokunulmadı
