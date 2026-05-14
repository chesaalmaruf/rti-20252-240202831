# WS-05: Variabel & Metrik

> **Bab 5 — Metric, Measurement & Data**

---

## Ringkasan Materi

### Measurement Alignment Model

Setiap pengukuran yang valid harus bisa ditelusuri melalui rantai ini tanpa lompatan logis:

```
Problem → Concept → Variable → Metric → Data → Result
```

### Operationalization = Keputusan Desain

Menerjemahkan konsep abstrak menjadi variabel terukur bukan proses mekanis. "Code quality" yang diukur via SonarQube code smells membawa asumsi implisit. Setiap operasionalisasi harus didokumentasikan dan dijustifikasi.

### Empat Tipe Data (NOIR)

| Tipe | Ciri | Contoh | Operasi Valid |
|------|------|--------|---------------|
| **Nominal** | Kategori, tanpa urutan | Jenis algoritma (RF, SVM, CNN) | Modus, chi-square |
| **Ordinal** | Urutan, interval tidak sama | Skala Likert (1-5) | Median, Spearman |
| **Interval** | Jarak bermakna, tanpa nol absolut | Suhu Celsius | Mean, Pearson, t-test |
| **Ratio** | Jarak bermakna + nol absolut | Waktu eksekusi (ms) | Semua operasi |

Tipe data menentukan uji statistik yang valid. Kebanyakan metrik performa TI = ratio; persepsi pengguna = ordinal.

### Kriteria Pemilihan Metrik

- **Representative** — Mewakili konsep yang diteliti
- **Sensitive** — Cukup peka menangkap perbedaan bermakna (hindari ceiling effect)
- **Feasible** — Bisa dikumpulkan dalam batasan waktu dan biaya

### Pre-registration

Metrik harus ditentukan **sebelum** eksperimen. Memilih metrik setelah melihat data = **p-hacking**. Metrik tambahan yang ditemukan kemudian dilaporkan sebagai *exploratory*, bukan *confirmatory*.

### Primary vs Secondary Metric

- **Primary Metric** — Langsung terikat ke hipotesis, menentukan kesimpulan
- **Secondary Metric** — Pendukung, dilaporkan di samping primary; statusnya suplementer

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Pemilihan metrik | Berdasarkan kebiasaan/tool yang ada | Berdasarkan construct validity |
| Anomali | Dihapus untuk laporan bersih | Diinvestigasi — bisa jadi temuan |
| Kapan dipilih | Setelah sistem jadi (monitoring) | Sebelum eksperimen (by design) |

### Istilah Penting

- **Operationalization** — Transformasi konsep abstrak menjadi variabel terukur
- **Construct Validity** — Sejauh mana pengukuran benar-benar mengukur konsep yang dimaksud
- **Measurement Scale** — Klasifikasi data (NOIR) yang menentukan analisis valid
- **Multi-metric Evaluation** — Menggunakan beberapa metrik untuk menangkap konsep kompleks

---


## Template A.5 — Definisi Variabel, Metrik & Justifikasi
```
**VARIABLE & METRIC DEFINITION**

**Research Question:** Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput* yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users*?

| Variabel | Tipe | Konsep | Metrik | Skala | Satuan | Cara Mengukur | Justifikasi |
|----------|------|--------|--------|-------|--------|---------------|-------------|
| **Jenis DBMS** | IV | Teknologi Basis Data | Kategori (Postgres vs MongoDB) | Nominal | - | Penentuan jenis DB pada *database connection string* di Node.js. | Standar untuk riset komparasi teknologi DBMS. |
| **Latency** | DV | Kecepatan Respon | *Average response time* per *request* | Ratio | ms | Menggunakan metrik `average` dari hasil *load test* Autocannon. | Mengukur pengalaman pengguna langsung saat proses login. |
| **Throughput** | DV | Kapasitas Sistem | *Total requests processed per second* | Ratio | req/s | Menggunakan metrik `Requests/sec` (RPS) dari output Autocannon. | Mengukur kemampuan skalabilitas basis data saat beban tinggi. |
| **Beban Konkurensi** | CV | Intensitas Trafik | Jumlah koneksi simultan (500) | Ratio | users | Parameter `-c 500` pada perintah eksekusi Autocannon. | Mencegah bias akibat fluktuasi jumlah trafik selama pengujian. |
| **Volume Data** | CV | Skala Data | Jumlah record user (100.000) | Ratio | records | Query `COUNT` pada tabel/koleksi user sebelum pengujian dimulai. | Memastikan perbandingan dilakukan pada beban data yang adil (*apple-to-apple*). |

**Alignment Check:**
* [x] **Setiap langkah terdokumentasi:** Rantai dari RQ ke instrumen ukur sudah terurai jelas.
* [x] **Tidak ada "lompatan logis":** Latency dan Throughput adalah manifestasi teknis yang tepat untuk konsep "performa".
* [x] **Metrik mengukur apa yang dimaksud (construct validity):** RPS secara akurat mengukur kapasitas kerja sistem per satuan waktu.
```
---

