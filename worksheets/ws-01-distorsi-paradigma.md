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

Mata kuliah ini menggunakan pendekatan **Positivist** (fenomena TI bisa diukur objektif melalui eksperimen terkontrol) diperkuat **Design Science Research** (artefak dibuat sebagai instrumen pengujian hipotesis, bukan tujuan akhir).

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
Nama Peneliti    : Chesa Salsabil Al'ma'ruf 
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
> Judul: Analisis Tren Penelitian Sistem Informasi dalam Satu Dekade Terakhir
> Penulis (Tahun):Maulana Muhamad Faisal, et al. (2026)
| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Mengumpulkan 870 rekaman dari 4 database | Bias cakupan database (tidak semua riset masuk ke PubMed/Scopus) |
| Data → Processing |Menghapus duplikasi dan menyaring berdasarkan kriteria  |Subjektivitas dalam menentukan relevansi topik |
| Processing → Analysis |Ekstraksi data dari 125 laporan |Bias konfirmasi terhadap tren populer (AI/Big Data) |
| Analysis → Inference |Sintesis hasil menjadi tema strategis |Generalisasi yang terlalu luas dari hanya 10 studi terpilih |
| Inference → Knowledge |Memberikan rekomendasi untuk masa depan |Mengabaikan riset lokal yang tidak terindeks internasional |

**Distorsi paling besar di tahap:** ________________________

**Dua distorsi spesifik yang teridentifikasi:**
1. Selection Bias: Pemilihan hanya 10 studi dari 870 awal menciptakan risiko hasil yang tidak sepenuhnya representatif terhadap seluruh lanskap SI.
2. Geographical Bias: Fokus riset yang dianalisis mungkin condong ke wilayah yang lebih dominan dalam database internasional, mengabaikan nuansa riset di negara berkembang.
---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Laporkan kedua versi (dengan dan tanpa outlier). Jangan melakukan p-hacking atau memanipulasi data hanya untuk mencapai signifikansi statistik.|
| Transparansi |Jelaskan prosedur identifikasi dan alasan penghapusan outlier secara eksplisit di bagian metodologi. Jika data dihapus, harus ada justifikasi statistik yang valid, bukan sekadar agar hasil tampak signifikan |
| Peer review | Reviewer akan menuntut objektivitas. Jika outlier dihapus tanpa alasan yang kuat, ini akan dianggap sebagai bentuk manipulasi data yang dapat merusak kredibilitas riset.|

**Keputusan akhir dan justifikasi:**
> Keputusan: Melaporkan analisis dengan menyertakan seluruh data (full dataset) sebagai temuan utama. Jika peneliti tetap ingin menghapus outlier, maka wajib menyertakan analisis sensitivitas (membandingkan hasil dengan dan tanpa outlier) dalam laporan/paper.
Justifikasi: Integritas dan ketelitian metodologis jauh lebih penting daripada nilai signifikansi statistik semata. Proses riset harus dilakukan secara objektif untuk menghindari bias, sesuai dengan prinsip dasar tinjauan sistematis yang dapat dipertanggungjawabkan.
---

## Latihan 3 — Posisi Paradigma

**Topik riset:** ________________________________________

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | *Contoh: 4* | *Contoh: 2* | *Contoh: 5* |
| Jenis data yang dikumpulkan |Data terukur (jumlah paper) |Pemahaman mendalam tren |Solusi/rekomendasi strategis |
| Limitasi paradigma | Kurang menangkap konteks sosial|Sulit digeneralisasi |Fokus pada hasil, bukan proses |

**Paradigma yang dipilih:** Positivis (dalam tahap identifikasi/kuantitatif) dan Design Science (dalam tahap pemberian rekomendasi).
**Alasan:**Paper ini berupaya mengukur tren secara sistematis (kuantitatif) dan memberikan saran praktis (solusi) untuk pengembangan Sistem Informasi di masa depan.
---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
>Setelah memahami rantai distorsi, saat membaca paper riset, pertanyaan yang akan saya ajukan sekarang adalah: "Apakah penulis menyertakan diagram alur seleksi data yang transparan, dan apakah mereka mengakui keterbatasan (limitasi) dari sampel yang digunakan?" Saya kini sadar bahwa klaim "95% akurat" tidak ada artinya jika proses filtering data di awal tidak dilakukan dengan sangat objektif dan terdokumentasi.
