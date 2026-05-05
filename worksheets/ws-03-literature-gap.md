# WS-03: Literature Mapping & Gap

> **Bab 3 — Literature Review, Research Gap & Baseline**

---

## Ringkasan Materi

### Literature Review = Positioning, Bukan Ringkasan

Literature review bukan merangkum paper satu per satu. Pendekatan yang benar adalah **concept-centric** — organisasi berdasarkan tema, metode, atau variabel. Tujuan: menemukan **pola, kontradiksi, dan gap**.

### Empat Jenis Research Gap

| Jenis Gap | Deskripsi | Contoh |
|-----------|----------|--------|
| **Performance Gap** | Performa belum memadai | Akurasi deteksi hanya 78% pada kasus tertentu |
| **Method Gap** | Pendekatan belum diterapkan | Belum ada yang pakai transformer untuk task ini |
| **Data Gap** | Dataset terbatas/tidak representatif | Semua studi pakai dataset sintetis |
| **Context Gap** | Belum diuji pada konteks berbeda | Belum ada evaluasi di negara berkembang |

Gap terkuat = kombinasi 2+ jenis.

### Systematic Search Strategy

1. **Database**: IEEE Xplore, ACM DL, Scopus, Google Scholar
2. **Boolean query** yang terdokumentasi eksplisit
3. **Snowballing**: backward (telusuri referensi) + forward (cari yang mengutip)
4. Klaim "belum ada penelitian" harus didukung **bukti pencarian**

### Baseline Selection — 3 Kriteria

| Kriteria | Pertanyaan |
|----------|-----------|
| **Relevan** | Apakah menyelesaikan masalah yang sama? |
| **Representatif** | Apakah mewakili common practice? |
| **State-of-the-Art** | Apakah terbaru/terbaik? |

Membandingkan deep learning 2024 dengan decision tree sederhana tanpa justifikasi = **straw man comparison** (perbandingan tidak jujur).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan baca literatur | Mencari solusi yang sudah ada | Memahami apa yang belum terjawab |
| Cara membaca paper | Tutorial, how-to | Metode, limitasi, gap |
| Baseline | Framework terpopuler | State-of-the-art yang rigorous |
| Dokumentasi pencarian | Tidak diperlukan | Wajib (reproducible) |

### Istilah Penting

- **Concept-centric** — Organisasi literatur berdasarkan konsep/metode, bukan per penulis
- **Snowballing** — Backward (telusuri referensi) + Forward (cari yang mengutip paper kunci)
- **Research Position** — Pernyataan eksplisit posisi riset terhadap studi sebelumnya
- **Straw man comparison** — Memilih baseline lemah agar metode sendiri terlihat lebih baik

---

## Template A.3 — Literature Mapping & Gap Identification

