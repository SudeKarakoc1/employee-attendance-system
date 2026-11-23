# README kurulum bölümü tamamlandı

- **Tarih:** 2026-11-23
- **Yazan:** Öğrenci 1
- **Agent:** Claude Code
- **Dal (branch):** main (yalnızca doküman değişikliği, doğrudan push)
- **Rubrik maddesi:** Madde 8 (README; kurulum bölümü Ö1'in payı)

## Ne değişti
- `README.md` "Kurulum" bölümü baştan yazıldı: gereksinimler tablosu, adım adım kurulum, komut tablosu, test hesapları, veritabanı notları, sık karşılaşılan sorunlar, geliştirme akışı.
- **Düzeltme:** Node gereksinimi "20+" yanlıştı; `concurrently` 10 ve Vite 8 nedeniyle **Node 22.12+** olarak düzeltildi.
- Roller, Özellikler ve Ekran Görüntüleri bölümlerine dokunulmadı (Ö3).
- Kod değişikliği yok.

## Değişen / eklenen dosyalar
- `README.md`
- `docs/changelog/2026-11-23-ogrenci1-readme-kurulum.md`

## Diğer öğrencileri etkileyen değişiklikler
- Node 20 kullanan varsa 22.12+ sürümüne geçmeli; aksi halde `npm run dev` çalışmaz.
- Seed veriyi sıfırlama komutu artık README'de: `git checkout -- data/db.json`.

## Alınan kararlar
- `concurrently` paketi düşürülmedi; Node 22 gereksinimi dokümante edildi (Node 20 Nisan 2026'da destek dışı kaldı).

## Açık sorular / sonraki adım
- Ö2: changelog kayıtları eksik (PR #1–#3). Ö2 ve Ö3 sayfaları hâlâ placeholder.
- Ö3: README'nin Roller, Özellikler, Ekran Görüntüleri bölümleri bekliyor.
