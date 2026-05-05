# WS-04: Research Question & Hypothesis

> **Bab 4 — Research Question, Contribution & Hypothesis**

---

## Ringkasan Materi

### RQ Bukan Pertanyaan Biasa

Research Question yang baik secara implisit mengandung cetak biru eksperimen: subjek, baseline, metrik, domain, dataset.

| Kualitas | Contoh |
|----------|--------|
| **Buruk** | "Bagaimana pengaruh deep learning terhadap deteksi malware?" |
| **Baik** | "Apakah CNN menghasilkan F1-Score lebih tinggi dari RF pada CIC-MalMem-2022?" |

Perbedaan: RQ yang baik menyebutkan **metode spesifik**, **metrik terukur**, **baseline**, dan **dataset**.

### Tiga Jenis RQ

| Jenis | Pola | Kebutuhan |
|-------|------|-----------|
| **Comparison** | A vs B → mana lebih baik? | ≥ 2 metode, metrik sama |
| **Improvement** | A' vs A → modifikasi lebih baik? | Pre/post, bukti perbaikan |
| **Exploratory** | Faktor X₁...Xₙ → pengaruh terhadap Y? | Multi-variabel, korelasi/regresi |

### Contribution Statement

Tiga jenis kontribusi: **Improvement** (metode terbukti lebih baik), **Comparison** (perbandingan sistematis yang belum ada), **Novel Approach** (pendekatan baru). Kontribusi harus terhubung langsung dengan gap — kontribusi tanpa gap = klaim tanpa justifikasi.

### Hypothesis H₀ / H₁

- **H₀** (Null) = Tidak ada perbedaan signifikan — asumsi default, harus dibuktikan salah
- **H₁** (Alternative) = Ada perbedaan signifikan — diterima hanya jika H₀ ditolak
- Harus **falsifiable**, mengandung **metrik terukur**, dirumuskan **SEBELUM eksperimen**

### Rantai Operasionalisasi

```
RQ → Variable → Metric → Data → Analysis
```

Jika rantai ini tidak lengkap, RQ belum mature. Bi-directional: RQ yang tidak bisa jadi hipotesis testable harus direvisi mundur.

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan pertanyaan | Apa yang harus dibangun? | Apa yang harus dibuktikan? |
| Bentuk jawaban | Sistem yang berfungsi | Bukti empiris terukur |
| Sukses diukur oleh | User satisfaction, uptime | Signifikansi statistik, effect size |
| Jika gagal | Debug dan perbaiki | Laporkan, analisis mengapa |

### Istilah Penting

- **Research Question (RQ)** — Pertanyaan spesifik: variabel terukur + metrik + konteks
- **Contribution Statement** — Apa yang diketahui setelah riset selesai yang sebelumnya belum ada
- **H₀ / H₁** — Null vs Alternative Hypothesis
- **Falsifiability** — Kondisi hipotesis ditolak harus bisa didefinisikan sebelum eksperimen
- **Operationalization** — Proses mewujudkan konsep abstrak menjadi variabel terukur

---

## Template A.4 — RQ-Contribution-Hypothesis

```
RQ-CONTRIBUTION-HYPOTHESIS

Gap Statement  : Mayoritas pelaku agribisnis memiliki keterbatasan literasi digital sehingga sering kali kesulitan mengadopsi teknologi atau aplikasi yang antarmukanya terlalu kompleks[cite: 2]. Di sisi lain, pembukuan manual sangat tidak efisien. Belum ada evaluasi komparatif yang mengukur efisiensi waktu dan tingkat usability dari antarmuka pencatatan keuangan web minimalis (terintegrasi langsung ke cloud spreadsheet) dibandingkan dengan metode pencatatan manual.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah penggunaan aplikasi pencatatan keuangan agribisnis berbasis web (Catat Yuk Tan!) secara signifikan memangkas waktu entri data dan mencapai skor System Usability Scale (SUS) yang lebih tinggi dibandingkan dengan metode pencatatan manual?
  Variabel IV  : Metode pencatatan transaksi (Aplikasi Web vs Buku Kas Manual)
  Variabel DV  : Efisiensi operasional dan tingkat penerimaan pengguna (usability)
  Metrik       : Waktu penyelesaian tugas / Task Completion Time (dalam detik) dan skor SUS
  Dataset      : 30 responden pelaku/staf agribisnis yang menjalankan skenario entri transaksi harian yang seragam
  Baseline     : Waktu rata-rata entri data manual dan standar rata-rata global skor SUS, yaitu 68[cite: 2]

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Kuantifikasi empiris mengenai efisiensi waktu dan penerimaan pengguna terhadap arsitektur aplikasi pencatatan keuangan berbobot ringan (web-to-spreadsheet) di sektor agribisnis.
  Jenis kontribusi        : [ ] Improvement  [x] Comparison  [ ] Novel approach
  Gap yang diisi          : Mengatasi masalah kompleksitas sistem pertanian digital dengan menyediakan bukti bahwa solusi antarmuka yang sederhana dapat meningkatkan kepraktisan dan usability[cite: 2].

Hypothesis Pair:
  H₀ : Tidak ada perbedaan signifikan pada waktu entri data antara aplikasi dan manual, serta skor SUS aplikasi berada di bawah atau sama dengan nilai rata-rata global 68[cite: 2].
  H₁ : Aplikasi memangkas waktu entri data secara signifikan dibandingkan metode manual, dan mendapatkan skor SUS di atas 68 yang menunjukkan tingkat usability yang tinggi[cite: 2].
  Threshold              : p-value < 0.05 (untuk uji waktu) dan Skor SUS > 68.
  Justifikasi threshold  : p-value 5% meminimalkan Type I error dalam uji komparasi t-test, sedangkan skor 68 adalah ambang batas (benchmark) global untuk menentukan apakah sebuah sistem memiliki usability yang baik atau tidak[cite: 2].
```
---

