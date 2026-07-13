# Outline Naskah Jurnal

## Judul
Analisis Performa Komparatif Antara PostgreSQL dan MongoDB pada Sistem Autentikasi Node.js dalam Kondisi High-Concurrency

## Peta Sumber
- Abstrak: `01-abstrak.md`
- Pendahuluan: `02-pendahuluan.md`
- Tinjauan Pustaka: `03-tinjauan-pustaka.md`
- Metodologi: `04-metodologi.md`
- Hasil & Analisis: `05-hasil-analisis.md`
- Kesimpulan: `06-kesimpulan.md`
- Daftar Pustaka: `07-daftar-pustaka.md`

## Daftar Klaim Kunci
1. Pada beban konkurensi tinggi (500 koneksi bersamaan), sistem autentikasi Node.js yang menggunakan PostgreSQL mempertahankan *throughput* lebih tinggi (14.67 RPS) dibandingkan MongoDB (0.31 RPS).
2. Kegagalan utama pada performa (1.992 timeouts pada MongoDB) tidak disebabkan oleh arsitektur pangkalan data, melainkan *CPU bottleneck* (*thermal throttling*) dari algoritma *hashing* Bcrypt (10 *salt rounds*).
3. Karakteristik Node.js yang *single-threaded* memperburuk kondisi *bottleneck* ketika operasi kriptografi tersinkronisasi menghalangi *event-loop* untuk melayani koneksi antrian ke *database*.
4. Solusi arsitektural yang disarankan adalah pemisahan (*decoupling*) fungsi kriptografi dari server logika pusat (menjadi layanan *microservice* tersendiri).
