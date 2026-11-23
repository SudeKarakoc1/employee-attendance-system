# Employee Attendance System

Employee attendance tracking, working hours and payroll reporting system.

Advanced Web Design with React dersi, Proje-8. Çalışan giriş-çıkış kaydı, maaş hesabı için çalışma süresi hesaplama ve devam raporları.

> Mimari ve kurallar için `docs/ARCHITECTURE.md`, AI ajanları için `AGENTS.md`.

## Kurulum (Öğrenci 1)

### Gereksinimler

| Araç    | Sürüm                           | Kontrol          |
|---------|---------------------------------|------------------|
| Node.js | **22.12 veya üzeri**            | `node --version` |
| npm     | 10 veya üzeri (Node ile gelir)  | `npm --version`  |
| Git     | Güncel bir sürüm                | `git --version`  |

Node 22 şart: `concurrently` 10 ve Vite 8 daha eski sürümlerde çalışmaz. Sürüm yükseltmek için nvm kullananlar `nvm install 22 && nvm use 22`, Windows kullananlar nodejs.org'dan LTS kurulumunu yapabilir.

### Adımlar

```bash
git clone https://github.com/SudeKarakoc1/employee-attendance-system.git
cd employee-attendance-system
npm install
npm run dev
```

Tarayıcıda http://localhost:5173 adresini aç ve aşağıdaki test hesaplarından biriyle giriş yap.

`npm run dev` iki süreci birlikte başlatır:

| Süreç        | Adres                  | Görev                                        |
|--------------|------------------------|----------------------------------------------|
| Vite (React) | http://localhost:5173  | Arayüz, anlık yenileme                       |
| json-server  | http://localhost:3001  | REST API, `data/db.json` dosyasını sunar     |

### Komutlar

| Komut             | Ne yapar                                                                 |
|-------------------|--------------------------------------------------------------------------|
| `npm run dev`     | Vite + json-server birlikte (günlük geliştirme)                          |
| `npm run client`  | Sadece Vite                                                              |
| `npm run server`  | Sadece json-server                                                       |
| `npm run build`   | `dist/` altına üretim derlemesi                                          |
| `npm run preview` | Üretim derlemesini yerelde sunar; `npm run server` ayrıca çalışmalı      |
| `npm run lint`    | oxlint ile kod kontrolü                                                  |

### Test hesapları

| Rol      | E-posta            | Şifre       |
|----------|--------------------|-------------|
| admin    | admin@eas.local    | Admin123!   |
| employee | ayse@eas.local     | Ayse123!    |
| employee | mehmet@eas.local   | Mehmet123!  |

Yeni çalışan hesabı için Kayıt Ol sayfası kullanılır; admin hesabı yalnızca seed veriden gelir.

### Veritabanı

- Veritabanı `data/db.json` dosyasıdır. json-server bu dosyayı okur ve her değişikliği doğrudan dosyaya yazar; ayrı bir kurulum gerekmez.
- Seed veri: 1 admin, 2 çalışan, 3 devam kaydı. Admin hesabı silinmez, şifresi değiştirilmez.
- Seed veriyi sıfırlamak için sunucuyu durdurup `git checkout -- data/db.json` çalıştır.
- Şifreler ders projesi olduğu için düz metin tutulur. Gerçek bir sistemde hash'lenmesi gerekir.
- API uçları: `GET`/`POST` `http://localhost:3001/users`, `GET`/`PATCH`/`DELETE` `/users/:id`; aynı yapı `/attendance` için geçerli. Ayrıntı: `docs/ARCHITECTURE.md` §8.

### Sık karşılaşılan sorunlar

- **Girişte "Sunucuya ulaşılamıyor" uyarısı.** json-server çalışmıyor. `npm run server` ya da `npm run dev` ile başlat.
- **`EADDRINUSE :3001` hatası.** Port dolu. macOS/Linux'ta `lsof -i :3001` ile süreci bul ve `kill` et; Windows'ta `netstat -ano | findstr 3001` ile PID'yi bul, `taskkill /PID <pid> /F`.
- **Vite 5174'te açıldı.** 5173 doluydu, Vite otomatik olarak sonraki portu seçer. Terminaldeki adresi kullan, sorun değil.
- **`npm run dev` hemen kapanıyor veya engine uyarısı veriyor.** Node sürümü 22'nin altında. Node 22.12+ kur.
- **Giriş yapmadan panele düşüyor veya oturum tuhaf davranıyor.** Tarayıcıda eski `eas_session` kaydı kalmış. DevTools > Application > Local Storage altından sil.
- **İlk açılışta sayfa kendini yeniliyor.** Vite bağımlılık önbelleği bozulmuş. `rm -rf node_modules/.vite` sonra tekrar `npm run dev`.

### Geliştirme akışı

- `main` dalı korumalıdır. `ogrenciN/konu` biçiminde bir daldan PR açılır.
- Her PR `docs/changelog/` altına bir kayıt içerir; şablon `docs/changelog/_TEMPLATE.md`.
- Commit mesajı: `feat(auth): ...`, `fix(attendance): ...`, `docs: ...`.
- AI ajanı (Claude Code, Cursor, Copilot vb.) kullanıyorsan `AGENTS.md` otomatik okunur; ajana hangi öğrenci olduğunu söyle.
- Teslim öncesi `npm run lint` ve `npm run build` temiz olmalı.

## Roller
<!-- TODO (Ö3) -->

## Özellikler
<!-- TODO (Ö3) -->

## Ekran Görüntüleri
<!-- TODO (Ö3) -->

## Ekip
- Öğrenci 1: Mimari, Auth & Global Sistemler
- Öğrenci 2: Çalışan Portalı & Devamlılık Motoru
- Öğrenci 3: Admin Paneli, Bordro & Raporlama
