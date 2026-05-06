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
VARIABLE & METRIC DEFINITION

Research Question: Apakah penggunaan aplikasi pencatatan keuangan agribisnis berbasis web (Catat Yuk Tan!) secara signifikan memangkas waktu penyelesaian tugas (Task Completion Time) dan mencapai skor System Usability Scale (SUS) yang lebih tinggi dibandingkan dengan metode pencatatan buku kas manual pada pengujian yang melibatkan 30 responden pelaku agribisnis?

| Variabel | Tipe | Konsep | Metrik | Skala | Satuan | Cara Mengukur | Justifikasi |
|----------|------|--------|--------|-------|--------|---------------|-------------|
| Metode Pencatatan | IV | Pendekatan antarmuka pengguna | Aplikasi Web vs Buku Kas Manual | Nominal | — | Menugaskan responden untuk memproses data menggunakan kedua metode tersebut secara bergiliran. | Merupakan perlakuan (treatment) utama penentu kelompok komparasi dalam desain eksperimen. |
| Efisiensi Operasional | DV | Kecepatan penyelesaian kerja | Task Completion Time (Durasi entri data) | Ratio | Detik | Mengekstrak durasi waktu dari rekaman layar/video (dari detik pertama input hingga data terakhir tersimpan). | Waktu adalah indikator paling objektif, kuantitatif, dan bebas bias untuk membuktikan klaim "lebih cepat". |
| Usability | DV | Tingkat penerimaan/kepuasan pengguna | Skor System Usability Scale (SUS) | Interval | 0-100 | Mengkalkulasi dan mengonversi respons responden dari 10 butir pertanyaan kuesioner SUS berskala Likert (1-5). | SUS adalah instrumen standar yang sudah divalidasi secara global untuk mengukur kemudahan penggunaan sistem secara reliabel. |
| Skenario Transaksi | CV | Keseragaman beban kerja | Jumlah dan detail item transaksi harian | Ratio | Baris/Item | Menyediakan satu lembar panduan cetak berisi daftar transaksi fiktif yang identik untuk seluruh responden di kedua sesi pengujian. | Variabel ini wajib dikontrol agar perbedaan waktu (DV) murni disebabkan oleh perbedaan metode (IV), bukan karena jumlah input yang berbeda. |

Alignment Check:
  RQ → Concept → Variable → Metric → Data → Result
  [x] Setiap langkah terdokumentasi
  [x] Tidak ada "lompatan logis"
  [x] Metrik mengukur apa yang dimaksud (construct validity)
