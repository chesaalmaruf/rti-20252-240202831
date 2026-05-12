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

## Latihan 1 — Identifikasi Distorsi

**Paper yang dipilih:**
> Judul: The Comparison Firebase Realtime Database and MySQL Database Performance using Wilcoxon Signed-Rank Test.
> Penulis (Tahun): Margaretha Ohyver, Jurike V. Moniaga, Iwa Sungkawa, Bonifasius Edwin Subagyo, Ian Argus Chandra (2019). 
> Sumber/Link DOI:[ A Survey of Comparing Different Cloud Database Performance: SQL and 
NoSQL .](https://passer.garmian.edu.krd/article_144858_1e6abc0a4244575a38a400834e2cfd20.pdf)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Mengumpulkan data waktu respons dari 50 kali pengujian operasi CRUD dengan rentang beban hanya 1 hingga 3.000 rekaman data[cite: 136]. | *Scale Bias* (Bias Skala): Beban maksimal yang hanya 3.000 rekaman belum tentu merepresentasikan kondisi kemacetan (*bottleneck*) di dunia nyata saat aplikasi digunakan serentak oleh puluhan ribu pengguna. |
| Data → Processing | Menggunakan struktur tabel yang sangat sederhana, yakni hanya menggunakan satu tabel yang memuat enam bidang (*fields*) profil nutrisi balita[cite: 132]. | *Construct Bias*: Tidak ada pengujian relasi tabel (seperti *JOIN*), padahal manajemen data relasional adalah fitur utama dan kekuatan dari MySQL dibandingkan Firebase[cite: 101, 102, 103, 104]. |
| Processing → Analysis | Menggunakan uji Wilcoxon Signed-Rank untuk membandingkan rata-rata waktu respons, dijalankan pada perangkat klien Android tingkat tinggi (Snapdragon 845, RAM 6 GB)[cite: 10, 127]. | *Hardware Bias*: Spesifikasi perangkat klien yang terlalu tinggi mungkin mempercepat pemrosesan data di sisi klien, sehingga menutupi performa pengiriman data murni dari server. |
| Analysis → Inference | Menyimpulkan bahwa Firebase lebih unggul di seluruh operasi CRUD berdasarkan data waktu uji[cite: 295]. | *Confirmation Bias*: Penulis sebelumnya mengakui bahwa kelemahan Firebase adalah saat melakukan *query* kompleks , namun mereka sengaja menyimpulkan keunggulannya hanya dari pengujian data yang sangat simpel[cite: 299]. |
| Inference → Knowledge | Mengklaim dan merekomendasikan bahwa Firebase lebih cocok (*more suitable*) sebagai sistem database untuk aplikasi kebutuhan nutrisi harian[cite: 301]. | *Overgeneralization*: Kesimpulan ini hanya sah untuk aplikasi dengan skema data datar[cite: 299]. Jika aplikasi berkembang dan membutuhkan relasi data rumit, rekomendasi ini bisa menyesatkan. |

**Distorsi paling besar di tahap:** Data → Processing

**Dua distorsi spesifik yang teridentifikasi:**
1. **Construct Validity (Complexity Bias):** Pengujian membandingkan MySQL yang merupakan *Relational Database* [cite: 40] dengan NoSQL, namun tidak mengikutsertakan skenario kueri relasional yang kompleks[cite: 132].Hal ini adalah perbandingan yang tidak setara (*straw man comparison*), karena MySQL diuji pada skenario yang tidak menonjolkan fitur utamanya[cite: 111, 112].
2. **External Validity (Scale Bias):** Pengujian dibatasi secara ketat maksimal 3.000 rekaman. Klaim performa waktu respons ini akan sangat sulit digeneralisasi untuk aplikasi berbasis *cloud* skala masif yang menampung ratusan ribu data pengguna, mengingat MySQL rentan pada masalah skalabilitas[cite: 42]..
---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Menghapus data semata-mata untuk mencapai tingkat signifikansi statistik (*p-value* < 0.05) adalah bentuk manipulasi data yang disebut *p-hacking*. Secara etika, peneliti wajib menyajikan kebenaran dari apa yang sebenarnya terjadi selama eksperimen, bukan apa yang "diharapkan" terjadi. |
| Transparansi | Jika peneliti memiliki alasan teknis yang kuat bahwa ke-3 *outlier* tersebut adalah *noise* akibat kerusakan alat ukur atau kesalahan *input*, maka penghapusannya dapat dibenarkan asalkan **dijelaskan secara sangat transparan dan rinci** di dalam bab metodologi laporan. Menyembunyikan fakta penghapusan data ini adalah pelanggaran berat. |
| Peer review | Asesor atau *reviewer* jurnal yang kritis pasti akan menyadari adanya anomali atau data yang hilang. Jika peneliti tidak mencantumkan justifikasi ilmiah yang valid mengapa 3 titik data tersebut dibuang, *reviewer* akan menganggap riset tersebut cacat metodologi dan paper berisiko besar ditolak (*rejected*). |

**Keputusan akhir dan justifikasi:**
> **Keputusan:** Melaporkan hasil eksperimen menggunakan kumpulan data lengkap (*full dataset*), termasuk ke-3 *outlier* tersebut, sebagai temuan utama (*primary findings*). 
> 
> **Justifikasi:** Integritas dan objektivitas ilmiah jauh lebih berharga daripada sekadar mengejar status "signifikan". Jika saya merasa *outlier* tersebut memang mendistorsi performa sistem yang sebenarnya, saya akan menambahkan sub-bab **Analisis Sensitivitas**. Di sana, saya akan menyajikan data perbandingan hasil eksperimen *dengan* dan *tanpa* outlier secara berdampingan, serta membiarkan pembaca dan komunitas ilmiah menilai sendiri seberapa *robust* (tangguh) sistem yang saya uji.
---

## Latihan 3 — Posisi Paradigma

[cite_start]**Topik riset:** Perbandingan Kinerja Firebase Realtime Database dan MySQL Database menggunakan Uji Wilcoxon Signed-Rank 

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | 5 — Sangat sesuai. et ini menguji hipotesis komparasi performa secara matematis dan objektif[cite: 164, 195, 196, 197]. | 1 — Sama sekali tidak relevan karena tidak ada kajian sosial atau wawancara subjektif. | 3 — Kurang dominan. Meskipun melibatkan aplikasi *mobile*, fokus inti paper ini adalah *evaluasi/komparasi* produk yang sudah ada, bukan merancang inovasi arsitektur *database* baru[cite: 15, 16]. |
| Jenis data yang dikumpulkan | Waktu respons (*response time*) dalam satuan milidetik dari 50 kali iterasi eksekusi operasi CRUD (Create, Read, Update, Delete)[cite: 117, 136, 170]. | Pemahaman kualitatif (misal: wawancara *developer* tentang seberapa mudah menggunakan Firebase vs MySQL). | Artefak berupa *script benchmark* atau purwarupa aplikasi pemantau gizi balita[cite: 63, 116]. |
| Limitasi paradigma | Hanya melihat angka performa kecepatan secara isolatif, mengabaikan aspek seperti kesulitan pemeliharaan sistem, biaya *server* jangka panjang, atau fleksibilitas kueri[cite: 42, 44, 298]. | Sulit untuk menarik kesimpulan yang solid mengenai performa perangkat lunak karena tidak ada metrik yang bisa diukur dengan standar pasti. | Terlalu fokus pada hasil akhir (aplikasi jadi), sehingga evaluasi ketat mengenai performa infrastruktur *database* di balik layar bisa saja terabaikan. |

**Paradigma yang dipilih:** Positivis
**Alasan:** Penelitian ini bertumpu pada observasi empiris yang terukur secara kuantitatif melalui eksperimen yang terkontrol secara ketat (mengeksekusi rentang data 1 hingga 3.000 rekaman).Penggunaan uji statistik formal (Wilcoxon Signed-Rank) untuk membuktikan H0 dan H1 [cite: 164, 195, 196, 197] merupakan karakteristik absolut dari paradigma Positivis yang memandang fenomena IT bisa diukur kebenarannya secara sangat objektif.
---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
> Sebelum membaca materi ini, saya cenderung menerima mentah-mentah klaim kuantitatif seperti "95% akurat" atau "Metode A lebih unggul dari Metode B". Saya dulu menganggap bahwa setiap angka yang berhasil menembus publikasi jurnal adalah sebuah kebenaran mutlak. Saya tidak menyadari bahwa "pengetahuan" tersebut adalah hasil akhir dari rantai transformasi (*Reality → Data → Processing → Analysis → Inference*) yang di setiap tahapnya sangat rawan disusupi bias atau distorsi.
> 
> Setelah memahami rantai distorsi, cara saya membaca paper berubah total. Saat melihat klaim performa tinggi, pertanyaan utama yang sekarang akan saya ajukan adalah:
> 1. **Bagaimana data tersebut dikumpulkan dan seberapa realistis skalanya?** (Untuk mendeteksi *Scale Bias* atau *Sampling Bias*).
> 2. **Apakah metode pembanding (*baseline*) diperlakukan secara adil?** (Untuk mendeteksi *Construct Bias*, memastikan bahwa peneliti tidak sedang melakukan *straw man comparison* hanya agar metode usulannya terlihat bagus).
> 3. **Apakah kesimpulan akhirnya lompat terlalu jauh dari hasil analisisnya?** (Untuk mendeteksi *Overgeneralization*, memastikan klaimnya jujur dan sesuai dengan batasan eksperimen).
