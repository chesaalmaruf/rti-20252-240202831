# WS-03: Literature Mapping & Gap

> **Bab 3 — Literature Review, Research Gap & Baseline**

---

## Ringkasan Materi

### Literature Review = Positioning, Bukan Ringkasan

Literature review bukan merangkum paper satu per satu. Pendekatan yang benar adalah **concept-centric** — organisasi berdasarkan tema, metode, atau variabel. Tujuan: menemukan **pola, kontradiksi, dan gap**.

**Perbandingan pendekatan Author-centric vs Concept-centric:**

| Aspek | Author-centric (Hindari) | Concept-centric (Gunakan) |
|-------|--------------------------|---------------------------|
| Struktur | Per penulis/paper ("Rahman et al. menyatakan...") | Per konsep/metode ("Pendekatan berbasis transformer") |
| Tujuan | Ringkasan isi paper | Perbandingan metode & identifikasi gap |
| Contoh paragraph | "Rahman (2023) pakai CNN. Lee (2022) pakai LSTM. Zhang (2021) pakai RF." | "Tiga pendekatan dominan: CNN digunakan oleh 4 paper untuk representasi fitur visual; LSTM untuk data sekuensial; RF sebagai baseline klasik." |
| Hasil akhir | Daftar paper | Peta pengetahuan + gap yang teridentifikasi |

### Empat Jenis Research Gap

| Jenis Gap | Deskripsi | Contoh |
|-----------|----------|--------|
| **Performance Gap** | Performa belum memadai | Akurasi deteksi hanya 78% pada kasus tertentu |
| **Method Gap** | Pendekatan belum diterapkan | Belum ada yang pakai transformer untuk task ini |
| **Data Gap** | Dataset terbatas/tidak representatif | Semua studi pakai dataset sintetis |
| **Context Gap** | Belum diuji pada konteks berbeda | Belum ada evaluasi di negara berkembang |

Gap terkuat = kombinasi 2+ jenis.

### Systematic Search Strategy