```

---

## Latihan 1 — Operationalization Chain

Gunakan RQ dari WS-04. Definisikan variabel dan metriknya.

**RQ:** Apakah penggunaan aplikasi pencatatan keuangan agribisnis berbasis web (Catat Yuk Tan!) secara signifikan memangkas waktu penyelesaian tugas (Task Completion Time) dan mencapai skor System Usability Scale (SUS) yang lebih tinggi dibandingkan dengan metode pencatatan manual pada responden pelaku agribisnis?
| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
|Metode Pencatatan| IV |Pendekatan antarmuka pengguna |Aplikasi Web vs Buku Kas Manual  | Nominal  | - |
|Efisiensi Operasional | DV | kecepatan penyelasainan kerja | task completion time | ratio | detik |
|Usability | DV |  tingkat kepuasan pengguna| Skor System Usability Scale (SUS) | interval | 0-100 |
|kenario transaksi| CV |keseragaman beban kerja | jumlah dan jenis data yang harus diinput  |ratio | item (baris data)|

**Apakah ada lompatan logis dalam rantai?** [ ] Ya / [x] Tidak
> Jika ya, di mana? ____________________________________

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik DV yang dipilih di Latihan 1 menggunakan 3 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | 5 | Waktu (detik) adalah indikator paling objektif dan universal untuk "efisiensi". SUS adalah standar akademis dan industri yang telah teruji untuk mengukur usability. |
| Sensitive | 4 | Stopwatch sangat peka menangkap perbedaan waktu hingga milidetik. SUS cukup peka mengukur persepsi, walau masih ada sedikit bias subjektivitas dari mood responden. |
| Feasible | 5 | Sangat realistis. Pengukuran waktu hanya butuh stopwatch di lapangan, dan SUS dapat dikumpulkan langsung melalui kuesioner tertulis/digital (Google Forms). |

**Apakah perlu secondary metric?** [x] Ya / [ ] Tidak
> Jika ya, apa dan mengapa? Error Rate (Tingkat Kesalahan Input). Sangat penting karena "cepat" belum tentu "akurat". Jika aplikasi mencatat waktu sangat cepat tetapi pengguna banyak salah ketik angka/nominal dibanding metode manual, maka efisiensi sebenarnya menurun (harus kerja dua kali).

**Contoh kasus ceiling effect untuk metrik ini:**
> Skenario data transaksi yang diujikan terlalu sedikit atau terlalu mudah (misal: hanya mencatat 1 barang). Akibatnya, baik menggunakan aplikasi maupun buku manual, waktunya hampir sama cepatnya karena tertahan oleh batas atas kecepatan fisik manusia saat mengetik/menulis.

---

## Latihan 3 — Data Quality Check

Bayangkan data yang akan dikumpulkan dari eksperimen. Evaluasi 4 dimensi kualitas data.

| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| Completeness | *Apakah semua data point terkumpul?* | terkumpul?	Rentan ada data waktu yang terlewat karena peneliti harus memandu responden sekaligus mengoperasikan alat ukur | Gunakan bantuan teknologi seperti aplikasi perekam layar (screen recording) pada perangkat yang digunakan responden, atau pasang kamera smartphone di tripod untuk merekam sesi pengujian. Dengan video playback, Bos bisa mengekstrak data Task Completion Time nanti dengan sangat presisi tanpa khawatir ada rekaman waktu yang hilang atau terlewat di lapangan. |
| Consistency | *Apakah ada kontradiksi internal?* |Responden mungkin mengisi SUS secara asal (straight-lining, misal nilai 5 semua padahal di SUS ada pertanyaan bernada negatif) | Melakukan data cleaning sebelum analisis untuk membuang respons yang terindikasi straight-lining atau kontradiktif.|
| Validity | *Apakah benar-benar mengukur yang dimaksud?* | Risiko perhitungan waktu yang tidak standar. | Membuat SOP (Standar Operasional Prosedur) pengukuran waktu yang kaku—kapan stopwatch harus mulai (saat jari menyentuh keyboard/pena) dan kapan berhenti (saat menekan tombol simpan/menutup buku). |
| Representativeness | *Apakah sampel mewakili populasi target?* |Bisa bias jika responden yang diuji ternyata adalah mahasisw | Menerapkan kriteria inklusi (misal: pengalaman bertani minimal 2 tahun, terbiasa mencatat hasil panen) saat screening responden. |

---

## Refleksi

> Mengapa memilih metrik setelah melihat data dianggap p-hacking? Apa bedanya dengan eksplorasi data yang sah?

**Jawaban:**
>Memilih metrik setelah melihat data dianggap sebagai manipulasi (p-hacking) karena peneliti pada dasarnya "mengganti letak papan target setelah anak panah ditembakkan." Peneliti hanya menyeleksi metrik yang memberikan hasil "signifikan secara statistik" untuk membuat sistemnya terlihat bagus, bukan untuk menguji hipotesis secara jujur.
> Bedanya dengan eksplorasi data yang sah: Eksplorasi data sah asalkan dilaporkan secara jujur sebagai temuan tambahan (post-hoc / exploratory finding), bukan diklaim sebagai tujuan awal (confirmatory) atau metrik utama yang sudah direncanakan sejak sebelum eksperimen dimulai.
