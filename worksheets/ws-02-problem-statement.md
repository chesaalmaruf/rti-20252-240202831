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
**Domain & Konteks**
- **Domain**: Database Management Systems (DBMS)[cite: 32].
- **Konteks**: Aplikasi Mobile Kebutuhan Nutrisi Harian Balita (*Toddlers Daily Nutritional Needs*).

**System Context**
- **Input**: Data status nutrisi balita meliputi berat badan, umur, skor nutrisi, status gizi, ID unik, dan *timestamp*.
- **Process**: Pelaksanaan operasi CRUD (Create, Read, Update, Delete) sebanyak 50 kali untuk setiap batch pengujian pada kedua database.
- **Output**: Waktu respons database dalam satuan milidetik (ms)[cite: 170].
- **Outcome**: Penentuan DBMS yang paling sesuai untuk mendukung responsivitas aplikasi pemantau nutrisi[cite: 17, 301].
- **Constraints**: Data tidak terdistribusi normal (Shapiro-Wilk $p < alpha$), sehingga memerlukan uji non-parametrik Wilcoxon Signed-Rank[cite: 161, 162, 163, 164].
- **Stakeholders**: Orang tua pengguna aplikasi dan pengembang aplikasi mobile[cite: 18, 62, 304].

**Fenomena → Problem**
- **Fenomena yang diamati**: Adanya berbagai pilihan DBMS seperti MySQL (Relasional) dan Firebase (NoSQL/Cloud-hosted) untuk pengembangan aplikasi mobile[cite: 40, 43, 44].
- **Gejala (symptom) yang terukur**: Kebutuhan pengguna akan waktu respons aplikasi yang cepat agar dapat bekerja secara efektif dan tidak terdistraksi[cite: 34, 35].
- **Masalah yang didiagnosis**: MySQL memiliki tantangan dalam biaya logging dan skalabilitas [cite: 42][cite_start], sementara Firebase Realtime Database unggul dalam sinkronisasi tetapi sulit untuk kueri data kompleks[cite: 44].
- **Masalah riset (researchable)**: Perbandingan performa waktu respons antara Firebase Realtime Database dan MySQL menggunakan uji Wilcoxon Signed-Rank pada operasi CRUD[cite: 10, 16, 17].
- **Variabel yang terukur**: Waktu respons database (milidetik)[cite: 16, 170].

**Problem Quality Check**
- [x] **Clarity** — Masalah terdefinisi jelas melalui komparasi teknis dua DBMS[cite: 10, 15].
- [x] **Measurability** — Mengukur waktu respons secara kuantitatif dalam milidetik[cite: 170, 173].
- [x] **Relevance** — Krusial untuk efektivitas penggunaan aplikasi kesehatan balita[cite: 35, 62].
- [x] **Testability** — Dapat diuji melalui eksperimen batch 50 kali pengulangan[cite: 117, 136].
- [x] **Impact** — Memberikan bukti empiris bagi pengembang dalam memilih infrastruktur backend[cite: 17, 304].

