# WS-07: Experimental Design & Validity

> **Bab 7 — Experimental Design & Validity**

---

## Ringkasan Materi

### Correlation ≠ Causality

Kausalitas membutuhkan 3 syarat:
1. **Covariance** — X dan Y bergerak bersama
2. **Temporal precedence** — X berubah sebelum Y
3. **Elimination of alternatives** — Tidak ada faktor lain yang menjelaskan Y

Controlled experiment adalah satu-satunya metode yang bisa membuktikan kausalitas.

### Empat Jenis Validitas

| Jenis | Pertanyaan | Ancaman Umum |
|-------|-----------|-------------|
| **Internal** | Apakah hubungan IV→DV nyata? | Confounding variable, selection bias |
| **External** | Apakah bisa digeneralisasi? | Dataset terlalu spesifik |
| **Construct** | Apakah mengukur konsep yang benar? | Metrik tidak sesuai |
| **Conclusion** | Apakah kesimpulan statistik valid? | Sample size kecil, uji salah |

Internal dan external validity sering berkonflik: semakin terkontrol (internal kuat) → semakin artificial (external lemah).

### Tiga Tipe Eksperimen dalam Riset TI

| Tipe | Deskripsi | Kapan Digunakan |
|------|----------|----------------|
| **Comparison Study** | Metode A vs B pada kondisi identik | Membandingkan pendekatan berbeda |
| **Ablation Study** | Full system → lepas komponen satu per satu | Mengukur kontribusi tiap komponen |
| **Parameter Study** | Variasikan satu parameter, amati dampak | Uji sensitifitas/robustness |

### Fairness dalam Perbandingan

Perbandingan yang adil = **kondisi identik** untuk semua metode: dataset sama, preprocessing sama, tuning effort sebanding, environment sama, metrik sama.

Contoh tidak adil: Transformer (30 fitur tambahan + Bayesian optimization) vs RF (default params) → hasilnya misleading.

### Threats to Validity = Diidentifikasi Sebelum Eksperimen

Ancaman validitas harus diidentifikasi **sebelum** eksperimen dan mitigasinya dirancang sebagai bagian dari desain — bukan ditulis sebagai boilerplate setelah selesai.

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan testing | Memastikan sistem memenuhi requirement | Membuktikan hubungan kausal antar variabel |
| Baseline | Versi sebelumnya (last release) | Metode tervalidasi dari literatur |
| Kegagalan | Bug → fix → release | H₀ tidak ditolak → tetap kontribusi ilmiah |
| Sukses | 100% test pass | Evidence valid — mendukung atau menolak hipotesis |

### Istilah Penting

- **Causality** — Hubungan sebab-akibat (covariance + temporal + elimination)
- **Controlled Experiment** — Ubah satu variabel, kontrol sisanya, amati efek
- **Fairness** — Semua metode diuji pada kondisi yang benar-benar identik
- **Threats to Validity** — Faktor yang bisa melemahkan kesimpulan jika tidak dimitigasi
- **Conclusion Validity** — Validitas statistik: power, sample size, uji yang tepat

---

## Template A.7 — Desain Eksperimen Lengkap

EXPERIMENT DESIGN

Research Question : Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput* yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users*?
Hypothesis        : MongoDB memiliki rata-rata latency login minimal 20% lebih rendah dibandingkan PostgreSQL pada dataset 100.000 record.
Tipe Eksperimen   : [X] Comparison  [ ] Ablation  [ ] Parameter

Kondisi Eksperimen:

| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | Standard Relational DB Baseline | PostgreSQL v16 | Node.js, Prisma ORM, 100k data, 500 CC, Bcrypt (10 rounds), Dockerized. |
| Treatment | Document-Oriented NoSQL | MongoDB v7.0 | Node.js, Prisma ORM, 100k data, 500 CC, Bcrypt (10 rounds), Dockerized. |

Fairness Checklist:
[x] Dataset identik untuk semua kondisi** (Menggunakan *seed* data yang sama persis).
[x] Preprocessing setara (Proses enkripsi *bcrypt* dan validasi model oleh Prisma ORM sama).
[x] Tuning effort setara (Keduanya menggunakan konfigurasi *default* bawaan image Docker resmi dan index pada kolom email).
[x] Environment identik (Spesifikasi CPU/RAM dibatasi sama rata melalui `docker-compose`).
[x] Metrik evaluasi sama (Diukur menggunakan skrip Autocannon yang identik).

Threat Analysis:

| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal | Fluktuasi penggunaan CPU/RAM oleh proses OS latar belakang yang mempengaruhi kecepatan request. | Mengisolasi *environment* pengujian menggunakan *Docker Container* dengan batas *resource* tetap. |
| External | Pola *request* Autocannon mungkin tidak mencerminkan perilaku *login* pengguna nyata (misal: jeda ketik). | Eksperimen dibatasi pada pengujian murni kapasitas infrastruktur (*stress test*), bukan uji pengguna (user test). |
| Construct | *Latency* jaringan internet (*network jitter*) bercampur dengan *latency* pemrosesan database. | Melakukan pengujian dalam jaringan internal server (*localhost/Docker bridge*), bukan melalui internet publik. |
| Conclusion | Anomali performa pada saat eksekusi pertama (*Cold Start*). | Melakukan fase *warm-up* selama 10 detik dan mengulangi pengujian minimum 30 kali untuk mendapatkan rata-rata statistik. |

Statistical Plan:
Uji statistik   : Independent Sample T-Test (atau Mann-Whitney U jika data tidak berdistribusi normal).
Justifikasi     : Membandingkan nilai rata-rata dari dua kelompok eksperimen yang sepenuhnya independen (PostgreSQL vs MongoDB).
Alpha           : 0.05
Effect size min : Cohen's d > 0.5 (Tingkat efektivitas sedang/terasa perbedaannya).

---

## Latihan 1 — Desain Eksperimen

RQ: Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users?
Tipe eksperimen: [X] Comparison / [ ] Ablation / [ ] Parameter

| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | Uji performa pada arsitektur Relasional | PostgreSQL | Dataset dummy 100k, index on email, Node.js + Prisma. |
| Treatment | Uji performa pada arsitektur Dokumen | MongoDB | Dataset dummy 100k, index on email, Node.js + Prisma. |

---

## Latihan 2 — Fairness Checklist

| Kriteria | Status | Detail |
|----------|--------|--------|
| **Dataset identik** | ✅ Setara | Sama-sama menggunakan 100.000 baris data JSON yang di-*generate* menggunakan `faker.js`. |
| **Preprocessing setara**| ✅ Setara | Skrip otentikasi melalui alur yang persis sama: Menerima JSON -> Query DB pakai Prisma -> Bcrypt Compare. |
| **Tuning effort setara**| ✅ Setara | Kedua DB menggunakan konfigurasi default dan sama-sama dipasang *Single Index* pada *field* email. |
| **Environment identik** | ✅ Setara | Dijalankan pada mesin yang sama secara bergantian dalam *Docker container* dengan spesifikasi yang dikunci (`cpus: 2`, `mem_limit: 2g`). |
| **Metrik evaluasi sama**| ✅ Setara | Diukur menggunakan alat yang sama (Autocannon) dan durasi waktu yang sama (30 detik). |

**Ada yang tidak fair?** [ ] Ya / [X] Tidak

---

## Latihan 3 — Threat Analysis

| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal | Data yang di-cache (*Query Cache*) membuat uji kedua lebih cepat dari uji pertama. | Me-restart *container* database atau menghapus *cache* sebelum eksekusi uji lanjutan. |
| External | Data *dummy* terlalu seragam sehingga algoritma pencarian bekerja tidak realistis. | Membangkitkan nilai `email` dan `password` dengan tingkat entropi yang menyerupai data acak nyata. |
| Construct | Alat uji (*Autocannon*) kehabisan memori sehingga menurunkan *throughput* palsu. | Memantau *resource* Autocannon secara terpisah; pastikan leher botol (*bottleneck*) terjadi pada DB/API, bukan *load tester*. |
| Conclusion | Kesimpulan diambil hanya dari satu kali masa pengujian. | Eksperimen dilakukan sebanyak 30 siklus (*runs*) untuk memastikan kekuatan statistik (statistical power). |

**Ancaman mana yang paling sulit dimitigasi?** *External Validity*
**Mengapa?**
> Karena simulasi *load testing* sekeras apapun tetap tidak bisa 100% meniru perilaku koneksi internet pengguna nyata (seperti koneksi yang terputus-putus, variasi ukuran *header HTTP*, atau jeda asinkron yang terjadi secara alami di aplikasi *client*). Hasil eksperimen ini hanya merepresentasikan performa dari sisi batas maksimal perangkat lunak (kestabilan *backend* murni).

---

## Refleksi

> Sebuah paper melaporkan "metode kami mengalahkan semua baseline." Apa 3 pertanyaan pertama yang harus diajukan untuk mengevaluasi klaim ini?

**Jawaban:**
1. Apakah *baseline* dikonfigurasi dan di-*tuning* secara optimal (bukan *straw man comparison* / sengaja dilemahkan)?
2. Apakah kondisi *environment*, perangkat keras (Hardware), dan set data (Dataset) pengujian benar-benar identik 100% untuk semua metode?
3. Apakah kemenangan performa tersebut *signifikan secara statistik* dan konsisten setelah dilakukan uji berulang, atau hanya kebetulan acak pada satu kali eksekusi (anomali *seed*)?
