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
  Domain   : Manajemen Basis Data (DBMS)
  Konteks  : Sistem Autentikasi Pengguna pada Aplikasi Web skala menengah.

System Context
  Input       : Data kredensial pengguna (username/email, password).
  Process     : Hashing password (bcrypt), pencarian record user, verifikasi data.
  Output      : Status autentikasi (Success/Fail) dan Token (JWT).
  Outcome     : Keamanan akses sistem dan pengalaman pengguna yang lancar (tanpa delay).
  Constraints : Kapasitas RAM terbatas (environment pengujian), waktu eksekusi < 100ms.
  Stakeholders: Pengembang backend, administrator sistem, dan pengguna akhir.

Fenomena → Problem
  Fenomena yang diamati             : Pilihan antara SQL dan NoSQL sering didasarkan pada popularitas, bukan data performa objektif.
  Gejala (symptom) yang terukur     : Variasi waktu respon login (latency) yang tidak konsisten saat jumlah user meningkat. 
  Masalah yang didiagnosis          : Kurangnya bukti empiris mengenai database mana yang lebih efisien menangani beban kerja autentikasi pada skala data tertentu. [cite: 3]
  Masalah riset (researchable)      : Belum ada studi komparatif spesifik yang mengukur latency dan throughput login antara PostgreSQL dan MongoDB pada dataset 50 - 100.000 user menggunakan Node.js. 
  Variabel yang terukur             : Response time (ms), throughput (req/sec), dan ukuran database (KB). 

Problem Quality Check
  [X] Clarity — Satu orang membaca akan paham metrik dan objeknya.
  [X] Measurability — Menggunakan milidetik dan jumlah request per detik.
  [X] Relevance — Penting untuk efisiensi infrastruktur aplikasi web.
  [X] Testability — Hipotesis bisa salah (misal: MySQL ternyata lebih cepat dari MongoDB).
  [X] Impact — Memberikan rekomendasi teknis pemilihan DB bagi pengembang.

Problem Statement (1 paragraf):
  Dalam pengembangan aplikasi web, pemilihan basis data sering kali dilakukan tanpa dasar data performa yang kuat untuk beban kerja spesifik seperti autentikasi. Meskipun klaim umum menyebutkan NoSQL lebih cepat untuk data besar, terdapat gap pengetahuan mengenai titik optimal di mana PostgreSQL mulai tertinggal oleh MongoDB dalam menangani request login secara simultan. Penelitian ini bertujuan membandingkan latency dan throughput kedua database tersebut pada skala data hingga 100.000 record guna memberikan rekomendasi pemilihan DBMS yang didorong oleh data (data-driven) untuk sistem autentikasi.
```
---

## Latihan 1 — Dari Topik ke Masalah Riset

**Topik awal:** Perbandingan Performa PostgreSQL dan MongoDB.

| Tahap | Hasil |
|-------|-------|
| **Reality** | Pengembang harus memilih database untuk sistem login aplikasi yang sedang tumbuh. |
| **Observed Issue (Symptom)** | Terjadi peningkatan waktu tunggu (latency) login seiring bertambahnya jumlah pengguna terdaftar. |
| **Diagnosed Problem (Root Cause)** | Efisiensi query index pada database relasional menurun lebih cepat dibandingkan non-relasional pada volume data tertentu. |
| **Researchable Problem** | Bagaimana perbandingan response time kueri login antara PostgreSQL dan MongoDB pada dataset yang meningkat secara bertahap (50 hingga 100.000 data)? |
| **Measurable Variable** | Average Response Time (Latency) dalam milidetik. |

**Apakah terjebak solution-first thinking?** [x] Tidak
> **Justifikasi:** Kita tidak langsung membuat aplikasi, melainkan mencari tahu mana yang lebih lambat/cepat melalui eksperimen.

---

## Latihan 2 — System Context Decomposition

| Komponen | Deskripsi |
|----------|----------|
| **Input** | Data input JSON/Body berisi username dan password. |
| **Process** | Eksekusi kueri SELECT (SQL) atau FIND (NoSQL) disertai proses verifikasi bcrypt. |
| **Output** | Waktu eksekusi kueri yang tercatat (runtime log). |
| **Outcome** | Rekomendasi teknis penggunaan database yang paling efisien. |
| **Constraints** | Spesifikasi hardware tetap (misal: RAM 8GB), versi Node.js yang sama. |
| **Stakeholders** | Peneliti TI, Backend Developer, Cloud Architect. |

**Komponen mana yang paling relevan dengan masalah riset?**
> **Process** (karena di sinilah perbedaan mekanisme kueri kedua database diuji).

---

## Latihan 3 — Problem Quality Check

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| **Clarity** | 5 | Sangat jelas: PostgreSQL vs MongoDB pada sistem login. |
| **Measurability** | 5 | Menggunakan milidetik (ms) yang sangat kuantitatif. |
| **Relevance** | 4 | Sangat relevan bagi dunia pengembangan web modern. |
| **Testability** | 5 | Mudah diuji gagal/berhasil dengan tools benchmark NPM. |
| **Impact** | 4 | Membantu optimasi biaya server dan pengalaman user. |

**Skor total:** 23 / 25

**Problem statement versi final (1 paragraf):**
> Ketidaktahuan mengenai performansi real-time antara PostgreSQL dan MongoDB dalam menangani kueri login pada skala data besar menyebabkan inefisiensi pemilihan infrastruktur basis data. Riset ini secara empiris mengukur performa melalui parameter latency dan throughput menggunakan simulasi beban kerja bertahap hingga 100.000 record data pengguna. Hasil riset ini diharapkan dapat menutup celah informasi mengenai skalabilitas database relasional dibandingkan NoSQL dalam skenario autentikasi berbasis Node.js.

---

## Refleksi

> **Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?**

**Jawaban:**
> Perbedaan fundamentalnya terletak pada **tujuan dan metodologi**. Dalam *coding*, masalah (bug/error) didefinisikan sebagai penyimpangan dari fungsi yang diharapkan dan didekati dengan cara memperbaikinya agar sistem berjalan kembali (*solve*). Sedangkan dalam riset, masalah didefinisikan sebagai ketidaktahuan atau gap dalam pengetahuan (*knowledge gap*); ia tidak didekati dengan cara "memperbaiki", melainkan dengan cara membangun eksperimen untuk membuktikan atau memahami karakteristik fenomena tersebut melalui data yang dapat direplikasi (*understand & prove*).