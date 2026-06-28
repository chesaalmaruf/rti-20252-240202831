# WS-06: System-Experiment Mapping

> **Bab 6 — System Design sebagai Experimental Artifact**

---

## Ringkasan Materi

### Sistem = Instrumen Pengujian, Bukan Produk

Seorang engineer bertanya "apakah sistem bekerja?" — seorang peneliti bertanya "apa yang bisa dibuktikan sistem ini?" Sistem dalam riset adalah **artifact** — objek yang sengaja dibuat untuk menguji klaim spesifik.

### System as Experiment Model

```
RQ → Variable → System Component → Experimental Setup → Output
```

Setiap komponen sistem harus bisa ditelusuri ke variabel riset (top-down), dan setiap pengukuran harus menjawab RQ (bottom-up).

### Mapping Variabel ke Komponen

| Tipe Variabel | Peran di Sistem | Contoh |
|---------------|----------------|--------|
| **IV** (Independent) | Modul yang bisa di-toggle/swap | Algoritma A vs B |
| **DV** (Dependent) | Modul pengukuran | Logger, metrics collector |
| **CV** (Control) | Config yang dikunci | Dataset, parameter tetap |

Jika variabel tidak bisa di-map ke komponen apapun → arsitektur perlu didesain ulang.

### 4 Prinsip Desain Eksperimental

| Prinsip | Pertanyaan Kunci |
|---------|-----------------|
| **Traceability** | Komponen ini melayani variabel yang mana? |
| **Modularity** | Bisakah IV diubah tanpa memengaruhi yang lain? |
| **Controllability** | Apakah CV dieksternalisasi ke config file? |
| **Measurability** | Apakah sistem otomatis menghasilkan data yang dibutuhkan? |

### Variable Isolation melalui Arsitektur

- **Modular architecture** — Pisahkan berdasarkan variabel
- **Configuration-driven** — Ubah config (YAML/JSON), bukan code
- **Feature toggles** — On/off flag untuk ablation study

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan sistem | Memenuhi kebutuhan user | Menguji hipotesis, menghasilkan bukti |
| Arsitektur | Optimasi performa & skalabilitas | Optimasi isolasi variabel & reprodusibilitas |
| Konfigurasi | Sering hardcoded | Dieksternalisasi ke config file |
| Fitur tambahan | Menambah nilai user | Menambah noise jika tidak terkait RQ |

### Istilah Penting

- **Artifact** — Objek yang sengaja dibuat untuk memecahkan masalah atau menguji proposisi
- **Traceability** — Kemampuan menelusuri hubungan RQ → variabel → komponen → output
- **Variable Isolation** — Mengubah hanya satu variabel sambil menahan yang lain konstan
- **Ablation Study** — Menguji kontribusi tiap komponen dengan melepasnya satu per satu
- **Configuration-driven Execution** — Semua parameter di config file, bukan hardcoded

---

## Template A.6 — Mapping RQ ke Arsitektur Sistem

**SYSTEM-EXPERIMENT MAPPING**

**Research Question:** Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput* yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users*?

**Variable → Component Mapping:**

| Variabel | Tipe | Komponen Sistem | Cara Manipulasi/Pengukuran |
|----------|------|-----------------|---------------------------|
| **Jenis DBMS** | IV | Modul Koneksi Basis Data (Prisma Client & `.env`) | Mengubah URL string koneksi basis data di dalam file konfigurasi `.env`. |
| **Latency & Throughput** | DV | Modul *Benchmarking* (NPM Autocannon) | Pengukuran dan pencatatan metrik otomatis ke dalam format JSON/Teks oleh *Autocannon logger*. |
| **Beban Konkurensi** | CV | Parameter Eksekusi *Load Tester* | Memanipulasi *flag* CLI (`-c 500` dan `-d 30`) pada saat menjalankan *Autocannon*. |
| **Algoritma Hashing** | CV | *Auth Controller Layer* (Fungsi Login) | Konfigurasi `bcrypt.compare()` yang dikunci statis pada *source code* *controller*. |

**4 Prinsip Desain:**
* [x] **Traceability** — Setiap komponen bisa ditelusuri ke variabel (Contoh: `autocannon` untuk DV, `.env` untuk IV).
* [x] **Variable Isolation** — IV bisa diubah tanpa mengubah CV (Mengganti jenis DB hanya memerlukan perubahan string `.env` tanpa menyentuh logika *Auth Controller*).
* [x] **Measurement Integration** — Pengukuran DV *built-in* melalui *Autocannon*.
* [x] **Reproducibility** — Setup bisa direkonstruksi dengan script `npm run seed` dan `npm run benchmark`.

**Experimental Setup:**
* **Input data:** *Payload* JSON berisi `{"email": "userX@test.com", "password": "password123"}` (disimulasikan dari 100.000 *dummy records*).
* **Parameter:** Durasi uji 30 detik (`-d 30`), konkurensi 500 koneksi (`-c 500`), *pipelining* diaktifkan.
* **Output format:** Log *console* dan *file* laporan JSON yang berisi nilai rata-rata, persentil, dan batas toleransi *latency/throughput*.

---

## Latihan 1 — Variable-to-Component Mapping

**RQ:** Adakah penggunaan MongoDB menghasilkan rata-rata *latency* login yang lebih rendah dan *throughput* yang lebih tinggi dibandingkan PostgreSQL pada dataset 100.000 user dengan simulasi 500 *concurrent users*?

