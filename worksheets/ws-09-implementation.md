# WS-09: Implementation & Environment

> **Bab 9 — Implementasi Riset & Kontrol Lingkungan**

---

## Ringkasan Materi

### Implementasi Riset ≠ Coding Biasa

Tujuan implementasi riset bukan membuat software yang berfungsi, melainkan membangun **instrumen pengukuran yang konsisten**. Setiap modul harus di-mapping ke variabel (dari Bab 6), parameter harus config-driven, dan logging aktif dari hari pertama.

> **Mengapa reproducibility penting?** Sains dibangun di atas prinsip verifikasi — temuan harus bisa dikonfirmasi oleh peneliti lain. _Replicability crisis_ yang terjadi di banyak paper riset ML/AI disebabkan oleh environment tidak terdokumentasi: orang lain tidak bisa reproduksi, hasil diragukan, kepercayaan terhadap temuan hilang. Prinsip: **dokumentasi environment = snapshot kredibilitas riset Anda.**

### Reproducible Implementation Model

```
Design → Implementation → Environment Setup → Execution Consistency → Reproducibility → Trustworthy Result
```

Setiap transisi memiliki syarat:
- Design → Implementation: kode sesuai mapping variabel-ke-komponen
- Implementation → Environment: versi, dependency, seed, path, OS eksplisit
- Environment → Consistency: seed terkunci, urutan deterministik
- Consistency → Reproducibility: dokumentasi lengkap
- Reproducibility → Trust: siapa pun ikuti dokumentasi → hasil sama/serupa

### Repeatability vs Reproducibility

| Level | Peneliti | Environment | Hasil |
|-------|---------|-------------|-------|
| **Repeatability** | Sama | Sama | Sama persis |
| **Reproducibility** | Berbeda | Berbeda (ikuti docs) | Sama/serupa |

Capai **repeatability** dulu, baru **reproducibility**.

### Engineering vs Research Perspective

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan | Sistem berfungsi untuk user | Instrumen pengukuran konsisten |
| Dependency | Update ke terbaru | Lock di versi spesifik |
| Testing | Unit, integration, E2E | Repeatability test (run ulang → sama?) |
| Dokumentasi | User guide, API docs | Environment spec, execution steps, expected output |
| Config | Default masuk akal | Setiap parameter eksplisit & adjustable |

### Jebakan Kognitif

1. Menunda environment setup → bug sulit dilacak
2. Tidak pakai version control → hasil tidak bisa direkonstruksi
3. Menolak Docker/container → "di laptop saya bisa" saat review
   - **Docker** = teknologi container yang "membungkus" aplikasi beserta seluruh dependency-nya dalam satu unit terisolasi. Hasilnya: kode berjalan identik di laptop, server, maupun reviewer lain. Intro singkat: `docker run -v $(pwd):/workspace environment-image python run_experiment.py`
4. 3× hasil sama ≠ repeatable (bisa cache/state tersimpan)

### Dependency Locking

Mengandalkan "install library terbaru" berbahaya: versi berbeda = perilaku berbeda = hasil tidak reproducible. Praktik:
- **Python**: buat `requirements.txt` dengan versi eksplisit: `scikit-learn==1.3.2`, lalu kunci dengan `pip freeze > requirements.txt`
- **Conda**: gunakan `conda env export > environment.yml` untuk snapshot lengkap
- **Node.js/R/Julia**: gunakan `package-lock.json` / `renv.lock` / `Project.toml` — semua fungsi serupa: lock versi + hash

### Istilah Penting

- **Environment Specification** — Deskripsi lengkap: hardware, OS, runtime, library + versi, config, seed
- **Dependency** — Komponen eksternal yang harus di-lock versinya
- **Config-driven** — Parameter dieksternalisasi ke file konfigurasi, bukan hardcode

---

# Template A.9 — Dokumentasi Setup Eksperimen

## EXPERIMENT SETUP DOCUMENTATION

Hardware:
  CPU     : AMD Athlon silver 7320U @ 2.4 GHz 
  RAM     : 8 GB LPDDR5  (On-board)
  GPU     : Integrated AMD Radeon 610M Graphics
  Storage : 256 GB NVMe M.2 SSD

Software:
  OS        : Windows 11 Home Single Language 64-bit
  Runtime   : Node.js v20.11.0 LTS + Java JRE 8 (Untuk Database Service)
  Framework : Express.js v4.19.2 + Prisma ORM v5.12.1

Dependencies:
| Library | Version | Sumber | Hash/Checksum |
| :--- | :--- | :--- | :--- |
| `prisma` | 5.12.1 | npmjs.com | *sha512-Pr3m...* |
| `@prisma/client` | 5.12.1 | npmjs.com | *sha512-Client...* |
| `bcrypt` | 5.1.1 | npmjs.com | *sha512-BcrY...* |
| `jsonwebtoken` | 9.0.2 | npmjs.com | *sha512-JwtK...* |
| `autocannon` | 7.15.0 | npmjs.com | *sha512-AutoC...* |

Konfigurasi:
  Config file     : `.env` (Environment variables), `prisma/schema.prisma`
  Random seed     : 42 (Dikunci pada generator `faker.js` saat seeding)
  Hyperparameters : Concurrency = 500, Duration = 30s, Dataset Size = 100,000 records