```
LITERATURE MAPPING

Topik      : Optimasi Hyperparameter LSTM menggunakan Genetic Algorithm untuk Prediksi Harga Saham
Database   : IEEE Xplore, Google Scholar, Scopus
Query      : ("Stock Price Prediction" OR "Financial Time Series") AND "LSTM" AND ("Genetic Algorithm" OR "Hyperparameter Optimization")
Tahun      : 2018 - 2024
Hasil awal : 45 paper → Screening → 5 paper final

Literature Matrix (concept-centric):

| Study | Tahun | Method | Data | Result | Limitation |
|-------|-------|--------|------|--------|------------|
| Siami-Namini et al. | 2018 | ARIMA vs LSTM | Indeks S&P 500 | LSTM mengungguli ARIMA (RMSE turun 85%) | Konfigurasi hyperparameter LSTM dilakukan secara default/manual |
| Chung & Shin | 2018 | GA-LSTM | KOSPI (Korea) | Akurasi GA-LSTM lebih tinggi dibanding LSTM standar | Waktu komputasi sangat tinggi, ruang pencarian parameter belum dibatasi |
| Haider et al. | 2022 | ANN, CNN, LSTM | Solar/Time Series | LSTM unggul di horizon waktu 1-3 jam (R² 0.98) | Gagal menangkap volatilitas untuk prediksi jangka panjang (>6 jam) |
| Dhake et al. | 2023 | HBO & GA - LSTM | Time Series (Irradiance) | GA & HBO menurunkan RMSE hingga 53.42% | Data dekomposisi frekuensi tinggi (noise) tetap sulit diprediksi |
| Sha, Xinye | 2024 | GA-LSTM | Mastercard Stock (OHLC) | MAE 2.41, R² 0.87, sangat fit dengan tren | Diuji pada single stock (studi kasus tunggal), belum diuji lintas sektor |

Pola yang ditemukan:
  Metode dominan     : Long Short-Term Memory (LSTM) sebagai baseline, dikombinasikan dengan algoritma optimasi (GA).
  Dataset umum       : Data historis harga penutupan (Close) atau OHLCV saham-saham Blue Chip/Indeks global.
  Limitasi berulang  : Model LSTM sensitif terhadap perubahan parameter, dan optimasi manual sering terjebak di local optima. Seringkali model kesulitan menghadapi data berfrekuensi tinggi (noise market).

GAP IDENTIFICATION

Gap 1: [Jenis: Performance & Method Gap]
  Deskripsi    : Penentuan hyperparameter LSTM secara manual (trial-and-error) menghasilkan performa yang tidak stabil dan gagal menggeneralisasi volatilitas pasar yang tinggi.
  Bukti        : Siami-Namini (2018) dan Haider (2022) mencatat penurunan akurasi pada LSTM standar saat menghadapi data fluktuatif, sementara Sha (2024) dan Dhake (2023) membuktikan perlunya algoritma pencarian global (GA) untuk menekan error.
  Signifikansi : Mengotomatisasi tuning parameter akan menghasilkan arsitektur AI yang lebih efisien dan andal untuk sistem trading otomatis atau analisis kuantitatif.

Gap 2: [Jenis: Context & Data Gap]
  Deskripsi    : Mayoritas studi (seperti Sha, 2024) hanya menguji model hybrid pada saham tunggal berkapitalisasi raksasa (misal: Mastercard) atau indeks negara maju (S&P 500).
  Bukti        : Tabel literatur menunjukkan dominasi dataset pasar maju. Belum ada pengujian ketat komparasi GA-LSTM pada saham-saham di pasar berkembang (Emerging Markets) yang memiliki karakteristik volatilitas dan manipulasi yang berbeda.
  Signifikansi : Menjawab pertanyaan apakah model ini cukup robust untuk diterapkan sebagai instrumen analisis bagi investor ritel di ekosistem bursa lokal (seperti edukasi literasi keuangan di KSPM).

Baseline Selection:
| Baseline         | Relevansi                           | Representatif                          | Source              |
|------------------|-------------------------------------|----------------------------------------|---------------------|
| LSTM (Standar)   | Task sama: Prediksi deret waktu.    | Mewakili "common practice" deep learning tanpa optimasi eksternal. | Siami-Namini (2018) |
| ARIMA            | Task sama: Prediksi deret waktu.    | Mewakili standar emas metode statistika tradisional di pasar modal. | Siami-Namini (2018) |
```

---

## Latihan 1 — Concept-Centric Literature Table

Gunakan topik riset dari WS-02. Cari minimal 5 paper relevan menggunakan Google Scholar atau database lain.


**Topik riset:** Prediksi Harga Saham menggunakan Hybrid GA-LSTM
**Query pencarian:** `"Stock Price" AND "LSTM" AND "Genetic Algorithm"`
**Database:** Google Scholar, IEEE Xplore

| # | Study | Tahun | Method | Dataset | Result | Limitasi |
|---|-------|-------|--------|---------|--------|----------|
| 1 | *Siami-Namini et al.* | 2018 | ARIMA vs LSTM | S&P 500 | LSTM > ARIMA (RMSE LSTM jauh lebih rendah) | *Hyperparameter* tidak dioptimasi (default) |
| 2 | *Chung & Shin* | 2018 | GA-LSTM | KOSPI | GA-LSTM mengalahkan model standar | Konfigurasi GA memakan *resource* besar |
| 3 | *Dhake et al.* | 2023 | GA & HBO - LSTM | Time Series Data | Error (RMSE) turun 53.42% dengan optimasi | Kesulitan memprediksi sinyal *noise* tinggi |
| 4 | *Sha, Xinye* | 2024 | GA-LSTM | Saham Mastercard | MAE 2.41, R² 0.87 (sangat konvergen) | Hanya divalidasi pada satu instrumen saham |
| 5 | *Zhao et al.* | 2023 | VMD-LSTM/GRU | Time Series | Model hybrid lebih baik tangani data non-stasioner | Ruang lingkup bukan data finansial murni |

