# 4. Hasil dan Analisis

## 4.1 Ekstraksi Data Hasil Pengujian
Berdasarkan log *output* dari Autocannon pada kondisi 500 koneksi bersamaan selama 30 detik, didapatkan metrik statistik deskriptif kinerja kedua pangkalan data sebagai berikut:

**Tabel 1: Metrik Perbandingan Kinerja PostgreSQL vs MongoDB**
| Skenario | Mean Throughput (RPS) | Total Request Sukses | Total Timeout / Error | Mean Latency (ms) |
|----------|-----------------------|----------------------|-----------------------|-------------------|
| PostgreSQL | 14.67 | 176 | 1468 | 7962.11 |
| MongoDB | 0.31 | 4 | 1992 | 8437.25 |

Data menunjukkan divergensi kinerja yang sangat drastis, di mana PostgreSQL mampu mempertahankan tingkat *Throughput* rata-rata sebesar 14.67 RPS dan berhasil memproses 176 permintaan autentikasi secara lengkap. Di sisi lain, *Throughput* dari implementasi MongoDB jatuh secara tajam hingga mendekati nol (0.31 RPS), dan peladen hanya mampu merespons sukses sebanyak 4 *request* saja sepanjang durasi uji. Tingkat kegagalan (*timeout*) pada konfigurasi MongoDB memuncak mencapai 1.992 kegagalan.

## 4.2 Analisis Kegagalan (Failure Analysis)
Secara sepintas, tingginya angka *latency* (> 7000 ms) dan ribuan *timeout* dapat dianggap sebagai kelemahan inheren arsitektur MongoDB dalam merespons panggilan koneksi konkurensi. Akan tetapi, investigasi tingkat utilitas mesin mengungkap fenomena ***CPU Bottleneck*** dan ***Thermal Throttling*** yang bersumber langsung pada lapisan peladen Node.js. 

Akar penyebab kegagalan kinerja bukan berasal dari mekanisme I/O pangkalan data, melainkan disrupsi pada mekanisme *Event-Loop* Node.js. Algoritma komparasi sandi `Bcrypt` dengan 10 putaran berjalan secara rakus (*greedy*) dalam memonopoli siklus prosesor mesin uji coba. Setelah mesin dieksploitasi dalam sesi pengujian PostgreSQL, masuknya ribuan koneksi konkuren di sesi uji MongoDB memaksa Node.js untuk menumpuk tugas komputasi *hash* dalam *event-loop*. Karena operasi *hashing* tidak bisa dilepaskan ke *worker-threads* secara mandiri (mengingat sifat *single-threaded* arsitektur), hal ini secara fatal memblokir koneksi jaringan *Prisma Client* ke *cluster* MongoDB.

Oleh karenanya, peladen gagal mengirim dan menerima paket TCP pangkalan data tepat waktu (memicu ribuan *timeout*), bukan karena MongoDB gagal mencari dokumen pengguna, namun Node.js terlalu 'sibuk' mengeksekusi perhitungan kriptografi secara sinkron.
