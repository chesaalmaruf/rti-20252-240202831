# WS-16: Presentation & Defense (UAS)

> **Bab 16 — Presentasi & Pertahanan Ilmiah**

---

## Ringkasan Materi

### Scientific Defense Model

```
Research Work → Presentation → Questioning → Defense → Evaluation → Acceptance
```

### Presentasi ≠ Ringkasan Paper

| Paper | Presentasi |
|-------|-----------|
| Dibaca (self-paced) | Didengar (presenter-paced) |
| Detail lengkap | Ide kunci + highlight |
| Tabel numerik detail | Grafik visual + angka kunci |
| Pembaca bisa re-read | Audiens dengar sekali |

**Prinsip:** Presentasi membutuhkan **reformulasi**, bukan kompresi. Medium berbeda = pendekatan berbeda.

### Claim-Evidence-Reasoning (CER)

Setiap jawaban defense harus memiliki:
1. **Claim** — Pernyataan yang dijawab
2. **Evidence** — Data/fakta pendukung
3. **Reasoning** — Logika yang menghubungkan evidence ke claim

**Contoh:**
| Pertanyaan | Bad Answer | Good Answer (CER) |
|-----------|-----------|-------------------|
| "Kenapa hanya 3 dataset?" | "Tiga sudah cukup" | "3 dataset mewakili variasi: small-clean, medium-clean, medium-noisy [E]. Generalisasi perlu validasi lanjut — listed as limitation [R]" |
| "Hasil DS-3 menurun?" | "Itu outlier" | "Ya, karena distribusi heavy-tail melanggar asumsi Gaussian [E]. Ini menunjukkan boundary condition metode [R]" |
| "Effect size?" | "p=0.003, jadi signifikan" | "Cohen's d=1.2 (large effect) [E] — bukan hanya signifikan tapi substansial [R]" |

### Slide Design — One Slide, One Message

**Optimal 9-Slide Plan (15 menit):**

| # | Slide | Waktu | Pesan |
|---|-------|-------|-------|
| 1 | Title + context | 1 min | Apa ini tentang apa |
| 2 | Problem + motivation | 2 min | Mengapa penting |
| 3 | Gap + RQ | 1.5 min | Apa yang belum terjawab |
| 4 | Method overview | 2 min | Bagaimana dijawab (diagram) |
| 5 | Key result — tabel | 2 min | Temuan utama |
| 6 | Key result — grafik | 2 min | Pola visual |
| 7 | Interpretation + failure | 2 min | Apa artinya |
| 8 | Limitation + future | 1.5 min | Batasan & arah |
| 9 | Conclusion + contribution | 1 min | Closing message |

### Anticipatory Defense

Prediksi pertanyaan berdasarkan kategori:

| Kategori | Contoh Pertanyaan |
|---------|------------------|
| Problem | "Mengapa masalah ini penting?" |
| Gap | "Bagaimana dengan studi X yang sudah menjawab ini?" |
| Method | "Mengapa metode ini, bukan Y?" |
| Results | "Bagaimana menjelaskan anomali di DS-3?" |
| Generalization | "Apakah bisa diterapkan di domain lain?" |

### Tiga Prinsip Jawaban

1. **Direct** — Jawab dulu, elaborasi kemudian
2. **Data-based** — Tunjuk evidence spesifik
3. **Honest** — Akui limitasi jika memang ada

### Jebakan Kognitif

1. "Presentasi = semua yang ada di paper" → terlalu padat
2. "Slide cantik = presentasi bagus" → konten > estetika
3. "Tidak bisa jawab = gagal" → "I don't know, but..." menunjukkan kejujuran
4. "Tidak perlu latihan — saya paham riset saya" → latihan = menemukan celah

---

## Template A.16 — Defense Preparation Sheet

```
DEFENSE PREPARATION

Slide Deck Plan:
  Total slides   : ____ (target: 10-12 konten + title/closing)
  Time per slide : ~2 min
  Total time     : ____ menit

Slide Outline:
| # | Pesan Utama | Visual | Waktu |
|---|-------------|--------|-------|
| 1 | Title       |        | 30s   |
| 2 | Problem     |        | 2min  |
| 3 | Gap + RQ    |        | 2min  |
| ..|             |        |       |

Anticipatory Defense Matrix:
| Kategori | Pertanyaan Potensial | Jawaban (CER) |
|----------|---------------------|---------------|
| Problem  |                     |               |
| Gap      |                     |               |
| Method   |                     |               |
| Results  |                     |               |
| Generalization |               |               |

Latihan:
  Latihan 1: [tanggal] — [catatan timing & feedback]
  Latihan 2: [tanggal] — [catatan timing & feedback]
  Latihan 3: [tanggal] — [catatan timing & feedback]
```

---

## Latihan 1 — Slide Outline

Rencanakan presentasi 15 menit untuk riset Anda.

| # | Pesan Utama | Visual yang Digunakan | Waktu |
|---|-------------|----------------------|-------|
| 1 | *Judul & Konteks: Komparasi Postgres vs Mongo di Auth Beban Tinggi* | *Title slide, arsitektur Node.js sederhana* | *1 min* |
| 2 | *Problem: Bcrypt sering mencekik (throttle) I/O pada Node.js* | *Diagram event-loop Node.js terblokir Bcrypt* | *2 min* |
| 3 | *Gap & RQ: Mana DB (SQL vs NoSQL) yang lebih stabil di beban CPU ekstrem?* | *Highlight RQ* | *1 min* |
| 4 | *Metode: 500 koneksi, Prisma, Autocannon selama 30 detik* | *Diagram pipeline test* | *2 min* |
| 5 | *Hasil (Tabel): Postgres tembus 14.67 RPS, Mongo kolaps di 0.31 RPS* | *Tabel agregat RPS & Latency* | *2 min* |
| 6 | *Hasil (Grafik): Time-series membuktikan Mongo timeout massal sejak awal* | *Line chart dari Autocannon* | *2 min* |
| 7 | *Analisis Gagal: Mongo lumpuh murni akibat CPU Thermal Throttling dari Bcrypt* | *Grafik monitor resource CPU* | *2 min* |
| 8 | *Batasan Riset: Hardware (AMD Athlon) cepat panas tanpa pendingin aktif* | *Highlight spek hardware* | *1.5 min* |
| 9 | *Kesimpulan: Masalah ada di lapisan Aplikasi (Bcrypt), bukan di Database* | *Closing message: Pisahkan service enkripsi* | *1 min* |

