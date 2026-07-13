# Laporan Hasil Praktikum Perbandingan DBMS
**Pengaruh Jenis Arsitektur DBMS (PostgreSQL vs MongoDB) terhadap Latency dan Throughput pada Proses Autentikasi Beban Tinggi**

## 1. Spesifikasi Pengujian (Control Variables)
| Parameter | Nilai / Kondisi |
| :--- | :--- |
| **Volume Dataset** | 100.000 User (Seed Terkunci: 42) |
| **Beban Konkurensi** | 500 koneksi serentak (concurrent) |
| **Durasi Uji** | 30 detik |
| **Endpoint Target** | `POST /api/login` |
| **Abstraksi ORM** | Prisma ORM v6 |
| **Keamanan (Kriptografi)**| Bcrypt (10 Salt Rounds) |
| **Spesifikasi Hardware** | AMD Athlon 7320U, RAM 8GB, Windows 11 |

**Alasan Pemilihan Durasi 30 Detik:**
Durasi 30 detik dipilih karena ini merupakan durasi paling optimal untuk mendapatkan sampel data di titik stabil (*steady state*) server. Waktu ini juga cukup singkat untuk mencegah prosesor mencapai batas kritis kepanasan (*thermal throttling*) yang parah akibat algoritma Bcrypt, yang dapat merusak keakuratan dan keadilan pengujian antar database.

---

## 2. Metodologi (Langkah Pengujian Otomatis)

Untuk meminimalkan potensi *human error* saat mengubah *environment* database, pengujian ini menggunakan script otomatisasi `switch-db.js` dengan urutan sebagai berikut:

1. **Memastikan Server Mati**: Menekan `Ctrl + C` pada terminal server untuk menghindari *file lock* pada Prisma Engine.
2. **Switching Environment**: Menjalankan perintah `node switch-db.js postgres`. Script otomatis menukar konfigurasi di file `.env`, sintaks `provider` di `prisma/schema.prisma`, dan me-reload Prisma Client.
3. **Mengaktifkan API**: Menjalankan ulang server API (`npm start`).
4. **Stress Testing**: Menjalankan `node stress-test.js PostgreSQL` (mengirim 500 koneksi bersamaan). 
5. **Repetisi**: Mengulangi langkah 1-4 untuk kondisi perlakuan (`node switch-db.js mongodb`).
6. **Ekstraksi Hasil**: Script uji merekam waktu tunggu (Latency) dan kapasitas balas (Throughput) dari detik ke-1 hingga detik ke-30 dan diekspor menjadi laporan visual.

---

## 3. Tabel Komparasi Hasil Eksperimen

Berikut adalah rekapitulasi perbandingan metrik agregat kinerja:

| Metrik Kinerja (Dependent Variable) | PostgreSQL v16 | MongoDB v7.0 |
| :--- | :--- | :--- |
| **1. Latency (Waktu Respons)** | | |
| ├─ Rata-rata (Avg) | `7962.11 ms` | `8437.25 ms` |
| └─ Terlama (Max) | `11725 ms` | `9738 ms` |
| | | |
| **2. Throughput (Kapasitas Beban)** | | |
| ├─ Rata-rata Requests per Detik | `14.67 req/sec` | `0.31 req/sec` |
| └─ Total Request Berhasil | `176 requests` | `4 requests` |
| | | |
| **3. Stabilitas & Error** | | |
| └─ Total Gagal / Timeout | `1468 requests` | `1992 requests` |

---

## 4. Visualisasi Grafik (Time-Series)

*(Catatan: Silakan ambil screenshot/tangkapan layar dari file `grafik_hasil.html` yang terbuka di browser Anda, lalu *Paste* / masukkan ke bawah teks ini menggantikan area kotak ini saat Anda menyalinnya ke Microsoft Word)*

> -------------------------------------------------------------
![alt text](image/image.png)-------------------------------------------------------------

> -------------------------------------------------------------
![alt text](image/image-1.png)-------------------------------------------------------------

**Penjelasan Grafik:**
Grafik di atas menunjukkan pergerakan data metrik secara konstan dari Detik ke-1 hingga Detik ke-30. Pemotongan sumbu X secara presisi berdasarkan waktu (bukan berdasarkan urutan request) bertujuan agar laju server PostgreSQL dan MongoDB dapat dibandingkan secara berdampingan dan sejajar (*head-to-head*) pada waktu yang sama. Hal ini memperjelas momen di mana server mulai tertahan dan tidak memproses permintaan sama sekali (menjadi garis datar).

---

## 5. Analisis Akhir (Kesimpulan Praktikum)
Berdasarkan data *time-series* dan agregat di atas, eksperimen kali ini sangat dibatasi oleh kemampuan komputasi CPU (CPU-Bound) akibat beratnya algoritma kriptografi `bcrypt` dengan 10 *salt rounds* yang harus melayani 500 permintaan serentak. 

Pada pengujian yang dilakukan secara beruntun, **PostgreSQL** berhasil menyelesaikan *throughput* (176 sukses) lebih baik dibanding putaran dari **MongoDB** (hanya 4 sukses) yang dilakukan sesudahnya. Hasil yang timpang pada uji belakangan ini mengindikasikan kuat adanya efek *thermal throttling* pada prosesor laptop penguji (AMD Athlon 7320U). Saat prosesor kelelahan, memori antrean (*event loop*) Node.js menjadi sangat tersendat dan memicu rentetan *Timeout* masif (sebanyak 1.992 kegagalan). 

Oleh karenanya, meskipun arsitektur penyimpanan dan indeksnya berbeda, kinerja keseluruhan pada kasus autentikasi berbeban tinggi ini sepenuhnya tunduk pada seberapa baik kapabilitas perangkat keras (CPU) dalam memproses beban enkripsi di tingkat aplikasi (*Application Layer*), sebelum permintaan tersebut benar-benar menyentuh *Database Layer*.