## Latihan 1 — Operationalization Chain

**RQ:** Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput* yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users*?

| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
| **Jenis DBMS** | IV | Teknologi penyimpanan | PostgreSQL vs MongoDB | Nominal | - |
| **Throughput** | DV | Efisiensi Kapasitas | *Requests Per Second* (RPS) | Ratio | req/s |
| **Algoritma Hashing**| CV | Beban Komputasi | Bcrypt (10 rounds) | Nominal | - |

**Apakah ada lompatan logis dalam rantai?** [x] Tidak
> **Justifikasi:** RPS adalah metrik standar dalam rekayasa perangkat lunak untuk mengukur efisiensi pemrosesan, sehingga valid untuk operasionalisasi konsep "kapasitas".

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik **Latency (Average Response Time)**.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| **Representative** | 5 | Latency adalah indikator utama kenyamanan pengguna dalam sistem autentikasi. |
| **Sensitive** | 5 | Skala milidetik (ms) sangat peka dalam mendeteksi perbedaan performa sekecil apa pun antar DBMS. |
| **Feasible** | 5 | Data mudah didapatkan secara otomatis melalui library benchmarking Node.js (Autocannon). |

**Apakah perlu secondary metric?** [x] Ya
> **Apa dan mengapa?** **Resource Usage (CPU/RAM Usage)**. Karena basis data yang cepat namun sangat boros sumber daya mungkin tidak efisien secara biaya infrastruktur dalam jangka panjang.

**Contoh kasus ceiling effect untuk metrik ini:**
> Jika *bandwidth* jaringan server mencapai batas maksimal (100%), maka latency PostgreSQL dan MongoDB akan terlihat sama-sama buruk, sehingga perbedaan performa asli dari database tidak lagi teramati.

---

## Latihan 3 — Data Quality Check

| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| **Completeness** | Apakah semua data point terkumpul? | Ya, setiap *request* yang berhasil atau gagal akan tercatat di log. | Menangani *timeout* agar tidak dianggap sebagai respon yang sangat cepat. |
| **Consistency** | Apakah ada kontradiksi internal? | Mungkin ada perbedaan antara *cold start* dan *warm start*. | Melakukan fase *warm-up* selama 10 detik sebelum pencatatan data dimulai. |
| **Validity** | Apakah benar-benar mengukur yang dimaksud? | Ya, timer mengukur durasi penuh dari request hingga response. | Mengisolasi server agar tidak ada proses latar belakang yang mengganggu CPU. |
| **Representativeness** | Apakah sampel mewakili populasi target? | Ya, 100k data mewakili aplikasi skala menengah yang umum. | Menggunakan library `faker.js` untuk membuat kredensial user yang variatif. |

---

## Refleksi

**Jawaban:**
> Memilih metrik setelah melihat data dianggap **p-hacking** karena peneliti cenderung memilih metrik yang hanya mendukung hipotesis mereka dan mengabaikan yang tidak signifikan, sehingga objektivitas riset hilang. Perbedaannya dengan **eksplorasi data yang sah** adalah eksplorasi bertujuan untuk menemukan hipotesis baru untuk penelitian selanjutnya, bukan untuk membuktikan hipotesis yang sudah ada dengan cara memanipulasi metrik yang dilaporkan.
