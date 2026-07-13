# PROPOSAL PENELITIAN

## A. JUDUL

### Petunjuk Pengisian
Tuliskan judul usulan penelitian maksimal 20 kata.

### Output Final

**Analisis Perbandingan Performa ArrayList vs HashMap dalam Manajemen Data Objek pada Bahasa Pemrograman Java**

---

## B. RINGKASAN

### Petunjuk Pengisian
Tuliskan ringkasan penelitian maksimal 300 kata yang memuat urgensi, tujuan, metode, dan luaran.

### Output Final

Developer Java sering memilih struktur data koleksi berdasarkan intuisi tanpa panduan empiris yang valid. Pemilihan yang salah dapat menyebabkan performance bottleneck signifikan pada aplikasi production. Studi existing menggunakan metodologi benchmark yang lemah (`System.currentTimeMillis()` single-run tanpa warmup, tanpa kontrol JIT/GC, tanpa uji statistik), sehingga hasil tidak reproducible.

**Tujuan penelitian** adalah menghasilkan analisis perbandingan performa ArrayList vs HashMap pada 5 operasi CRUD dasar (insert, search, update, delete, iterate) dengan 4 ukuran dataset (10³–10⁶) menggunakan JMH pada Java 17 LTS, serta menghasilkan panduan empiris (decision matrix) untuk developer.