## Latihan 1 — Dari Gap ke RQ

Gunakan gap yang ditemukan di WS-03. Transformasikan menjadi Research Question.

**Gap dari WS-03:** ayoritas petani/pelaku agribisnis memiliki literasi digital terbatas dan sering kesulitan dengan aplikasi yang antarmukanya kompleks. Pembukuan manual memakan waktu, namun belum ada evaluasi komparatif mengenai efisiensi waktu dan usability untuk solusi arsitektur aplikasi pencatatan ringan yang langsung terhubung ke cloud spreadsheet.
**RQ versi pertama (tulis bebas):**
> Apakah aplikasi web Catat Yuk Tan lebih baik dan lebih cepat dipakai oleh petani daripada mencatat di buku kas biasa?

**Evaluasi RQ:**

| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | ya |Aplikasi web vs Buku kas manual |
| Metrik terukur |tidak |Kosong (hanya menyebut "lebih baik dan lebih cepat") |
| Baseline |ya |Buku kas biasa / manual |
| Dataset/konteks | tidak|"Petani" masih terlalu luas |

**Tipe RQ:** [x] Comparison / [ ] Improvement / [ ] Exploratory

**RQ versi revisi (setelah evaluasi):**
> Apakah penggunaan aplikasi pencatatan keuangan agribisnis berbasis web memangkas waktu entri data secara signifikan dan mencapai skor System Usability Scale (SUS) yang lebih tinggi dibandingkan dengan metode pembukuan manual pada responden pelaku agribisnis?
---

## Latihan 2 — Hypothesis Pair

Rumuskan pasangan hipotesis dari RQ di Latihan 1.

| Komponen | Isi |
|----------|-----|
| H₀ | Tidak ada perbedaan signifikan waktu entri data antara aplikasi web dan manual, serta skor SUS aplikasi berada di bawah atau sama dengan ambang batas global 68. |
| H₁ |aplikasi web memangkas waktu entri data secara signifikan dibandingkan manual, dan mencapai skor SUS di atas 68 yang mengindikasikan usability tinggi. |
| Metrik |Waktu penyelesaian tugas (Task Completion Time dalam detik) dan skor System Usability Scale (SUS) |
| Threshold |p-value < 0.05 untuk uji beda waktu, dan Skor SUS > 68. |
| Justifikasi threshold |p-value 5% adalah standar statistik meminimalkan Type I error, sedangkan 68 adalah ambang batas rata-rata global untuk metode SUS. |

**Apakah hipotesis ini falsifiable?** [x] Ya / [ ] Tidak
> Bagaimana cara membuktikannya salah? Melakukan eksperimen time-motion dan menyebarkan kuesioner SUS. Jika hasil uji t-test menunjukkan p-value > 0.05 (waktu entri sama lamanya) atau skor akhir SUS hasil perkalian respons pengguna lebih kecil dari 68, maka H₁ gugur dan H₀ diterima.

---

## Latihan 3 — Rantai Operasionalisasi

Lengkapi rantai dari RQ hingga metode analisis.

| Tahap | Isi |
|-------|-----|
| RQ | Apakah penggunaan aplikasi berbasis web memangkas waktu entri dan mencapai skor SUS lebih tinggi dari manual?|
| Variable (IV) | Metode antarmuka pencatatan (Aplikasi Web vs Buku Kas Manual). |
| Variable (DV) |Efisiensi operasional dan kepuasan/penerimaan pengguna. |
| Metric |Durasi waktu (detik) dan Usability Score (0-100).|
| Data source |Rekaman stopwatch saat responden mengerjakan skenario tugas (task scenario) dan respons 10 butir pertanyaan kuesioner skala Likert (1-5). |
| Analysis method |Paired T-test (untuk membandingkan metrik waktu) dan formula konversi perhitungan SUS. |

**Apakah rantai lengkap?** [x] Ya / [ ] Tidak
> Jika tidak, tahap mana yang perlu direvisi? ______________

---

## Refleksi

> Ambil satu judul skripsi/paper yang pernah dibaca. Coba ekstrak RQ-nya. Apakah RQ tersebut memenuhi semua komponen (metode, metrik, baseline, konteks)? Jika tidak, apa yang hilang?

**Judul:** "Evaluation of Smart Agriculture Prototype using SUS Method".
**RQ yang diekstrak:**Bagaimana tingkat fungsionalitas dan skor usability dari prototipe aplikasi pertanian pintar (smart farming) berbasis mobile ketika dievaluasi oleh responden petani berusia 23-70 tahun menggunakan metode Black Box dan SUS?.
**Komponen yang hilang:** Di dalam paper tersebut, penelitian lebih condong ke arah Exploratory / Improvement sistem mandiri, sehingga tidak ada Baseline komparatif (metode pesaing) dalam perumusan eksperimennya. Sistem hanya dievaluasi secara terisolasi lalu skor SUS akhirnya dibandingkan dengan standar teoretis (nilai 68), tanpa membandingkannya dengan aplikasi sejenis atau metode konvensional secara head-to-head.
