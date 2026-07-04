# WS-14: Analysis, Interpretation & Failure Analysis

> **Bab 14 — Analisis Data, Interpretasi & Failure Analysis**

---

## Ringkasan Materi

### Data → Knowledge Model

```
Data → Analysis → Interpretation → Explanation → Knowledge
```

Tiga level yang berbeda:
- **Analysis** — "Apa yang terjadi?" (deskriptif + inferensial)
- **Interpretation** — "Apa artinya?" (konteks RQ + literatur)
- **Failure Analysis** — "Mengapa tidak berhasil?" (boundary conditions)

### Beyond p-value

**Statistical significance ≠ practical significance.** Selalu laporkan:
1. p-value (signifikansi statistik)
2. Effect size (besarnya efek)
3. Confidence interval (rentang ketidakpastian)

| Effect Size (Cohen's d) | Interpretasi |
|-------------------------|-------------|
| < 0.2 | Small |
| 0.2 – 0.8 | Medium |
| > 0.8 | Large |

### Pemilihan Uji Statistik

| Kondisi | Uji yang Tepat |
|---------|---------------|
| 2 grup, normal, paired | Paired t-test |
| 2 grup, non-normal | Wilcoxon signed-rank |
| > 2 grup, normal | One-way ANOVA + post-hoc |
| > 2 grup, non-normal | Kruskal-Wallis + post-hoc |
| 2 variabel kontinu | Pearson (normal) / Spearman (rank) |

### Failure Analysis as Contribution

Hipotesis yang ditolak adalah **temuan yang berharga**:

| Dataset | New (F1) | Baseline (F1) | p-value | Cohen's d |
|---------|---------|--------------|---------|-----------|
| DS-1 (small, clean) | 94.2±1.1 | 89.3±1.5 | <0.001 | **3.7** |
| DS-4 (medium, noisy) | 78.3±3.2 | 82.1±2.8 | 0.008 | **-1.3** |
| DS-5 (large, noisy) | 71.6±4.1 | 80.5±3.0 | <0.001 | **-2.5** |

**Insight:** Metode baru unggul di data bersih tapi gagal di data noisy → asumsi Gaussian dilanggar → **boundary condition** ditemukan → hybrid approach direkomendasikan.

**Partial failure + deep analysis = kontribusi lebih kaya daripada full success tanpa analisis.**

### Limitation Types

| Jenis | Contoh |
|-------|--------|
| Internal validity | Confounders yang tidak dikontrol |
| External validity | Generalisasi ke domain lain |
| Construct validity | Metrik mengukur apa yang dimaksud? |
| Statistical limitation | Sample size, asumsi distribusi |

### Jebakan Kognitif

1. "Signifikan statistik = penting secara praktis" → cek effect size
2. "Hipotesis tidak didukung → cari sudut baru" → p-hacking
3. "Kegagalan tidak perlu dilaporkan detail" → missed insight
4. "Limitasi cukup disebutkan, tidak perlu dianalisis" → kedalaman hilang

---

## Template A.14 — Analysis & Interpretation Report

```
ANALYSIS & INTERPRETATION

1. Statistik Deskriptif:
   | Skenario | Mean RPS | Total Sukses | Total Timeout | Max Latency (ms) |
   |----------|------|-----|--------|-----|
   | PostgreSQL | 14.67 | 176 | 1468 | 11725 |
   | MongoDB    | 0.31 | 4 | 1992 | 9738 |

2. Uji Hipotesis:
   Uji yang digunakan  : Independent T-test (Asumsi normal) / Mann-Whitney (Jika tak normal)
   Justifikasi          : Membandingkan metrik throughput (kontinu) dari dua kelompok independen (PG vs Mongo).
   Hasil: p < 0.05 (Perbedaan sangat telak pada observasi kasar).
   CI 95%               : N/A (Gap terlalu lebar)

3. Keputusan:
   [X] H₀ ditolak → H₁ diterima (Terdapat perbedaan performa yang signifikan)
   [ ] H₀ tidak ditolak

4. Interpretasi:
   Hubungan ke RQ       : PostgreSQL menang telak dalam efisiensi mempertahankan throughput saat beban konkurensi di titik 500 koneksi.
   Practical significance: Perbedaan RPS dari 14.67 ke 0.31 sangat signifikan secara operasional. 0.31 RPS berarti server hampir mati sepenuhnya (downtime semu).
   Perbandingan literatur: Konsisten dengan studi bahwa arsitektur NoSQL memiliki bottleneck CPU tersendiri dibandingkan koneksi connection pool SQL yang matang di Node.js, namun perlu diselidiki *bottleneck* aplikasinya.

5. Limitation:
   | Jenis | Ancaman | Dampak | Mitigasi |
   |-------|---------|--------|----------|
   | Internal | Throttling CPU akibat enkripsi Bcrypt | *Timeout* merajalela di pengujian ke-2 (Mongo) | Menambahkan jeda istirahat CPU (*cooldown* 5 menit) antar pengujian. |

6. Failure Analysis (Jika H₀ ditolak namun ada kegagalan masif pada eksperimen):
   Penyebab potensial  : Beban komputasi kriptografi Bcrypt (10 salt rounds) untuk 500 user berbarengan sangat rakus CPU.
   Boundary condition   : Perbandingan arsitektur DBMS (SQL vs NoSQL) menjadi "Irrelevan" atau bias jika *bottleneck* sesungguhnya ada pada *Application Layer* (Node.js event-loop terblokir proses sinkron hashing).
   Insight              : Memisahkan *Microservice* Autentikasi / Hashing dari API utama akan lebih menaikkan throughput keseluruhan dibanding mengganti tipe database.
```

---

## Latihan 1 — Pemilihan Uji Statistik

Tentukan uji statistik yang tepat untuk eksperimen Anda.

| Pertanyaan | Jawaban |
|-----------|---------|
| Berapa grup yang dibandingkan? | *2 Grup (PostgreSQL dan MongoDB)* |
| Apakah data berpasangan (paired)? | *Tidak (Independent runs)* |
| Apakah distribusi normal? (uji normalitas) | *Asumsi normal / diabaikan karena gap agregat terlampau jauh (14.67 vs 0.31)* |
| **Uji yang dipilih:** | *Independent Two-Sample T-Test* |
| **Justifikasi:** | *Membandingkan rata-rata RPS (metrik rasio/kontinu) dari dua kelompok terpisah secara independen.* |

**Effect size yang akan dilaporkan:** [X] Cohen's d / [ ] Eta-squared / [ ] Lainnya: ____

---

## Latihan 2 — Interpretasi Hasil

Gunakan data berikut (atau data riil Anda) untuk berlatih interpretasi.

**Data:**
| Model | Accuracy (mean ± std) | n |
|-------|----------------------|---|
| A | 89.2 ± 1.5 | 10 |
| B | 87.8 ± 2.1 | 10 |

p = 0.045, Cohen's d = 0.74, CI 95% = [0.03, 2.77]

| Aspek | Interpretasi |
|-------|-------------|
| Signifikansi statistik | *Perbedaan hasil teramat besar (Postgres 176 sukses vs Mongo 4 sukses).* |
| Effect size | *Besarnya efek sangat substansial (Large Effect), menunjukkan sensitivitas pilihan DB.* |
| Practical significance | *Di dunia nyata (Production), MongoDB pada skenario beban komputasi CPU ini akan dianggap down (lumpuh).* |
| Hubungan ke RQ | *PostgreSQL jauh lebih unggul menangani tumpukan request login dibanding MongoDB di arsitektur ini.* |
| Perbandingan literatur | *Hasil anomali ini menyumbang literatur mengenai CPU bottleneck pada I/O-intensive task.* |

---

## Latihan 3 — Failure Analysis

Latih kemampuan failure analysis: hipotesis TIDAK didukung. Apa yang bisa dipelajari?

**Skenario:** Metode baru Anda mendapat F1 = 83.2%, baseline = 84.7%. p = 0.12 (tidak signifikan).

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah ini "gagal"? | *Server yang melayani MongoDB mengalami rentetan 1992 timeout, bisa disebut gagal melayani request.* |
| Kemungkinan penyebab? | *Komputasi hashing sandi bcrypt memakan resource CPU laptop uji (Athlon 7320U) hingga memicu throttling, menghambat event-loop I/O pada percobaan ke-2 (Mongo).* |
| Boundary condition? | *Perbandingan kapabilitas Arsitektur (SQL vs NoSQL) hilang relevansinya jika komputasi Application-Layer teramat mahal secara CPU.* |
| Insight yang bisa diambil? | *Performa autentikasi di titik beban tinggi (>500 user) lebih didikte oleh algoritma enkripsinya alih-alih tipe penyimpanan pangkalan datanya.* |
| Apakah layak dilaporkan? Mengapa? | *Sangat layak, ini menyelamatkan peneliti lain dari menyalahkan Database jika problem utama ternyata berada di kode Aplikasi.* |

**Limitation terkait:**
| Jenis | Ancaman | Dampak |
|-------|---------|--------|
| *Internal Validity* | *Faktor kelelahan hardware (Thermal Throttling) mendikte hasil percobaan ke-2.* | *MongoDB terkesan jauh lebih buruk dari aslinya, karena diuji di saat performa laptop sedang tidak maksimal pasca-PostgreSQL.* |

---

## Refleksi

> Apakah "failure" dalam riset benar-benar gagal, atau justru kontribusi? Bagaimana failure analysis mengubah cara Anda melihat hasil negatif?

> "Failure" yang dianalisa justru mengungkap batas kemampuan metode/sistem (*boundary conditions*). Menemukan bahwa MongoDB lumpuh bukan karena *query* lambat melainkan akibat hambatan CPU di layer aplikasi (Bcrypt) adalah kontribusi wawasan berharga, yang bisa mengarahkan riset ke depannya menuju perancangan arsitektur mikrolayanan (*microservices*) untuk autentikasi. Kegagalan memberikan jawaban "Mengapa?", bukan sekadar angka akhir.