1. **Database utama**: IEEE Xplore, ACM DL, Scopus
   - Akses IEEE/ACM melalui jaringan kampus atau VPN institusi
   - Alternatif bebas biaya: Google Scholar, ResearchGate ([researchgate.net](https://www.researchgate.net)), arXiv ([arxiv.org](https://arxiv.org))
2. **Boolean query** yang terdokumentasi eksplisit
   - Contoh: `("anomaly detection" OR "intrusion detection") AND ("deep learning" OR "neural network") NOT ("medical imaging")`
   - Gunakan tanda kutip untuk frasa eksak; AND/OR/NOT mengontrol scope
3. **Snowballing** — dua arah:
   - **Backward snowballing**: buka daftar referensi di paper kunci → telusuri paper yang dikutip
   - **Forward snowballing**: di Google Scholar, klik "Cited by" di bawah paper kunci → temukan paper yang mengutipnya
   - Ulangi 1–2 tingkat untuk membangun cakupan komprehensif
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

**LITERATURE MAPPING**

**Topik** : Analisis Perbandingan Performa Latency dan Throughput PostgreSQL vs MongoDB pada Skema Autentikasi Pengguna.
**Database** : Google Scholar, Sinta (Jurnal lokal terakreditasi).
**Query** : `("MySQL" OR "PostgreSQL") AND ("MongoDB" OR "NoSQL") AND ("performance" OR "response time")`
**Tahun** : 2020 - 2024
**Hasil awal** : 15 paper → Screening → 5 paper final

**Literature Matrix (concept-centric):**

| Study | Tahun | Method | Data | Result | Limitation |
|-------|-------|--------|------|--------|------------|
| Tavares et al. | 2020 | DML Benchmark (Insert, Update, Delete, Select) via PHP | Dataset SELMA (50 - 100.000 record) | MongoDB lebih unggul di hampir semua DML; MySQL lebih cepat 1,95s khusus untuk `SELECT`. | Hanya menguji DML umum, tidak spesifik pada *high-concurrency* seperti proses autentikasi. |
| Budiman et al. | 2021 | Query benchmarking di Windows & Ubuntu (MySQL Workbench vs Robo 3T) | Twitter Sentiment (hingga 1.000.000 record) | MongoDB secara signifikan lebih cepat dari MySQL untuk data > 50.000 baris; Ubuntu memberikan performa server lebih baik. | Tidak melibatkan *backend overhead* seperti ORM, murni via GUI *client*. |
| Pujas et al. | 2024 | Eksperimen Read/Write menggunakan Prisma ORM | Dummy E-commerce (1000-2000 data) | MongoDB lebih cepat pada operasi Create dan Read; MongoDB menggunakan memori lebih kecil (388KB vs 610KB). | Skala dataset terlalu kecil untuk menguji batas *throughput* maksimal sistem. |
| Fadli et al. | 2020 | Analisis waktu eksekusi SQL vs Redis (NoSQL) | Data akademik | Redis 79,15% lebih cepat daripada MySQL. | Menggunakan Redis (In-memory) yang arsitekturnya sangat berbeda dari document-based seperti MongoDB. |
| Khan et al. | 2023 | Komputasi waktu load, response, retrieval (SQL vs NoSQL) | Dataset aplikasi | MySQL menunjukkan performa loading dan retrieval yang jauh lebih signifikan dibanding MongoDB. | Hasil saling bertolak belakang dengan studi lain; diduga karena kondisi *environment* server yang tidak setara. |

**Pola yang ditemukan:**
* **Metode dominan:** Eksperimen kuantitatif dengan variasi jumlah baris data (dari ratusan hingga jutaan) yang diukur dalam satuan detik/milidetik.
* **Dataset umum:** Dataset teks sekunder (E-commerce dummy, Twitter sentiment, data layanan publik).
* **Limitasi berulang:** Terdapat anomali (hasil bertolak belakang) pada kueri `SELECT`/`READ`, yang sering kali dipengaruhi oleh ada atau tidaknya penggunaan *Object Relational Mapping* (ORM) atau *environment* sistem operasi yang tidak diisolasi dengan baik.

---

**GAP IDENTIFICATION**

**Gap 1: [Context Gap]**
* **Deskripsi** : Mayoritas studi menguji kueri dasar (CRUD umum) tanpa mensimulasikan kasus spesifik dengan beban komputasi ganda seperti autentikasi (*Login*), di mana database harus mencari data unik (email) sekaligus dicocokkan dengan *hashing library* (misal: bcrypt).
* **Bukti** : Studi dari Tavares (2020) dan Budiman (2021) hanya menggunakan filter kata sederhana (`LIKE`) tanpa menguji spesifik skenario *login concurrency*.
* **Signifikansi** : Memberikan data performa yang lebih akurat dan dapat langsung diaplikasikan oleh *developer* yang membangun sistem autentikasi di Node.js.

**Gap 2: [Method Gap]**
* **Deskripsi** : Ketidakkonsistenan hasil pengujian `SELECT` (beberapa menyebut MySQL lebih cepat, yang lain MongoDB) mengindikasikan adanya *overhead* yang belum terukur dengan baik dari penggunaan ORM (misal: Prisma).
* **Bukti** : Pujas et al. (2024) menemukan MongoDB lebih cepat saat membaca data menggunakan Prisma ORM, yang bertolak belakang dengan temuan Tavares (2020) yang menggunakan *raw query* PHP.
* **Signifikansi** : Memastikan apakah penggunaan ORM modern di Node.js merugikan performa database relasional dibandingkan NoSQL.

**Baseline Selection:**
| Baseline | Relevansi | Representatif | Source |
|----------|-----------|---------------|--------|
| PostgreSQL + Raw Query | Pembanding performa asli database relasional tanpa *overhead* *driver*. | Praktik tradisional (*common practice*) yang paling diandalkan kestabilannya. | Tavares et al. (2020) |
| MongoDB + Prisma ORM | Menyimulasikan tumpukan teknologi modern untuk NoSQL di Node.js. | Mewakili tren pengembangan sistem saat ini. | Pujas et al. (2024) |


---

---

## Latihan 1 — Concept-Centric Literature Table

**Topik riset:** Analisis Performa Autentikasi: PostgreSQL vs MongoDB di Lingkungan Node.js.
**Query pencarian:** `("PostgreSQL" OR "MySQL") AND "MongoDB" AND "performance" AND "Node.js"`
**Database:** Google Scholar & Portal Garuda.

| # | Study | Tahun | Method | Dataset | Result | Limitasi |
|---|-------|-------|--------|---------|--------|----------|
| 1 | Tavares et al. | 2020 | DML Benchmark | SELMA (100k data) | MongoDB unggul DML; MySQL menang di SELECT. | Tidak ada uji concurrency. |
| 2 | Budiman et al. | 2021 | OS Benchmark | Twitter (1M data) | MongoDB konsisten di data besar. | Bukan via API Backend. |
| 3 | Pujas et al. | 2024 | Prisma ORM Test | E-commerce Dummy | MongoDB hemat storage (388KB). | Data terlalu kecil (1k). |
| 4 | Khan et al. | 2023 | Response Metric | Data App | SQL unggul pada retrieval. | Anomali konfigurasi hardware. |
| 5 | Fadli et al. | 2020 | Big Data Analysis | Data Akademik | Redis lebih cepat 79%. | Beda jenis (In-memory). |

**Pola yang terlihat — Metode dominan:** Benchmarking 1-on-1 dengan metrik milidetik.
**Limitasi yang berulang:** Pengabaian terhadap *logic overhead* aplikasi (bcrypt/JWT) dan pengujian pada throughput tinggi.

---

## Latihan 2 — Gap Identification

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [ ] Ya / [X] Tidak | |
| Method Gap | [X] Ya / [ ] Tidak | Belum ada evaluasi dampak penggunaan ORM (Prisma) terhadap latency autentikasi di PostgreSQL vs MongoDB. |
| Data Gap | [ ] Ya / [X] Tidak | |
| Context Gap | [X] Ya / [ ] Tidak | Belum ada perbandingan database khusus pada beban kerja high-concurrency login di Node.js. |

**Gap utama yang dipilih:** Context Gap (Skenario Autentikasi High-Concurrency).
**Mengapa gap ini penting?**
> Karena login adalah gerbang utama aplikasi. Mengetahui batas maksimal (throughput) database dalam menangani ratusan user login per detik sangat krusial untuk kestabilan sistem di dunia nyata.

---

## Latihan 3 — Baseline Selection

| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | PostgreSQL Raw Query | Pembanding performa asli database relasional. | Common practice di industri. | Bukan, tapi standar emas. | Tavares et al., 2020 |
| 2 | MongoDB Prisma ORM | Simulasi tumpukan teknologi modern. | Tren pengembangan aplikasi web saat ini. | Ya, untuk ekosistem Node.js. | Pujas et al., 2024 |

---


## Refleksi

**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [X] Tidak
> **Justifikasi:** Perbandingan dilakukan secara adil dengan alat yang lazim digunakan (Prisma) dan standar industri (PostgreSQL), tanpa sengaja melemahkan konfigurasi salah satunya.


**Jawaban:**
> Klaim "belum ada yang meneliti ini" tanpa bukti hanyalah asumsi malas, sedangkan *research gap* yang valid lahir dari pemetaan literatur sistematis yang menunjukkan pola keterbatasan (seperti ketiadaan uji fungsional login pada paper-paper sebelumnya). Cara membuktikannya adalah dengan menyusun matriks literatur dan menunjukkan secara eksplisit variabel atau konteks mana yang konsisten terabaikan oleh peneliti terdahulu.
