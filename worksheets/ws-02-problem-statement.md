# WS-02: Problem Statement

> **Bab 2 — Problem Formulation & System Context**

---

## Ringkasan Materi

### Problem Formation Model

Masalah riset melewati 5 tahap transformasi. Melompat langsung dari Reality ke Variable adalah kesalahan paling umum.

```
Reality → Observed Issue (Symptom) → Diagnosed Problem (Root Cause)
→ Researchable Problem (Scoped) → Measurable Variable (Operationalized)
```

### Topic ≠ Problem ≠ Research Problem

| Level | Contoh | Status |
|-------|--------|--------|
| **Topik** | Keamanan IoT | Terlalu luas, tidak bisa diuji |
| **Problem** | MQTT tidak terenkripsi | Spesifik tapi belum riset |
| **Research Problem** | Belum ada studi membandingkan overhead TLS 1.3 vs DTLS pada MQTT di IoT RAM < 64KB | Bisa dirancang eksperimennya |

### Symptom vs Root Cause

Apa yang diamati (gejala) ≠ mengapa terjadi (akar masalah). Gunakan **5 Whys** atau **Fishbone Diagram** untuk menggali.

Contoh: "User meninggalkan checkout" (symptom) → "Waktu loading > 8 detik karena API call sequential" (root cause).

### System Thinking

Setiap masalah riset TI harus terikat pada komponen sistem: **Input → Process → Output → Outcome → Constraints → Stakeholders**.

### Problem Quality Check

Masalah riset yang layak harus memenuhi 5 kriteria:
- **Clarity** — Satu orang membaca akan paham
- **Measurability** — Ada metrik kuantitatif
- **Relevance** — Penting untuk domain
- **Testability** — Bisa gagal (falsifiable)
- **Impact** — Ada kontribusi jika terjawab

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan | Menyelesaikan masalah (*solve*) | Memahami dan membuktikan (*understand & prove*) |
| Masalah | Bug, error, fitur belum ada | Gap dalam pengetahuan |
| Scope | Selesaikan semua yang perlu | Batasi agar bisa dibuktikan |
| Output | Working system | Evidence, paper, replicable findings |

### Istilah Penting

- **Problem Statement** — Formulasi tertulis: konteks sistem + gap + dampak + justifikasi
- **System Context** — Deskripsi lengkap: input, proses, output, outcome, constraints, stakeholders
- **Problem Drift** — Masalah "bermutasi" dari pendahuluan ke metodologi karena statement awal tidak presisi
- **Solution-First Thinking** — Memulai dari solusi tanpa masalah yang jelas — berbahaya dalam riset
- **Operational Definition** — Definisi variabel yang cukup jelas agar peneliti lain bisa mengukur hal yang sama

---

## Template A.2 — Problem Statement Builder

```
PROBLEM STATEMENT BUILDER

Domain & Konteks
  Domain   : Keuangan Komputasi (Financial Technology)
  Konteks  : Prediksi harga saham berbasis Time Series di era big data
System Context
  Input       : Data historis harga saham (OHLC: Open, High, Low, Close)
  Process     : Optimasi hyperparameter LSTM menggunakan Genetic Algorithm (GA) 
  Output      : Prediksi harga saham yang akurat sesuai tren pasar 
  Outcome     : Memberikan referensi ilmiah bagi investor dalam pengambilan keputusan
  Constraints : Privasi data perusahaan, volatilitas pasar, dan overhead komputasi 
  Stakeholders: Investor, Analis Keuangan, Peneliti Big Data

Fenomena → Problem
  Fenomena yang diamati             : Pergeseran metode prediksi dari analisis tradisional ke algoritma Time Series
  Gejala (symptom) yang terukur     : Ketidakmampuan model tradisional beradaptasi dengan perubahan lingkungan pasar yang cepat
  Masalah yang didiagnosis          :  Kurangnya generalisasi pada model LSTM standar akibat pemilihan parameter yang tidak optimal 
  Masalah riset (researchable)      : pakah integrasi GA ke dalam LSTM dapat mengoptimalkan parameter secara otomatis untuk meningkatkan akurasi prediksi saham? 
  Variabel yang terukur             : MAE, MSE, RMSE, dan R²

Problem Quality Check
  [x] Clarity — Apakah satu orang membaca akan paham?
  [x] Measurability — Apakah ada metrik kuantitatif?
  [x] Relevance — Apakah penting untuk domain?
  [x] Testability — Apakah bisa gagal?
  [x] Impact — Apakah ada kontribusi jika terjawab?

Problem Statement (1 paragraf):
  Model Deep Learning seperti LSTM sering kali mengalami kendala dalam menangkap pola volatilitas pasar yang kompleks karena pemilihan hyperparameter yang tidak optimal. Riset ini mengusulkan algoritma hybrid yang mengintegrasikan Genetic Algorithm untuk mengoptimasi arsitektur LSTM. Kontribusi utama dari penelitian ini adalah meningkatkan akurasi prediksi harga saham dengan menurunkan nilai MAE hingga 2.41 dan mencapai nilai R² sebesar 0.87, sehingga menghasilkan sistem prediksi yang lebih andal bagi investor di pasar modal.
```