**Pola yang terlihat — Metode dominan:** Penggunaan LSTM sebagai prosesor *time-series* utama, dipadukan dengan algoritma metaheuristik (GA) untuk *tuning*.
**Limitasi yang berulang:** Tantangan *computational cost* saat iterasi evolusi GA dan kesulitan model saat data terlalu *noisy* (fluktuasi harian yang acak).

**Pola yang terlihat — Metode dominan:** ___________________
**Limitasi yang berulang:** ______________________________

---

## Latihan 2 — Gap Identification

Berdasarkan tabel di Latihan 1, identifikasi gap.

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [x] Ya / [ ] Tidak | Akurasi prediksi LSTM standar terdegradasi drastis saat menghadapi volatilitas ekstrem karena terjebak *local optima*. |
| Method Gap | [x] Ya / [ ] Tidak | Mayoritas peneliti masih menggunakan *grid search* atau *manual tuning* yang tidak efisien untuk menemukan arsitektur LSTM terbaik. |
| Data Gap | [ ] Ya / [x] Tidak | Dataset OHLC sangat melimpah, tidak ada kekurangan data secara kuantitas. |
| Context Gap | [x] Ya / [ ] Tidak | Evaluasi GA-LSTM pada indeks pasar saham berkembang (Emerging Markets) yang memiliki anomali harga berbeda masih sangat terbatas. |

**Gap utama yang dipilih:** Kombinasi **Method Gap** dan **Context Gap** (Implementasi algoritma pencarian global GA untuk menutupi kelemahan *tuning* manual LSTM, dievaluasi pada dataset pasar saham berkembang/lokal).

**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Karena pergerakan pasar saham tidak linear. Menggunakan parameter *default* pada AI bisa berakibat fatal berupa kerugian finansial. Mengisi gap ini tidak hanya menyumbang arsitektur perangkat lunak yang lebih efisien di sisi akademis, tetapi juga menyediakan instrumen keputusan (*outcome*) yang lebih *reliable* bagi *stakeholders* (investor ritel).
---

## Latihan 3 — Baseline Selection

Pilih 2 baseline dari literatur yang sudah dibaca.

| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | Model LSTM Standar | Sama-sama menggunakan arsitektur *Deep Learning* untuk memproses data deret waktu (*time-series*). | Digunakan di hampir semua paper komparasi sebagai acuan performa dasar sebelum optimasi. | Bukan SOTA, tetapi mewakili *common practice* saat ini. | Sha (2024) |
| 2 | Model ARIMA | Memiliki tujuan yang sama yaitu melakukan peramalan (*forecasting*) nilai masa depan berdasarkan data historis. | Merupakan standar emas dalam metode statistika tradisional yang sangat lazim digunakan oleh analis pasar modal. | Bukan, ini adalah *statistical baseline* klasik. | Siami-Namini (2018) |

**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak

> **Justifikasi:** Pemilihan baseline ini bukan *straw man* (perbandingan tidak adil) karena tujuan utama riset ini adalah membuktikan efektivitas algoritma optimasi. Dengan membandingkan GA-LSTM terhadap LSTM standar, kita menunjukkan secara jujur dampak dari penambahan *Genetic Algorithm*. Sedangkan penggunaan ARIMA bertujuan untuk menunjukkan keunggulan pendekatan AI dibandingkan metode statistik konvensional yang masih banyak digunakan di industri.
---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
Klaim "belum ada yang meneliti ini" sering kali bermuara pada topik yang sebenarnya memang tidak penting atau tidak make sense untuk diteliti (misal: "belum ada yang memprediksi harga saham menggunakan suhu udara"). Itu adalah asumsi kosong. Sebaliknya, research gap yang valid didasarkan pada tinjauan literatur yang sistematis (concept-centric). Gap ini menunjukkan adanya kebutuhan (need) yang belum terpenuhi atau limitasi teknis pada metode sebelumnya.

Cara membuktikannya adalah dengan membuat Literature Matrix. Kita menjajarkan state-of-the-art (SOTA) yang ada saat ini, merangkum Results dan Limitations mereka secara terstruktur, dan menunjukkan secara konkret di bagian mana titik lemah (Performance/Method/Context) yang secara konsisten diakui oleh para peneliti terdahulu, lalu kita masuk untuk mengisi lubang tersebut..