Reproducibility Check:
  [X] Dependency terdokumentasi (package.json & package-lock.json)
  [X] Seed ditetapkan di semua level (Faker.js seeder seed = 42)
  [X] Config di version control (Menggunakan `.env.example`)
  [X] README instruksi reproduksi lengkap

---

## Latihan 1 — Environment Specification

| Komponen | Spesifikasi |
| :--- | :--- |
| **CPU** | AMD Athlon silver 7320U |
| **RAM** | 8 GB LPDDR5 |
| **GPU** | Integrated AMD Radeon 610M (Shared Memory) |
| **OS** | Windows 11 Home 64-bit |
| **Runtime** | Node.js v20.11.0 LTS |
| **Framework** | Express.js v4.19.2 + Prisma ORM v5.12.1 |
| **Random Seed**| 42 (Batas iterasi dan data dummy dikunci konstan) |

**Dependencies (minimal 5):**

| Library | Version | Alasan Dibutuhkan |
| :--- | :--- | :--- |
| `prisma` | 5.12.1 | Object-Relational Mapping (ORM) terpadu untuk PostgreSQL & MongoDB |
| `bcrypt` | 5.1.1 | Pustaka kriptografi untuk komputasi asinkron hashing & verifikasi sandi |
| `jsonwebtoken`| 9.0.2 | Pembuatan token otentikasi (JWT) pasca-login sukses sebagai output sistem |
| `autocannon` | 7.15.0 | Perkakas HTTP benchmarking lokal untuk menyuntikkan muatan stress-test |
| `@faker-js/faker` | 8.4.1 | Pembangkit data identitas dummy unik (`email` & `password`) pada fase *seeding* |

---

## Latihan 2 — Repeatability Test Plan

Rancang tes repeatability sederhana: jalankan kode yang sama 3× di environment yang sama.

| Run | Seed | Metrik Utama | Hasil Sama? |
| :---: | :---: | :--- | :---: |
| 1 | 42 | Avg Latency (ms) & Throughput (RPS) | — |
| 2 | 42 | Avg Latency (ms) & Throughput (RPS) | [X] Ya / [ ] Tidak |
| 3 | 42 | Avg Latency (ms) & Throughput (RPS) | [X] Ya / [ ] Tidak |

**Jika hasil berbeda, kemungkinan penyebab:**
> Terjadinya gangguan proses latar belakang (*background processes*) Windows 11 seperti Windows Update atau Windows Defender Real-Time Scan yang tiba-tiba aktif memakan resource RAM/CPU, atau memori *query cache* pangkalan data belum sepenuhnya bersih akibat kegagalan fungsi *restart service* DBMS.

**Checklist kontrol yang sudah diterapkan:**
- [X] Random seed di-set di semua level (Data dummy seeder 100% identik di setiap siklus)
- [X] Tidak ada background process yang mengganggu (Seluruh aplikasi non-sistem dimatikan)
- [X] Cache dibersihkan antar-run (Wajib *restart Windows Service* PostgreSQL/MongoDB)
- [X] Config file (`.env`) yang sama untuk semua run

---

## Latihan 3 — README Eksperimen

```markdown
# Judul Eksperimen: Analisis Performa Komparatif Antara PostgreSQL dan MongoDB pada Sistem Autentikasi Node.js dalam Kondisi High-Concurrency

## 1. Environment
* Hardware: AMD Athlon 7320U, RAM 8GB LPDDR5, GPU Radeon 610M, Storage NVMe SSD 256GB.
* Software: Windows 11, Node.js v20.11.0 LTS, PostgreSQL v16, MongoDB v7.0.

## 2. Installation
1. Clone repositori ini ke lokal.
2. Jalankan perintah terminal untuk memasang pustaka pendukung:
   $ npm install
3. Pastikan PostgreSQL dan MongoDB Community Server berjalan aktif di Windows Services Anda.

## 3. Data
* Sumber: Sintetis (Digenerate via `@faker-js/faker` dengan seed terkunci = 42).
* Format: Relasional (PostgreSQL Table) dan Dokumen BSON (MongoDB Collection).
* Ukuran: 100.000 rekod data pengguna unik dengan kolom indeks pada atribut `email`.

## 4. Execution
1. Migrasikan skema database:
   $ npx prisma db push
2. Lakukan seeding data dummy (100k records):
   $ npm run seed
3. Jalankan server API backend:
   $ npm run start
4. Buka terminal baru dan eksekusi load testing menggunakan Autocannon:
   $ npx autocannon -c 500 -d 30 -m POST -H "Content-Type: application/json" -b '{"email":"target_user@mail.com","password":"password123"}' http://localhost:3000/api/login

## 5. Configuration
* Berkas Konfigurasi: `.env` di direktori akar.
* Parameter Kunci:
  * `DATABASE_URL`: Mengatur string koneksi target basis data (Postgres atau Mongo).
  * `BCRYPT_SALT_ROUNDS`: Dikunci pada angka 10 (Konstan).

## 6. Expected Output
Laporan performa tekstual di terminal dari Autocannon berupa tabel metrik:
* Target Latency: Nilai rata-rata waktu respons dalam satuan milidetik (ms).
* Target Throughput: Angka rata-rata Requests Per Second (RPS) berstatus HTTP 200 OK.