**Total waktu estimasi:** 14.5 menit

---

## Latihan 2 — Anticipatory Defense

Prediksi 5 pertanyaan yang mungkin diajukan penguji, lalu siapkan jawaban CER.

| # | Kategori | Pertanyaan | Claim | Evidence | Reasoning |
|---|----------|-----------|-------|----------|-----------|
| 1 | *Problem* | *Mengapa fokus ke Bcrypt, bukan optimasi Query DB?* | *Bcrypt memonopoli CPU secara sinkron* | *Sifat Node.js yang single-threaded* | *Menguji DB tanpa mempertimbangkan antrian Bcrypt di Node.js adalah pengujian yang tidak realistis untuk endpoint Auth.* |
| 2 | *Method* | *Mengapa hanya diuji selama 30 detik?* | *Cukup untuk mencapai steady-state tanpa melelehkan hardware* | *Log Autocannon memperlihatkan pola tetap di detik ke-10* | *Durasi lebih lama justru meningkatkan bias Thermal Throttling yang merusak akurasi komparasi.* |
| 3 | *Results* | *Bukankah Mongo memang lambat untuk relasi?* | *Kegagalan Mongo bukan dari struktur data, tapi CPU bottleneck* | *Tercatat 1992 Timeout, bukan query lambat* | *Event-loop Node.js sudah mati sebelum request sempat sampai ke mesin database MongoDB.* |
| 4 | *Generalization* | *Apakah hasil ini berlaku untuk Go atau Java?* | *Tidak (terbatas pada Node.js)* | *Arsitektur single-thread Node.js* | *Go/Java menggunakan multithreading alami, sehingga enkripsi Bcrypt mungkin tidak mengunci thread koneksi DB.* |
| 5 | *Generalization* | *Apakah akan sama hasilnya jika di cloud (AWS)?* | *Tergantung alokasi CPU vCore* | *Laptop AMD 7320U cepat throttling* | *Di cloud dengan CPU garansi tinggi, Mongo mungkin tidak sampai Timeout massal seperti ini.* |

---

## Latihan 3 — Simulasi Q&A

Minta teman/kolega mengajukan 3 pertanyaan tentang riset Anda. Catat pertanyaan dan evaluasi jawaban Anda.

| # | Pertanyaan | Jawaban Saya | Evaluasi |
|---|-----------|-------------|---------|| *1* | *Contoh: "Mengapa tidak membandingkan dengan metode Y?"* | *Contoh: "Karena Y memerlukan dataset labeled yang tidak tersedia. Disebutkan sebagai limitasi di halaman X."* | *[✓] Direct [✓] Data-based [✓] Honest* || 1 | *"Mengapa tes Mongo dilakukan SETELAH Postgres tanpa jeda di draf awal?"* | *"Itu adalah kesalahan fatal yang kemudian kami mitigasi dengan jeda cooldown 5 menit, tertulis di WS-13."* | *[X] Direct [X] Data-based [X] Honest* |
| 2 | *"Bukannya Bcrypt bisa dipindah ke worker thread?"* | *"Benar, namun riset ini menguji arsitektur monolitik konvensional sebagai baseline."* | *[X] Direct [X] Data-based [X] Honest* |
| 3 | *"Kenapa tidak pakai koneksi lokal Unix Socket agar lebih fair?"* | *"Karena pengujian di dunia nyata mayoritas menggunakan koneksi TCP/IP untuk DB."* | *[X] Direct [X] Data-based [X] Honest* |

**Pertanyaan yang paling sulit dijawab:**
> Pertanyaan mengenai validitas hardware yang digunakan, mengingat laptop *low-end* (AMD Athlon) sangat rentan bias suhu (kepanasan).

**Apa yang perlu disiapkan lebih baik:**
> Mempersiapkan log pantauan suhu CPU aktual (*Hardware Monitor*) di slide cadangan (*appendix*) untuk membuktikan momen terjadinya *Thermal Throttling*.

---

## Refleksi

> Dari seluruh proses WS-01 sampai WS-16 — dari paradigma riset hingga presentasi — bagian mana yang paling mengubah cara Anda berpikir tentang riset? Apa satu hal yang akan selalu Anda terapkan di riset berikutnya?

**Insight terbesar:**
> Kegagalan pengujian eksperimen (*seperti saat MongoDB timeout masif*) BUKAN berarti penelitian itu gagal. Kegagalan tersebut justru membongkar anomali perilaku sistem (bahwa CPU *bottleneck* dari Bcrypt lebih fatal ketimbang kapabilitas asli dari *Database*). Temuan penyebab di baliknya (*Failure Analysis*) adalah kontribusi keilmuan yang valid.

**Yang akan selalu diterapkan:**
> Pendekatan metodologis berbasis *Claim-Evidence-Reasoning (CER)* dalam mendebat argumen, serta merancang skenario mitigasi bias (seperti jeda istirahat antar-run *cooldown*) dengan sangat ketat pada pengujian yang melibatkan stres perangkat keras (*Hardware*).