---

## Latihan 1 — Dari Topik ke Masalah Riset

Pilih satu topik di bidang TI yang diminati. Transformasikan melalui 5 tahap Problem Formation Model.

**Topik awal:** ________________________________________

| Tahap | Hasil |
|-------|-------|
| Reality | Pasar saham bersifat dinamis dan kompleks  |
| Observed Issue (Symptom) | Model prediksi tradisional memiliki akurasi rendah dan gagal mengikuti tren|
| Diagnosed Problem (Root Cause) |Hyperparameter LSTM tidak optimal dan sulit ditentukan secara manual |
| Researchable Problem |Optimasi hyperparameter LSTM menggunakan GA untuk prediksi harga saham  |
| Measurable Variable |Nilai RMSE, MAE, R² |

**Apakah terjebak solution-first thinking?** [ ] Ya / [x] Tidak
> Jika ya, kembali ke tahap mana? ________________________

---

## Latihan 2 — System Context Decomposition

Gambarkan konteks sistem dari masalah riset di Latihan 1.

| Komponen | Deskripsi |
|----------|----------|
| Input | Data historis OHLC (Open, High, Low, Close)|
| Process |Seleksi, crossover, dan mutasi GA untuk mencari parameter LSTM terbaik |
| Output | Nilai prediksi harga saham di masa depan |
| Outcome | Prediksi yang konsisten dengan tren harga aktual |
| Constraints | Data yang fluktuatif dan kebutuhan generalization ability |
| Stakeholders | investor dan Analis Keuangan |

**Komponen mana yang paling relevan dengan masalah riset?** Process (karena di tahap ini GA melakukan evolusi untuk mencari solusi optimal bagi LSTM).
---

## Latihan 3 — Problem Quality Check

Evaluasi problem statement yang sudah dibuat menggunakan 5 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | 5 | Masalah sangat spesifik dan terdefinisi|
| Measurability |5 |Metrik performa (MAE/RMSE) sangat standar di literatur |
| Relevance | 4| Penting untuk mendukung keputusan finansial |
| Testability |4 |Eksperimen dilakukan dengan dataset historis |
| Impact |4 |Memberikan metode yang lebih generalizable  |

**Skor total:** 22 / 25

**Problem statement versi final (1 paragraf):**
Penelitian ini berfokus pada optimasi model Time Series untuk prediksi harga saham di tengah kompleksitas data pasar keuangan. Dengan menggunakan pendekatan hibrida Genetic Algorithm (GA) untuk melakukan tuning hyperparameter pada Long Short-Term Memory (LSTM), riset ini berhasil mengatasi masalah ketidakstabilan model standar. Hasil eksperimen menunjukkan bahwa model ini mampu menekan tingkat kesalahan prediksi (MAE 2.41) dan memiliki tingkat konsistensi yang tinggi dengan tren harga aktual, sehingga memberikan kontribusi signifikan bagi analisis pasar modal modern.

---

## Refleksi

> Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?

**Jawaban:**
>Perbedaan fundamental terletak pada tujuan akhirnya. Coding (Bug/Error) bertujuan untuk mengembalikan sistem ke perilaku yang seharusnya (correctness), di mana ada kondisi "benar" dan "salah". Sedangkan Riset bertujuan untuk mencari jawaban atas gap pengetahuan atau mencari efisiensi yang lebih baik (optimality). Dalam riset, kita tidak memperbaiki sistem yang rusak, melainkan menguji hipotesis untuk menciptakan metode yang lebih unggul dibandingkan metode yang ada sebelumnya.
