# 2. Tinjauan Pustaka

## 2.1 Perbandingan Kinerja SQL dan NoSQL
Penelitian terdahulu yang membandingkan basis data relasional (SQL) seperti PostgreSQL dengan basis data non-relasional (NoSQL) seperti MongoDB sering menyimpulkan bahwa NoSQL cenderung mengungguli SQL pada lingkungan *Big Data* berkecepatan tinggi, khususnya pada operasi penyisipan dan pengambilan data semi-terstruktur [1]. MongoDB menggunakan struktur BSON yang mempercepat pertukaran data JSON pada lingkungan Node.js, sementara PostgreSQL memonopoli keamanan struktural relasional dan *trigger* kompleks [2]. Namun, perbandingan konvensional tersebut biasanya dilakukan dengan memisahkan *query* murni dari kompleksitas aplikasi.

## 2.2 Karakteristik Arsitektur Node.js
Node.js beroperasi dengan desain *single-threaded event-loop* yang sangat efisien untuk mengelola antrean koneksi jaringan (*non-blocking I/O*) [3]. Akan tetapi, kelemahan mendasar dari desain arsitektur ini muncul ketika Node.js dihadapkan pada tugas yang membebani komputasi sentral (*CPU-bound tasks*). Jika *event-loop* terblokir oleh operasi sinkron yang lama di dalam satu utas, seluruh koneksi asinkron (seperti permintaan *query* ke *database*) harus menunggu, sehingga memicu penumpukan memori dan degradasi performa (*latency spike*) [4].

## 2.3 Komputasi Hashing Bcrypt
Bcrypt adalah fungsi *hash* berbasis *Blowfish cipher* yang secara sengaja direkayasa supaya berjalan lambat dengan membebani siklus CPU dan memori [5]. Semakin besar jumlah putaran (*salt rounds*), semakin tinggi eksponensial waktu eksekusi yang diperlukan. Penggunaan Bcrypt di *thread* utama aplikasi, seperti pada Node.js, saat kondisi ribuan *concurrent users*, diketahui berisiko menjadi *bottleneck*. 

Meskipun secara teoritis dampak *blocking* dari Bcrypt sudah dipahami, jarang ada studi eksperimental yang secara spesifik meneliti bagaimana perilaku *bottleneck CPU* ini berimplikasi langsung pada metrik keandalan *(reliability)* *connection pool* antara ORM (seperti Prisma) terhadap basis data yang berbeda (PostgreSQL versus MongoDB). Penelitian ini mengisi celah tersebut dengan menggunakan metrik uji beban (*stress testing*) terukur dari perkakas Autocannon.