| Variabel | Tipe | Komponen Sistem | Cara Manipulasi / Pengukuran |
|----------|------|-----------------|---------------------------|
| **Jenis DB** | IV | Konfigurasi Skema Prisma (`schema.prisma`) | Mengganti *provider* dari `postgresql` ke `mongodb`. |
| **Throughput** | DV | *Metrics Collector* (Autocannon) | Otomatis mengkalkulasi jumlah *request* yang berstatus 200 OK per detik. |
| **Volume Data** | CV | Skrip *Database Seeder* | Parameter rentang `for loop` diset tetap pada angka 100.000 iterasi. |

**Apakah semua variabel bisa di-map?** [x] Ya / [ ] Tidak

---

## Latihan 2 — 4 Prinsip Desain

Evaluasi desain sistem terhadap 4 prinsip.

| Prinsip | Status | Bukti / Penjelasan |
|---------|--------|-------------------|
| **Traceability** | ✅ Terpenuhi | Modul koneksi hanya mengatur IV, modul rute/API hanya memproses bisnis logika, dan modul *tester* hanya mencatat DV. |
| **Modularity** | ✅ Terpenuhi | Logika pengesahan kata laluan (*bcrypt*) terpisah sepenuhnya dari pemacu pangkalan data (*database driver*). |
| **Controllability** | ⚠️ Sebagian | Konfigurasi parameter eksternal telah diasingkan ke fail `.env` dan *flags* CLI. Namun, beban dari Sistem Operasi (OS) dan Rangkaian masih sukar dikawal secara mutlak. |
| **Measurability** | ✅ Terpenuhi | Menggunakan alatan CLI pengujian beban standard industri (*Autocannon*) yang menghasilkan data berstruktur dan kebolehulangan tinggi. |

**Prinsip mana yang paling sulit dipenuhi?** Controllability (Pengawalan faktor persekitaran).
**Strategi untuk mengatasinya:**
> Menjalankan persekitaran sistem (API dan *Database*) di dalam *Docker Containers* dan memberikan had sumber daya yang tetap (*resource limits*, seperti CPU dan RAM) bagi memastikan sistem operasi hos tidak menjadi pembolehubah perancu (*confounding variable*).

---

## Latihan 3 — Ablation Study Planning

Dalam kajian prestasi senario log masuk, kita mengandaikan kependaman dipengaruhi oleh 3 faktor (lapisan perisian): jenis pangkalan data, lapisan ORM, dan lapisan kriptografi.

| Kondisi | Komponen A (Lapisan Kriptografi) | Komponen B (Lapisan Akses Data) | Komponen C (Sistem Pangkalan Data) | Hasil yang Diharapkan |
|---------|--------------------------------|-------------------------------|----------------------------------|----------------------|
| **Full** | ✅ *Bcrypt Hashing* | ✅ *Prisma ORM* | ✅ *MongoDB (NoSQL)* | *Baseline* prestasi dunia sebenar (Tinggi kependaman kerana proses hashing yang berat). |
| **– A** | ❌ *Plaintext (Tiada Hashing)* | ✅ *Prisma ORM* | ✅ *MongoDB (NoSQL)* | Menunjukkan kependaman dan had truput sebenar pangkalan data. |
| **– B** | ✅ *Bcrypt Hashing* | ❌ *Native Driver (Mongoose)* | ✅ *MongoDB (NoSQL)* | Mengukur penalti prestasi (*overhead*) akibat penggunaan *Prisma ORM*. |
| **– C** | ✅ *Bcrypt Hashing* | ✅ *Prisma ORM* | ❌ *PostgreSQL (SQL)* | Menjawab persoalan kajian utama sama ada *PostgreSQL* lebih efisien pada tahap seni bina ini. |

**Komponen mana yang diprediksi paling berkontribusi?** Komponen A (Lapisan Kriptografi / *Bcrypt*).
**Mengapa?**
> Reka bentuk *Bcrypt* sememangnya sengaja diperlahankan untuk mengelakkan serangan *brute-force*. Oleh itu, ia akan memakan sumber CPU yang jauh lebih besar berbanding masa yang diambil oleh pangkalan data (Komponen C) untuk mencari maklumat pengguna.

---

## Refleksi

> Apa risiko jika sistem dibangun seperti produk (monolitik, fitur lengkap) lalu baru dilakukan eksperimen? Mengapa arsitektur modular penting untuk riset?

**Jawaban:**
> Risiko membina sistem risalah (produk penuh seperti kerangka aplikasi web yang sarat dengan pembalakan, pengecaman sesi, dan UI) ialah pengenalan pembolehubah perancu (*confounding variables*). Sebagai contoh, jika *throughput* perlahan, sukar untuk membezakan sama ada ia berpunca daripada kependaman pangkalan data, kependaman pelayan rangkaian, atau kependaman enjin pemaparan templat.
>
> Seni bina modular adalah kritikal untuk penyelidikan bagi memastikan **Pengasingan Pembolehubah (*Variable Isolation*)**. Penyelidik dapat memastikan hanya komponen yang diuji (contohnya, enjin *MongoDB* berbanding *Postgres*) yang diubah, manakala lapisan sistem lain kekal tidak berubah secara berstruktur. Pendekatan ini menjamin perbandingan *apple-to-apple*.

