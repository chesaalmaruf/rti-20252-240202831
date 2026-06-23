# WS-04: Research Question & Hypothesis

> **Bab 4 — Research Question, Contribution & Hypothesis**

---

## Ringkasan Materi

### RQ Bukan Pertanyaan Biasa

Research Question yang baik secara implisit mengandung cetak biru eksperimen: subjek, baseline, metrik, domain, dataset.

| Kualitas | Contoh |
|----------|--------|
| **Buruk** | "Bagaimana pengaruh deep learning terhadap deteksi malware?" |
| **Baik** | "Apakah CNN menghasilkan F1-Score lebih tinggi dari RF pada CIC-MalMem-2022?" |

Perbedaan: RQ yang baik menyebutkan **metode spesifik**, **metrik terukur**, **baseline**, dan **dataset**.

### Tiga Jenis RQ

| Jenis | Pola | Kebutuhan |
|-------|------|-----------|
| **Comparison** | A vs B → mana lebih baik? | ≥ 2 metode, metrik sama |
| **Improvement** | A' vs A → modifikasi lebih baik? | Pre/post, bukti perbaikan |
| **Exploratory** | Faktor X₁...Xₙ → pengaruh terhadap Y? | Multi-variabel, korelasi/regresi |

### Contribution Statement

Tiga jenis kontribusi: **Improvement** (metode terbukti lebih baik), **Comparison** (perbandingan sistematis yang belum ada), **Novel Approach** (pendekatan baru). Kontribusi harus terhubung langsung dengan gap — kontribusi tanpa gap = klaim tanpa justifikasi.

### Hypothesis H₀ / H₁

- **H₀** (Null) = Tidak ada perbedaan signifikan — asumsi default, harus dibuktikan salah
- **H₁** (Alternative) = Ada perbedaan signifikan — diterima hanya jika H₀ ditolak
- Harus **falsifiable**, mengandung **metrik terukur**, dirumuskan **SEBELUM eksperimen**

### Rantai Operasionalisasi

```
RQ → Variable → Metric → Data → Analysis
```

Jika rantai ini tidak lengkap, RQ belum mature. Bi-directional: RQ yang tidak bisa jadi hipotesis testable harus direvisi mundur.

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan pertanyaan | Apa yang harus dibangun? | Apa yang harus dibuktikan? |
| Bentuk jawaban | Sistem yang berfungsi | Bukti empiris terukur |
| Sukses diukur oleh | User satisfaction, uptime | Signifikansi statistik, effect size |
| Jika gagal | Debug dan perbaiki | Laporkan, analisis mengapa |

### Istilah Penting

- **Research Question (RQ)** — Pertanyaan spesifik: variabel terukur + metrik + konteks
- **Contribution Statement** — Apa yang diketahui setelah riset selesai yang sebelumnya belum ada
- **H₀ / H₁** — Null vs Alternative Hypothesis
- **Falsifiability** — Kondisi hipotesis ditolak harus bisa didefinisikan sebelum eksperimen
- **Operationalization** — Proses mewujudkan konsep abstrak menjadi variabel terukur

---

### **Template A.4 — RQ-Contribution-Hypothesis**

#### **RQ-CONTRIBUTION-HYPOTHESIS**

* **Gap Statement:** Belum ada studi yang mengevaluasi performa komparatif antara arsitektur relasional dan NoSQL menggunakan lapisan perantara modern (Prisma ORM) pada fungsionalitas spesifik dengan beban kerja ganda (kueri database sekaligus komputasi kriptografi *Bcrypt* pada lapisan aplikasi) di bawah kondisi beban kerja konkurensi tinggi (*high-concurrency*).
* **Research Question:**
    * **Tipe:** `[X] Comparison` `[ ] Improvement` `[ ] Exploratory`
    * **Formulasi:** Apakah penggunaan pangkalan data berbasis dokumen MongoDB v7.0 menghasilkan rata-rata *latency* login yang sekurang-kurangnya 20% lebih rendah dan *throughput* (*requests per second*) yang lebih tinggi secara signifikan dibandingkan dengan pangkalan data relasional PostgreSQL v16 pada dataset 100.000 pengguna dengan simulasi beban 500 pengguna serentak (*concurrent users*) di bawah enkapsulasi Prisma ORM pada lingkungan Node.js?
    * **Variabel IV:** Jenis Arsitektur Database Management System (DBMS) (PostgreSQL v16 vs MongoDB v7.0).
    * **Variabel DV:** Performa Otentikasi Pengguna.
    * **Metrik:** *Average Response Time* (milidetik) dan *Requests Per Second* (RPS).
    * **Dataset:** 100.000 rekod data kredensial pengguna dummy (*seeding* berbasis faker.js).
    * **Baseline:** PostgreSQL v16 yang diakses via Prisma ORM pada infrastruktur lokal host (*common practice*).

