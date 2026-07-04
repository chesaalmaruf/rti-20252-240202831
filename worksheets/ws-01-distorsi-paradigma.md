# WS-01: Distorsi & Paradigma

> **Bab 1 — Research Mindset in IT**

---

## Ringkasan Materi

### Research Trust Model

Pengetahuan ilmiah tidak muncul langsung dari kenyataan. Ia melewati **6 tahap transformasi** yang masing-masing rawan distorsi:

```
Reality → Data → Processing → Analysis → Inference → Knowledge
```

Etika mencegah distorsi yang disengaja (fabrikasi, cherry-picking). Validitas mendeteksi distorsi yang tidak disengaja (confounding variable, sampling bias).

### Tiga Jenis Validitas

| Jenis | Pertanyaan | Contoh Ancaman |
|-------|-----------|----------------|
| **Internal Validity** | Apakah hubungan kausal benar ada? | Confounding variable |
| **External Validity** | Apakah bisa digeneralisasi? | Dataset terlalu homogen |
| **Construct Validity** | Apakah mengukur hal yang benar? | Metrik tidak sesuai klaim |

### Paradigma Riset

Mata kuliah ini menggunakan pendekatan **Positivist** (fenomena TI bisa diukur objektif melalui eksperimen terkontrol) diperkuat **Design Science Research** (DSR). Penting untuk membedakan keduanya:

| Paradigma | Cara Kerja | Contoh di TI |
|-----------|-----------|---------------|
| **Positivis** | Uji hipotesis dengan eksperimen terkontrol | Apakah CNN lebih akurat dari RF pada dataset X? |
| **Design Science Research** | Bangun artefak (sistem/model/framework) untuk menguji proposisi | Dapatkah arsitektur hybrid CNN+LSTM membuktikan peningkatan recall ≥5%? |
| **Interpretivis** | Pahami makna melalui konteks & kualitatif | Bagaimana peneliti manafsirkan anomali data sensor IoT? |

Dalam DSR, artefak **bukan tujuan akhir** — ia adalah instrumen untuk menghasilkan pengetahuan. Pertanyaan riset tetap harus difalsifikasi.

### Mode Berpikir Peneliti

**Curious** (mempertanyakan fenomena) → **Critical** (mengevaluasi klaim berdasarkan bukti) → **Systematic** (merancang investigasi terstruktur dan reproducible).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan | Membuat sistem yang bekerja | Menghasilkan pengetahuan yang valid |
| Pertanyaan khas | "Bagaimana membuatnya jalan?" | "Apakah klaim ini benar?" |
| Ukuran sukses | Sistem berfungsi, client puas | Hipotesis terjawab, temuan tervalidasi |
| Kegagalan | Harus dihindari | Harus dilaporkan (negative result = kontribusi) |

### Istilah Penting

- **Research Mindset** — Pola pikir yang menuntut bukti dan mempertanyakan asumsi
- **Research Ethics** — Prinsip perilaku: kejujuran, objektivitas, keterbukaan, akuntabilitas
- **HARKing** — Hypothesizing After Results are Known — merumuskan hipotesis setelah melihat data
- **Falsifiability** — Hipotesis harus bisa dibuktikan salah

---

## Template A.1 — Research Mindset Self-Assessment

```
Nama Peneliti    : chesa salsabil al'ma'ruf
Tanggal          : 19 april 2026

1. Ketika membaca klaim "metode X 95% akurat":
   - Pertanyaan pertama saya: Bagaimana kriteria inklusi dan eksklusi ditetapkan untuk memastikan validitas data tersebut?
   - Data yang dibutuhkan untuk verifikasi: Daftar database ilmiah yang digunakan, kata kunci (keyword), dan operator Boolean yang diterapkan untuk menyaring data.

2. Posisi paradigma:

2. Posisi paradigma:
   - Pendekatan: [ ] Positivis  [ ] Interpretivis  [ ] Design Science  [x] Mixed (karena menggunakan sintesis kualitatif dan kuantitatif)
   - Alasan: set ini menggabungkan pencarian sistematis (kuantitatif: n=870) dengan analisis isi (kualitatif: sintesis tema) untuk mendapatkan gambaran komprehensif.

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Publikasi yang terindeks di database utama dianggap mewakili seluruh perkembangan riset global.
   - Sumber bias potensial: Ketersediaan laporan (45 laporan tidak berhasil diperoleh) dan bias pemilihan database
   - Langkah mitigasi: Penggunaan diagram alur PRISMA untuk menjamin transparansi seleksi studi.

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi:Kriteria seleksi awal (inclusion/exclusion criteria).
   - Batasan yang diakui sejak awal:Adanya kesenjangan geografis dan topik yang belum tergarap optimal.
```

