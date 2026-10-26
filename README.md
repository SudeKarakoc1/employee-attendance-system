# Employee Attendance System

Employee attendance tracking, working hours and payroll reporting system.

Advanced Web Design with React dersi, Proje-8. Çalışan giriş-çıkış kaydı, maaş hesabı için çalışma süresi hesaplama ve devam raporları.

> Mimari ve kurallar için `docs/ARCHITECTURE.md`, AI ajanları için `AGENTS.md`.

## Kurulum (Öğrenci 1)

Gereksinim: Node.js 20+

```bash
npm install
npm run dev
```

`npm run dev` iki süreci birlikte başlatır:

| Süreç       | Adres                    |
|-------------|--------------------------|
| Vite (React)| http://localhost:5173    |
| json-server | http://localhost:3001    |

Diğer komutlar: `npm run client`, `npm run server`, `npm run build`, `npm run lint`.

### Test hesapları

| Rol      | E-posta            | Şifre       |
|----------|--------------------|-------------|
| admin    | admin@eas.local    | Admin123!   |
| employee | ayse@eas.local     | Ayse123!    |
| employee | mehmet@eas.local   | Mehmet123!  |

Veritabanı `db.json` dosyasıdır. Şifreler ders projesi olduğu için düz metin tutulur.

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