**Quality Check RQ:**
* `[X] Variabel spesifik`
* `[X] Metrik jelas`
* `[X] Baseline ada`
* `[X] Konteks disebutkan`
* `[X] Memerlukan eksperimen (bukan hanya survei literatur)`

**Contribution Statement:**
* **Apa yang baru diketahui:** Karakteristik efisiensi, batas ambang batas (*bottleneck*), dan data empiris performa kueri indeks unik dari PostgreSQL dan MongoDB ketika dibebani proses komputasi paralel *hashing* keamanan pada lapisan perantara ORM.
* **Jenis kontribusi:** `[ ] Improvement` `[X] Comparison` `[ ] Novel approach`
* **Gap yang diisi:** *Context Gap* (fitur login gabungan kueri-kriptografi) dan *Method Gap* (pengukuran *overhead* Prisma ORM menggunakan injeksi beban Autocannon).

**Hypothesis Pair:**
* **H₀:** $\mu_{\text{Latency MongoDB}} \ge 0.80 \times \mu_{\text{Latency PostgreSQL}}$ dan $\mu_{\text{Throughput MongoDB}} \le \mu_{\text{Throughput PostgreSQL}}$ *(Tidak ada keunggulan performa signifikan pada MongoDB sekurang-kurangnya 20% lebih cepat untuk latency dan lebih tinggi untuk throughput dibanding PostgreSQL).*
* **H₁:** $\mu_{\text{Latency MongoDB}} < 0.80 \times \mu_{\text{Latency PostgreSQL}}$ dan $\mu_{\text{Throughput MongoDB}} > \mu_{\text{Throughput PostgreSQL}}$ *(MongoDB menghasilkan rata-rata latency login sekurang-kurangnya 20% lebih rendah dan throughput yang secara signifikan lebih tinggi dibanding PostgreSQL).*
* **Threshold:** Perbedaan rata-rata performa $\ge$ 20% pada taraf signifikansi statistik $\alpha = 0.05$.
* **Justifikasi threshold:** Batas minimum signifikansi praktis (*practical significance*) di industri rekayasa perangkat lunak untuk menjustifikasi biaya migrasi arsitektur pangkalan data produksi.

---

### **Latihan 1 — Dari Gap ke RQ**

* **Gap dari WS-03:** Riset terdahulu hanya menguji operasi CRUD murni terisolasi, memicu kontradiksi hasil akibat perbedaan perkakas uji, dan belum mengevaluasi performa gabungan kueri data terindeks dengan beban komputasi *hashing* aplikasi (*Bcrypt*) pada ORM modern dalam kondisi konkurensi tinggi.
* **RQ versi pertama (tulis bebas):** Bagaimana perbandingan kecepatan login antara PostgreSQL dan MongoDB kalau dipakai ngoding di Node.js pas usernya banyak banget?

#### **Evaluasi RQ:**

| Komponen | Ada? | Isi |
| :--- | :---: | :--- |
| **Metode spesifik** | Ya | Penggunaan PostgreSQL v16 vs MongoDB v7.0 melalui perantara Prisma ORM. |
| **Metrik terukur** | Ya | *Latency* (*Average Response Time* dalam ms) dan *Throughput* (*Requests Per Second*). |
| **Baseline** | Ya | PostgreSQL v16 (Konfigurasi *Single Index* lokal). |
| **Dataset/konteks** | Ya | 100.000 data pengguna dummy / Beban stress-test 500 *concurrent users* via Autocannon. |