---

## Latihan 1 — Identifikasi Distorsi

Pilih satu paper riset di bidang TI yang mengklaim "metode X meningkatkan performa." Telusuri setiap tahap Research Trust Model.

**Paper yang dipilih:**
> Judul: *Analisis Perbandingan Performansi Waktu Respons Kueri antara MySQL PHP 7.2.27 dan NoSQL MongoDB > Penulis : Olivia Maria dkk., 2020

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|:---|:---|:---|
| **Reality → Data** | Mengambil dataset dari Sistem SELMA Kelurahan Oebufu (50 - 100.000 record). | Dataset mungkin terlalu homogen atau hanya mencerminkan satu jenis aplikasi layanan publik. |
| **Data → Processing** | Konversi data SQL ke tipe JSON untuk diujikan pada MongoDB. | Proses pemetaan tipe data yang tidak setara dapat memengaruhi kecepatan baca/tulis secara tidak adil. |
| **Processing → Analysis** | Menguji query DML (Insert, Update, Delete, Select) sebanyak 3 kali. | Jika cache database tidak dibersihkan setiap kali pengujian, hasil uji ke-2 dan ke-3 akan bias menjadi lebih cepat. |
| **Analysis → Inference** | Membandingkan selisih waktu respon rata-rata antara MySQL dan MongoDB. | Menggeneralisasi bahwa MongoDB "lebih unggul" padahal MySQL menang di operasi *Select* dengan selisih 1,95 detik. |
| **Inference → Knowledge** | Menyimpulkan NoSQL lebih efektif untuk kebutuhan data besar. | *Sampling bias*: Keunggulan ini mungkin hanya berlaku pada skema *document-oriented* spesifik yang digunakan. |

**Distorsi paling besar di tahap:** *Data → Processing* (Perbedaan cara database menyimpan skema vs dokumen sangat menentukan hasil akhir secara teknis).

---

## Latihan 2 — Integritas dalam Dilema

**Skenario:** *Outlier* dihapus, hasil eksperimennya menjadi signifikan. Dengan *outlier*, hasilnya tidak signifikan.

| Perspektif | Analisis |
|:---|:---|
| **Kejujuran ilmiah** | Melaporkan kedua versi (dengan dan tanpa outlier) untuk menjaga transparansi data asli. |
| **Transparansi** | Menjelaskan alasan teknis mengapa outlier tersebut dianggap tidak representatif terhadap performa sistem normal. |
| **Peer review** | Membiarkan reviewer menilai apakah penghapusan tersebut valid secara metodologi penelitian TI. |

**Keputusan akhir dan justifikasi:**
> Melaporkan kedua hasil tersebut. Justifikasinya adalah integritas akademik mengharuskan peneliti untuk tidak menyembunyikan data yang bertentangan dengan hipotesis; penjelasan mengenai outlier justru dapat memberikan wawasan baru tentang batas kestabilan sistem.

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** *Analisis Perbandingan Performa Login/Autentikasi pada PostgreSQL dan MongoDB.*

> **Skala 1–5:** 1 = tidak sesuai, 5 = sangat sesuai.

| Kriteria | Positivis | Interpretivis | Design Science |
|:---|:---|:---|:---|
| Kesesuaian (1–5) | **5** | **1** | **4** |
| Jenis data | Metrik numerik (ms), log eksperimen, penggunaan RAM/CPU. | - | Hasil uji artefak API login yang dibangun. |
| Limitasi paradigma | Mengabaikan pengalaman subjektif pengembang saat menggunakan database tersebut. | Tidak dapat memberikan data performa yang kuantitatif. | Fokus pada fungsionalitas sistem login yang dibangun saja. |

**Paradigma yang dipilih:** Positivis
**Alasan:** Riset ini berfokus pada pengukuran fenomena objektif (kecepatan respon kueri) yang dapat diukur secara eksak melalui eksperimen terkontrol dan dapat diulang (reproducible).

---

## Refleksi

**Jawaban:**
> Setelah memahami rantai distorsi, saya tidak akan langsung menerima klaim akurasi tanpa mempertanyakan metodologi pemrosesan datanya. Pertanyaan utama yang akan saya ajukan adalah: "Bagaimana kondisi lingkungan pengujiannya dan apakah metrik yang digunakan benar-benar mewakili skenario dunia nyata atau hanya kondisi laboratorium yang ideal?"