**Problem Statement (1 paragraf):**
Pemilihan DBMS yang tepat sangat menentukan responsivitas aplikasi mobile nutrisi balita, di mana waktu respons yang lambat dapat mengganggu efektivitas orang tua dalam memantau gizi anak. Meskipun MySQL merupakan database relasional yang populer, ia memiliki kendala skalabilitas, sementara Firebase Realtime Database menawarkan sinkronisasi otomatis namun terbatas pada kueri sederhana[cite: 42, 44, 109]. [cite_start]Penelitian ini berfokus pada perbandingan kinerja waktu respons operasi CRUD antara Firebase dan MySQL menggunakan uji Wilcoxon Signed-Rank untuk mengatasi masalah distribusi data yang tidak normal. Hasil penelitian ini memberikan kontribusi berupa bukti empiris bahwa Firebase memiliki performa lebih baik, sehingga menyederhanakan proses pengembangan aplikasi mobile yang membutuhkan data *real-time*.
```
---

## Latihan 1 — Dari Topik ke Masalah Riset

**Topik awal**: Perbandingan Performa Database Relasional dan NoSQL pada Aplikasi Mobile.

| Tahap | Hasil |
|-------|-------|
| **Reality** |Sistem manajemen basis data (DBMS) diperlukan untuk mengelola pengolahan data yang saling terkait di dunia modern[cite: 24, 25, 32]. |
| **Observed Issue (Symptom)** | [cite_start]Pengguna menginginkan program aplikasi yang mampu memberikan waktu respons yang cepat demi efektivitas kerja[cite: 34, 35]. |
| **Diagnosed Problem (Root Cause)** | [cite_start]MySQL memiliki kekurangan dalam hal skalabilitas dan biaya logging, sedangkan Firebase memiliki kendala dalam migrasi dan kueri data kompleks[cite: 42, 44]. |
| **Researchable Problem** | [cite_start]Uji komparasi waktu respons operasional CRUD antara Firebase Realtime Database dan MySQL menggunakan uji statistik Wilcoxon Signed-Rank[cite: 10, 16]. |
| **Measurable Variable** | [cite_start]Waktu respons database dalam milidetik dan nilai signifikansi (p-value) hasil uji Wilcoxon[cite: 16, 170, 198]. |

**Apakah terjebak solution-first thinking?** [x] Tidak
> [cite_start]Karena riset ini berfokus pada pengujian dan pembuktian performa komparatif antara dua teknologi, bukan langsung menentukan solusi tanpa evaluasi empiris[cite: 16, 45].

---

## Latihan 2 — System Context Decomposition

| Komponen | Deskripsi |
|----------|----------|
| **Input** | Data nutrisi balita (berat, usia, skor gizi) dalam format SQL atau JSON[cite: 132]. |
| **Process** | Eksekusi metode INSERT/setValue, SELECT/ValueEventListener, UPDATE, dan DELETE sebanyak 50 kali[cite: 140, 143, 147, 150]. |
| **Output** | Data waktu respons dalam milidetik dan hasil uji hipotesis $H_{0}$ vs $H_{1}$[cite: 170, 195]. |
| **Outcome** | Konfirmasi bahwa Firebase Realtime Database lebih cocok untuk aplikasi nutrisi balita karena waktu respons lebih baik[cite: 17, 301]. |
| **Constraints** | Dataset pengujian dibatasi dari 1 hingga 3.000 rekaman dan harus dijalankan pada Android 9.0[cite: 124, 136]. |
| **Stakeholders** | Komunitas dan Pemerintah yang berupaya mengatasi masalah malnutrisi balita melalui teknologi[cite: 61, 62]. |

**Komponen mana yang paling relevan dengan masalah riset?** **Process** (karena pada tahap inilah operasi CRUD diukur dan diuji secara statistik untuk membuktikan perbedaan performa)[cite: 116, 117, 164].

---

## Latihan 3 — Problem Quality Check

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| **Clarity** | 5 | Masalah riset diformulasikan secara spesifik membandingkan dua DBMS melalui tes statistik[cite: 10, 16]. |
| **Measurability** | 5 | Menggunakan metrik waktu milidetik dan p-value yang sangat terukur[cite: 170, 198]. |
| **Relevance** | 5 | Sangat relevan untuk mengatasi masalah malnutrisi melalui aplikasi yang responsif[cite: 61, 62]. |
| **Testability** | 5 | Eksperimen dapat diulang (reproducible) dengan konfigurasi perangkat keras dan perangkat lunak yang terdokumentasi[cite: 121, 126, 130]. |
| **Impact** | 4 |Membantu pengembang mempercepat proses pembuatan aplikasi tanpa backend expertise yang mendalam[cite: 44, 304]. |

**Skor total**: 24 / 25

**Problem statement versi final (1 paragraf):**
Penelitian ini bertujuan untuk menentukan DBMS yang paling efektif antara Firebase Realtime Database dan MySQL untuk mendukung aplikasi mobile pemantauan gizi balita, mengingat pentingnya waktu respons cepat bagi pengalaman pengguna. Masalah utama terletak pada perbedaan arsitektur (Relasional vs NoSQL) yang mempengaruhi kecepatan operasi CRUD dasar, di mana MySQL memiliki keterbatasan pada skalabilitas sedangkan Firebase pada kompleksitas kueri. Melalui eksperimen 50 iterasi pada data 1-3.000 rekaman, riset ini menggunakan uji statistik Wilcoxon Signed-Rank untuk membuktikan hipotesis keunggulan performa.Hasilnya secara signifikan menunjukkan bahwa Firebase memberikan respons yang lebih cepat, menjadikannya solusi yang direkomendasikan untuk menyederhanakan pengembangan aplikasi kesehatan masyarakat yang membutuhkan sinkronisasi data seketika.

---

## Refleksi

**Jawaban:**
Perbedaan fundamental antara masalah *coding* (bug/error) dan masalah riset terletak pada tujuan dan pendekatannya. Dalam *coding*, masalah didefinisikan sebagai kegagalan sistem untuk memenuhi fungsinya (misalnya error koneksi database), dan pendekatannya bersifat teknis untuk segera memperbaiki agar sistem berjalan kembali (*engineering*). Sebaliknya, masalah riset didefinisikan sebagai kesenjangan pengetahuan (*gap*), di mana kita tidak sekadar memperbaiki sistem, tetapi berupaya memahami dan membuktikan klaim secara empiris (misalnya, membuktikan *mengapa* atau *apakah* satu database lebih cepat dari yang lain). Masalah riset menuntut batasan yang jelas agar variabelnya terukur dan hasilnya dapat divalidasi secara statistik, sehingga menghasilkan pengetahuan baru yang dapat digeneralisasi, bukan sekadar solusi teknis sekali pakai[cite: 16, 164, 302].