* **Tipe RQ:** `[X] Comparison` / `[ ] Improvement` / `[ ] Exploratory`
* **RQ versi revisi (setelah evaluasi):** Apakah penggunaan MongoDB v7.0 menghasilkan rata-rata *latency* login yang sekurang-kurangnya 20% lebih rendah dan *throughput* yang lebih tinggi secara signifikan dibandingkan dengan PostgreSQL v16 pada dataset 100.000 pengguna dengan simulasi beban 500 pengguna serentak di bawah enkapsulasi Prisma ORM pada lingkungan Node.js?

---

### **Latihan 2 — Hypothesis Pair**

**Rumuskan pasangan hipotesis dari RQ di Latihan 1.**

| Komponen | Isi |
| :--- | :--- |
| **H₀** | Tidak ada perbedaan signifikan pada purata *latency* dan *throughput* kueri autentikasi login antara PostgreSQL v16 dan MongoDB v7.0 di bawah beban 500 pengguna serentak pada dataset 100.000 rekod. |
| **H₁** | MongoDB v7.0 menghasilkan purata *latency* kueri autentikasi login yang secara signifikan sekurang-kurangnya 20% lebih rendah dan *throughput* yang lebih tinggi dibandingkan dengan PostgreSQL v16 pada kondisi uji yang sama. |
| **Metrik** | *Latency* (ms) dan *Throughput* (req/sec). |
| **Threshold** | Selisih nilai purata $\ge$ 20% dengan nilai p-value uji statistik $< 0.05$. |
| **Justifikasi threshold** | Batas toleransi keuntungan performa arsitektur *schemaless* untuk menutupi hilangnya fitur integritas referensial (ACID) yang ada pada SQL. |

* **Apakah hipotesis ini falsifiable?** `[X] Ya` / `[ ] Tidak`
* **Bagaimana cara membuktikannya salah?** Menjalankan eksperimen stress-test sebanyak 30 replikasi penuh, melakukan analisis statistik komparatif (*Independent Sample T-Test*), dan mendapati hasil bahwa nilai p-value $> 0.05$ (tidak signifikan) atau selisih rata-rata *latency* MongoDB tidak mencapai margin keunggulan 20% dibanding PostgreSQL.

---

### **Latihan 3 — Rantai Operasionalisasi**

**Lengkapi rantai dari RQ hingga metode analisis.**

| Tahap | Isi |
| :--- | :--- |
| **RQ** | Apakah MongoDB v7.0 menghasilkan rata-rata *latency* login yang sekurang-kurangnya 20% lebih rendah dan *throughput* yang lebih tinggi secara signifikan dibandingkan dengan PostgreSQL v16... |
| **Variable (IV)** | Jenis Arsitektur DBMS (PostgreSQL v16 vs MongoDB v7.0). |
| **Variable (DV)** | Performa Fitur Autentikasi Sistem. |
| **Metric** | 1. *Average Response Time* (ms)<br>2. *Requests Per Second* (RPS) |
| **Data source** | Berkas log mentah (*raw log output*) berformat JSON hasil eksekusi *automated client testing tool* Autocannon. |
| **Analysis method** | Uji Normalitas (*Shapiro-Wilk*) dilanjutkan dengan Uji Komparatif Dua Sampel Saling Bebas (*Independent Sample T-Test* atau *Mann-Whitney U Test*) pada taraf $\alpha = 0.05$. |

* **Apakah rantai lengkap?** `[X] Ya` / `[ ] Tidak`
* **Jika tidak, tahap mana yang perlu direvisi?** — (Sudah lengkap dan sinkron dari hulu ke hilir).

---

### **Refleksi**

* **Judul:** Analisis Perbandingan Performansi Waktu Respons Kueri Antara MySQL PHP 7.2.27 Dan NoSQL MongoDB *(Olivia dkk., 2020)*.
* **RQ yang diekstrak:** Bagaimana perbandingan performansi waktu respons kueri *Data Manipulation Language* (DML) antara penggunaan MySQL dan NoSQL MongoDB?
* **Komponen yang hilang:** RQ dalam paper asli tersebut kehilangan **Kontoxt Kondisi Beban Trafik** (tidak menyebutkan volume data pengujian atau tingkat konkurensi pengguna di dalam pertanyaan risetnya, sehingga pengujian hanya diukur pada *single request* yang kurang mencerminkan kondisi riil server produksi).