**Metode:** Comparison study dengan dua kondisi (ArrayList vs HashMap) pada kondisi identik. Variabel independen: struktur data, jenis operasi, ukuran dataset. Variabel dependen: execution time (ns/op), memory footprint (bytes), throughput (ops/sec). Instrumen: JMH v1.37 untuk timing, JOL v0.17 untuk memory. Analisis: Two-way ANOVA + Tukey HSD + Bonferroni correction (p < 0.05, Cohen's d > 0.5).

**Luaran:** (1) Raw benchmark data (1200 data points), (2) Aggregated statistics dengan CI 99%, (3) Decision matrix untuk developer, (4) Research paper dengan hasil dan diskusi.

**Kontribusi:** Mengisi gap metodologi pada studi existing, memberikan baseline empiris untuk Java 17 LTS, dan menyediakan panduan praktis berbasis data untuk pemilihan struktur data.

---

## C. KATA KUNCI

### Petunjuk Pengisian
Tuliskan 5 kata kunci yang dipisahkan dengan tanda titik koma (;).

### Output Final

ArrayList; HashMap; Java Performance; JMH Benchmark; Data Structure Comparison

---

## D. PENDAHULUAN

### D.1. LATAR BELAKANG DAN RUMUSAN MASALAH

**Latar Belakang:**
Dalam pengembangan perangkat lunak menggunakan bahasa pemrograman Java, pemilihan struktur data yang tepat sangat krusial untuk performa aplikasi. ArrayList dan HashMap merupakan dua dari struktur data koleksi yang paling sering digunakan. Sayangnya, developer sering kali memilih struktur data berdasarkan kebiasaan atau intuisi alih-alih berdasarkan pemahaman mendalam tentang kompleksitas waktu dan penggunaan memori pada skala data yang besar. Pengujian performa yang ada umumnya hanya menggunakan pengukuran sederhana (`System.currentTimeMillis()`) yang mengabaikan efek optimasi Java Virtual Machine (JVM) seperti *Just-In-Time* (JIT) compilation, proses *Garbage Collection* (GC), dan tahap *warm-up*. Hal ini mengakibatkan data benchmark yang tidak akurat dan tidak dapat direproduksi.

**Rumusan Masalah (Masalah Inti):**
Kurangnya panduan empiris yang andal dan berbasis metodologi benchmark yang ketat (seperti JMH) mengenai perbandingan performa komprehensif antara ArrayList dan HashMap pada berbagai skala dataset di Java 17, yang menyebabkan developer kesulitan mengambil keputusan teknis yang optimal.

**Research Question:**
1. Bagaimana perbandingan *execution time*, *throughput*, dan *memory footprint* antara ArrayList dan HashMap pada operasi insert, search, update, delete, dan iterate dalam skala dataset yang berbeda (10³ hingga 10⁶) di Java 17?
2. Bagaimana panduan empiris (decision matrix) yang dapat dibangun berdasarkan hasil komparasi tersebut untuk membantu developer memilih struktur data yang tepat?

### D.2. PENDEKATAN PEMECAHAN MASALAH

**Tujuan Penelitian:**
Melakukan *benchmarking* presisi menggunakan Java Microbenchmark Harness (JMH) dan Java Object Layout (JOL) untuk mengukur, menganalisis, dan membandingkan performa ArrayList dan HashMap, serta menyusun *decision matrix* sebagai panduan praktis bagi developer.

**Hipotesis Awal:**
- H₀: Tidak terdapat perbedaan signifikan pada *execution time*, *throughput*, dan *memory footprint* antara ArrayList dan HashMap pada berbagai operasi dasar dan skala dataset di Java 17.
- H₁: Terdapat perbedaan performa yang signifikan antara ArrayList dan HashMap yang dipengaruhi oleh jenis operasi dan ukuran dataset di Java 17.

**Intervensi/Pendekatan Solusi:**
Melakukan studi komparatif kuantitatif menggunakan *microbenchmarking framework* standar industri JVM (JMH) untuk memastikan hasil yang terisolasi dari *noise* JVM (warm-up, JIT, GC) serta pengukuran memori yang persis menggunakan JOL, disertai pengujian signifikansi statistik.

**Alasan Pemilihan Intervensi:**
JMH adalah framework standar de-facto untuk microbenchmarking di ekosistem Java karena secara otomatis menangani *warm-up* dan optimasi JVM untuk menghindari *dead-code elimination*. Pendekatan ini menjamin validitas internal eksperimen dan reproduktibilitas hasil.

---

### D.3. STATE OF THE ART DAN KEBARUAN
Penelitian terdahulu mengenai performa struktur data Java banyak yang dilakukan pada versi Java lama (sebelum Java 8 atau 11) dan sering mengabaikan metodologi *microbenchmarking* yang ketat (misalnya hanya menggunakan waktu sistem sederhana). Penelitian ini memberikan kebaruan dengan menggunakan rilis Java 17 LTS modern yang memiliki *garbage collector* dan optimasi JIT terkini, menerapkan JMH secara penuh dengan kontrol parameter statistik yang ketat (Two-way ANOVA, Tukey HSD), serta menyertakan profil memori akurat dengan JOL yang belum banyak dibahas secara komprehensif dalam pengujian standar.

### D.4. PETA JALAN PENELITIAN

**Tahapan yang Telah Dicapai:**
1. ✅ Identifikasi masalah dan gap (WS-01 sampai WS-03)
2. ✅ Formulasi RQ dan hipotesis (WS-04)
3. ✅ Definisi variabel dan metrik (WS-05)
4. ✅ Desain sistem dan eksperimen (WS-06 sampai WS-07)
5. ✅ Proposal penelitian (WS-08)

**Tahapan yang Dikerjakan pada Usulan Ini:**
1. **Minggu 1:** Persiapan lingkungan uji (Environment setup), instalasi JDK 17, konfigurasi proyek JMH dan JOL, serta penulisan *script baseline*.
2. **Minggu 2-3:** Implementasi skenario *benchmarking* (insert, search, update, delete, iterate) untuk ArrayList dan HashMap.
3. **Minggu 4:** Eksekusi pengujian pada *testbed* yang terisolasi dan pengumpulan data mentah (raw data log).
4. **Minggu 5-6:** Analisis data statistik (ANOVA, Tukey HSD) dari hasil JMH dan visualisasi data.
5. **Minggu 7:** Penyusunan *decision matrix* dan finalisasi penulisan laporan/paper penelitian.

**Tahapan Lanjutan yang Direncanakan:**
- Diseminasi hasil penelitian dalam bentuk publikasi jurnal atau repositori open-source.
- Pengembangan eksperimen lanjutan dengan menguji struktur data *concurrent* (misalnya `ConcurrentHashMap` vs `CopyOnWriteArrayList`).

**Perkembangan Penelitian:**
Proposal penelitian sedang tahap finalisasi (WS-08), dan kesiapan infrastruktur (repository Git, dependensi Maven/Gradle) sedang disiapkan.

---

## E. METODE

### **OBJEK/UNIT ANALISIS**
Struktur data `java.util.ArrayList` dan `java.util.HashMap` yang diimplementasikan pada standar OpenJDK 17 LTS.

### **POPULASI DAN SAMPEL**
- **Populasi:** Seluruh operasi manipulasi dan pembacaan data (CRUD) pada struktur data koleksi di ekosistem Java.
- **Sampel:** Lima (5) operasi inti: insert (add/put), search (contains/get), update (set/replace), delete (remove), dan iterate; dengan empat (4) ukuran dataset berbeda: 10³, 10⁴, 10⁵, dan 10⁶ elemen berupa objek standar (misal: *Integer Wrapper*).

### E.2. Variabel, Metric, Instrumen, dan Data

---

### **INDEPENDENT VARIABLES (IV) — VARIABEL BEBAS**
1. **Jenis Struktur Data:** ArrayList dan HashMap.
2. **Jenis Operasi:** Insert, Search, Update, Delete, Iterate.
3. **Ukuran Dataset:** 1.000, 10.000, 100.000, dan 1.000.000 elemen.

### **DEPENDENT VARIABLES (DV) — VARIABEL TERIKAT**
1. **Execution Time:** Rata-rata waktu penyelesaian setiap operasi individu.
2. **Throughput:** Jumlah total operasi yang berhasil dieksekusi per satuan waktu.
3. **Memory Footprint:** Konsumsi dan tata letak alokasi memori *heap* per koleksi data.

### **CONTROL VARIABLES (CV) — VARIABEL KONTROL**
1. Versi lingkungan eksekusi: OpenJDK 17 LTS.
2. Parameter JVM: Heap size ditetapkan (-Xms4G -Xmx4G) dan tipe Garbage Collector (G1GC).
3. Lingkungan Perangkat Keras: Seluruh pengujian dijalankan pada satu *testbed dedicated* (spesifikasi CPU/RAM yang sama) tanpa ada interupsi proses *background* lainnya.
4. Tipe Data Elemen: Konsisten antar pengujian.

### **METRIK PENGUKURAN — MEASUREMENT METRICS**
1. *Average Time* dalam unit *nanoseconds/operation* (ns/op).
2. *Throughput* dalam unit *operations/second* (ops/sec).
3. *Memory Size* dalam unit *bytes* atau kilobyte (KB).
4. Angka P-Value dan ukuran efek (Cohen's d) untuk signifikansi statistik.

### **INSTRUMEN/CARA UKUR — MEASUREMENT INSTRUMENTS**
1. **JMH (Java Microbenchmark Harness) v1.37**: Konfigurasi dengan mode `@BenchmarkMode({Mode.AverageTime, Mode.Throughput})`.
2. **JOL (Java Object Layout) v0.17**: Untuk inspeksi ukuran dalam *heap memory* tanpa *stop-the-world bias*.
3. **Script R/Python**: Untuk pengolahan data statistik lanjutan.

### **JUSTIFIKASI METRIC**
- JMH secara inheren menghindari optimasi *dead-code elimination* dari JIT JVM. Pengukuran `System.currentTimeMillis()` sangat tidak valid pada Java modern.
- JOL digunakan karena profiler berbasis agen konvensional seringkali tidak presisi untuk objek tunggal dan memunculkan *overhead* tinggi.
- Metode statistik ANOVA digunakan karena desain eksperimental mencakup lebih dari dua kondisi (faktorial) yang saling berinteraksi.

### E.3. Skenario dan Prosedur Pengujian
1. **Warm-up Phase**: Menjalankan konfigurasi 5 *warm-up iterations* pada JMH untuk memicu proses kompilasi JIT (*Just-In-Time*).
2. **Measurement Phase**: Menjalankan 10 iterasi pengukuran dengan 3 proses turunan (*forks*) terpisah untuk mengurangi variabilitas JVM antar run.
3. **Blackhole Consumption**: Mengonsumsi hasil operasi ke `Blackhole` untuk mencegah kompilator JIT membuang kode (*dead code elimination*).
4. **Data State Pre-population**: Dataset untuk diujikan pada operasi (search, delete, iterate) dipersiapkan terlebih dahulu (*pre-allocated*) melalui fase Setup (`@Setup`) pada JMS *state scope* untuk memastikan pengukuran murni pada waktu akses operasi tanpa *overhead* inisialisasi awal.

### E.4. Artifact, Setup, atau Kesiapan Implementasi
- **Kode Sumber & Repositori**: Proyek diinisialisasi menggunakan Maven dengan *dependencies* terkait JMH dan JOL. Kode disimpan dalam repositori *version control* tertutup (misal GitHub private/public).
- **Infrastruktur**: Mesin uji *dedicated*, misalnya spesifikasi Intel Core i7 / AMD Ryzen 7 dengan RAM minimal 16GB dan media penyimpanan NVMe SSD, dengan *fresh OS boot* sebelum sesi benchmark.

### E.5. Teknik Analisis, Asumsi, dan Validitas
- **Uji Asumsi**: Mengeksekusi uji normalitas Shapiro-Wilk dan uji kesamaan varians Levene pada sampel data hasil benchmark JMH.
- **Teknik Analisis**: Menggunakan Two-way ANOVA (untuk mengevaluasi pengaruh jenis struktur data dan ukuran dataset) dengan tingkat signifikansi α = 0.05. Jika terdapat efek utama yang signifikan, dilanjutkan *post-hoc* Tukey HSD.
- **Validitas**: Dipastikan dengan penggunaan *Blackhole* dan siklus *warm-up* yang terkalibrasi melalui JMH.

## F. HASIL YANG DIHARAPKAN

**Hasil Terukur (dari Hipotesis & Metric):**
- Akan terhimpun dataset valid (*raw JMH output logs*) yang memuat lebih dari 1200 titik data dengan metrik statistik dasar terhitung (Mean, Max, Min, Standard Error) dan batas kepercayaan CI 99%.
- Secara empiris menguji H₀; diharapkan penolakan H₀ kuat terutama pada operasi Search dan Delete, di mana kinerja HashMap (O(1) amortized) secara teoretis memisahkan performa dari ArrayList (O(N)).
- Profil memori yang konkret untuk merepresentasikan trade-off: HashMap yang berpotensi memakan *footprint* lebih besar per entri dibanding alokasi *array* contiguous ArrayList.

**Luaran Penelitian:**
1. *Raw and Aggregated Dataset* yang dipublikasi (CSV/JSON).
2. *Decision Matrix*: Tabel rekomendasi terstruktur untuk memandu developer memilih di antara keduanya berdasarkan tipe penggunaan (*workload*) dan prediksi volume data (*data scale*).
3. Draft *Research Paper* (Laporan Ilmiah).

## G. JADWAL PENELITIAN

| Tahapan (Kegiatan Utama) | Mg 1 | Mg 2 | Mg 3 | Mg 4 | Mg 5 | Mg 6 | Mg 7 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Setup Lingkungan, Baseline & Tooling (JMH, JOL) | ✔️ | | | | | | |
| Implementasi Kode Benchmark (5 Operasi) | | ✔️ | ✔️ | | | | |
| Eksekusi Benchmark Terisolasi & Pengumpulan Data | | | | ✔️ | | | |
| Analisis Statistik (ANOVA) & Visualisasi Data | | | | | ✔️ | ✔️ | |
| Finalisasi Laporan, Decision Matrix, & Paper | | | | | | | ✔️ |

## H. DAFTAR PUSTAKA

1. Oracle. (2021). *JMH (Java Microbenchmark Harness)*. OpenJDK.
2. Shipilëv, A. (2022). *Java Object Layout (JOL)*. OpenJDK.
3. Bloch, J. (2018). *Effective Java (3rd Edition)*. Addison-Wesley Professional.
4. Oaks, S. (2020). *Java Performance: In-Depth Advice for Tuning and Programming Java 8, 11, and Beyond (2nd Edition)*. O'Reilly Media.

---

## CHECKLIST AKHIR

- [X] Judul masih dapat ditelusuri ke masalah, intervensi, dan metode
- [X] Ringkasan memuat urgensi, tujuan, metode, dan luaran
- [X] Rumusan masalah selaras dengan gap dan RQ
- [X] Gap muncul dari literatur atau benchmark yang sah, bukan intuisi pribadi
- [X] RQ menjawab gap secara langsung dan tetap satu rantai logika
- [X] Hipotesis konsisten dengan RQ dan metric utama
- [X] Baseline di state of the art sama dengan baseline di eksperimen
- [X] Satu proposal berpusat pada satu IV utama (struktur data)
- [X] Metric benar-benar mengukur DV, dan instrument memberi jalur nyata ke data
- [X] Scope di pendahuluan sama dengan scope di metode
- [X] State of the art menunjukkan posisi riset, bukan hanya merangkum studi
- [X] Metode menjelaskan unit analisis, A vs B, cara ukur, skenario uji, teknik analisis
- [X] Hasil yang diharapkan realistis, terukur, dan masuk akal terhadap jadwal
- [X] Jadwal penelitian sesuai beban kerja yang masuk akal
- [X] Daftar pustaka hanya berisi sumber yang disitasi

---

**Proposal ini disusun berdasarkan WS-01 sampai WS-08 dari mata kuliah Riset Teknologi Informasi dengan tema: Analisis Perbandingan Performa ArrayList vs HashMap dalam Manajemen Data Objek pada Bahasa Pemrograman Java.**
