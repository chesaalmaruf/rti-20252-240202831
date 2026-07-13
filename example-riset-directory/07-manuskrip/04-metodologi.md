# 3. Metodologi

## 3.1 Arsitektur Sistem Uji
Eksperimen dirancang menggunakan topologi arsitektur monolitik tunggal untuk memusatkan evaluasi beban sistem secara terisolasi. Arsitektur mencakup tumpukan teknologi: 
1. **Application Layer**: Peladen *Express.js* yang berjalan di atas *runtime Node.js*.
2. **Data-access Layer**: *Prisma ORM* untuk melakukan manajemen dan sinkronisasi skema basis data (*schema generation*) yang seragam baik untuk SQL maupun NoSQL.
3. **Database Layer**: Pangkalan data relasional PostgreSQL versi 16 dan pangkalan data dokumen MongoDB versi 7.0 yang dieksekusi secara bergantian pada mesin yang sama guna mencegah bias konfigurasi perangkat keras.

Sistem *endpoint* uji difokuskan pada operasi `POST /api/login`. Logika API bertugas menerima *payload* JSON berupa surel pengguna dan kata sandi tak terenkripsi (teks terang). API kemudian mencari surel tersebut di basis data dan mencocokkan kata sandi dengan hasil komputasi *hashing* `bcrypt.compare()` dengan konfigurasi 10 *salt rounds*.

## 3.2 Skenario Pengujian dan Variabel
Skenario eksperimen dieksekusi menggunakan perkakas uji beban (*load testing tool*) Autocannon yang berbasis Node.js. Autocannon bertugas membanjiri API autentikasi dengan permintaan buatan secara intens.
- **Variabel Bebas**: Jenis mesin basis data (PostgreSQL dan MongoDB).
- **Variabel Terikat**: Rata-rata *Throughput* (diukur dalam *Requests per Second* / RPS) dan *Latency* (diukur dalam milidetik).
- **Variabel Kontrol**:
  - Konkurensi Konstan: 500 koneksi paralel (*concurrent connections*).
  - Durasi Uji: 30 detik untuk tiap sesi pangkalan data.
  - Hashing: Komparasi sinkron Bcrypt 10 *salt rounds*.
  - Ukuran Data Uji: 100.000 data pengguna acak yang di-*seed* menggunakan utilitas *Faker.js*.

## 3.3 Mitigasi Bias
Untuk mencegah anomali komputasi yang diakibatkan oleh perangkat lunak sistem operasi dan memori sisa, diterapkan masa pendinginan perangkat (*cooldown window*) minimal selama 5 menit setiap kali transisi pergantian tipe pangkalan data dilakukan. Hal ini mencegah terjadinya *thermal throttling* eksternal yang tidak terkait secara langsung dengan *workload* yang sedang dieksekusi oleh mesin basis data maupun Node.js.
