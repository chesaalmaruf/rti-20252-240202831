# WS-12: Result Presentation & Visualization

> **Bab 12 — Penyajian Hasil & Visualisasi**

---

## Ringkasan Materi

### Data → Insight Model

```
Validated Data → Structured Presentation → Visualization → Pattern Recognition → Insight
```

Penyajian **mendahului** analisis. Tabel dan grafik membantu peneliti "melihat" data sebelum menghitung. Langsung ke uji statistik tanpa visualisasi berisiko kesimpulan yang secara teknis benar tapi kontekstual salah (Anscombe's Quartet, 1973).

### Tabel = Presisi, Grafik = Pola

Keduanya **saling melengkapi**:
- Tabel: angka presisi, self-contained (dipahami tanpa teks), sortable
- Grafik: pola visual, tren, perbandingan cepat

### Jenis Grafik Berdasarkan Tujuan

| Tujuan | Jenis Grafik |
|--------|-------------|
| Perbandingan antar-skenario | Bar chart (grouped/stacked) |
| Distribusi per-skenario | Box plot / violin plot |
| Tren temporal | Line chart |
| Korelasi dua variabel | Scatter plot |
| Proporsi (total = 100%) | Pie chart (hati-hati!) |

### Contoh Tabel Hasil yang Baik

| Model | Accuracy (%) | F1-Score (%) | Training Time (min) |
|-------|-------------|-------------|---------------------|
| BERT | 88.4 ± 1.2 | 87.1 ± 1.4 | 45.2 ± 3.1 |
| LSTM | 86.1 ± 1.8 | 84.5 ± 2.0 | 12.8 ± 1.2 |
| SVM | 82.3 ± 0.9 | 80.7 ± 1.1 | 0.3 ± 0.1 |

*N=10 per model. Mean ± std. Diurutkan berdasarkan Accuracy.*

### Visualization Bias — Yang Harus Dihindari

| Bias | Deskripsi | Dampak |
|------|----------|--------|
| Truncated axis | Y tidak dari 0 | Memperbesar perbedaan kecil |
| Inconsistent scale | Dua grafik skala beda | Perbandingan menyesatkan |
| Cherry-picked data | Hanya tampilkan yang "menang" | Selektif, tidak jujur |
| 3D effects | Efek 3D tanpa dimensi data ke-3 | Distorsi tanpa informasi |
| Missing error bar | Tidak ada variabilitas | Menyembunyikan ketidakpastian |

### Engineering vs Research Presentation

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan grafik | Dashboard monitoring | Mendukung argumen ilmiah |
| Informasi wajib | KPI, threshold | Mean, std, CI, N, p-value |
| Bias handling | Less critical | Wajib dihindari (peer-review) |

---

## Template A.12 — Result Presentation Plan

```
RESULT PRESENTATION PLAN

Research Question : Apakah PostgreSQL lebih efisien dibanding MongoDB pada autentikasi berbeban tinggi (Bcrypt)?
Metrik Utama      : Throughput (RPS) dan Latency (ms)

Tabel Hasil:
| Skenario | Mean Latency (ms) | Mean RPS | Total Sukses | Total Timeout |
|----------|----------------------|----------|--------------|---------------|
| PostgreSQL | 7962.11 | 14.67 | 176 | 1468 |
| MongoDB    | 8437.25 | 0.31 | 4 | 1992 |

Visualisasi yang Direncanakan:
| # | Jenis Grafik | Pesan Utama | Metrik |
|---|-------------|-------------|--------|
| 1 | Bar Chart | PostgreSQL mendominasi metrik throughput keseluruhan | Rata-rata RPS |
| 2 | Line Chart | Kegagalan sistemik (timeouts) melonjak setelah detik tertentu akibat beban CPU | Time-series Latency (per detik) |

Bias Check:
  [X] Y-axis mulai dari 0 (atau dijustifikasi)
  [X] Error bar/CI ditampilkan (jika berlaku di multiple runs)
  [X] Semua data disertakan (tidak cherry-picked, kegagalan Mongo tetap ditampilkan)
  [X] Tidak menggunakan 3D tanpa alasan
```

---

## Latihan 1 — Tabel Hasil

Buat tabel hasil eksperimen Anda (boleh dengan data simulasi jika belum punya data riil).

| Skenario | Mean Latency (ms) | Mean Throughput (RPS) | n (Koneksi) | Total Sukses | Total Timeout |
|----------|-------------------|-----------------------|---|--------------|---------------|
| *PostgreSQL (SQL)* | *7962.11* | *14.67* | *500* | *176* | *1468* |
| *MongoDB (NoSQL)* | *8437.25* | *0.31* | *500* | *4* | *1992* |

**Checklist tabel:**
- [X] Self-contained (judul jelas, satuan ada, N tercantum)
- [X] Mean ± std (bukan single number - atau angka aggregat terpadu dari sistem tester)
- [X] Diurutkan berdasarkan metrik utama (RPS)
- [X] Format konsisten di semua baris

---

## Latihan 2 — Rencana Visualisasi

Rencanakan 2-3 grafik untuk menyajikan data dari Latihan 1. Setiap grafik = satu pesan.

| # | Jenis Grafik | Pesan | Data yang Digunakan |
|---|-------------|-------|---------------------|
| 1 | *Bar Chart* | *Perbandingan rata-rata RPS (Throughput) PostgreSQL vs MongoDB* | *Nilai Rata-rata Throughput* |
| 2 | *Line Chart (Time-series)* | *Menunjukkan kapan persisnya server mulai mengalami bottleneck / timeout di 30 detik pengujian* | *Deret waktu data (latencySeries & throughputSeries)* |

---

## Latihan 3 — Bias Detection

Evaluasi visualisasi berikut untuk bias (skenario dari contoh):

**Skenario:** Metode A = 91.2%, Metode B = 90.8%. Bar chart dengan Y-axis mulai dari 90%.

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah Y-axis menyesatkan? | *Ya, pemotongan Y-axis dari 90% mengesankan perbedaan dramatis dari perbedaan aktual 0.4%* |
| Apakah error bar ditampilkan? | *Tidak ada* |
| Apakah semua kondisi ditampilkan? | *Ya (namun terdistorsi secara visual)* |
| Apa solusinya? | *Mengembalikan pangkal Y-axis ke 0% atau memberikan label variasi nilai secara eksplisit beserta batas toleransinya (error bar).* |

**Evaluasi grafik Anda sendiri dari Latihan 2:**
- [X] Semua bias check lulus
- [ ] Ada yang perlu diperbaiki: -

---

## Refleksi

> Mengapa tabel dan grafik keduanya diperlukan — tidak cukup salah satu saja? Pernahkah Anda membuat grafik yang (tanpa sengaja) menyesatkan?

> Tabel memberi para peneliti dan pihak pembaca referensi angka presisi (*exact point/number*) guna melakukan verifikasi matematis secara teliti. Di sisi lain, Grafik mempertegas pola (seperti tren *time-series* penurunan *throughput* yang cepat) yang sulit dilirik dari tabel semata. Menggunakan keduanya mencegah manipulasi impresi serta memberi wawasan komprehensif. Grafik dapat menyesatkan bila porsi visual tidak linear dengan nilai yang diwakili (seperti *truncated Y-axis*).
