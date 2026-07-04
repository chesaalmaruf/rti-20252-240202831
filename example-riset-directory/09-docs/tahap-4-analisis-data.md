# Tahap 4: Ekstraksi Data dan Analisis (Failure Analysis)

Tahapan ini merangkum data keluaran (output) hasil tes Autocannon dan merumuskan analisis performa.

## 1. Hasil Statistik Deskriptif

Berdasarkan *log* metrik dari `hasil_eksperimen.json` (parameter: beban 500 koneksi selama 30 detik):

| Skenario | Mean Throughput (RPS) | Total Request Sukses | Total Timeout / Error | Mean Latency (ms) |
|----------|-----------------------|----------------------|-----------------------|-------------------|
| PostgreSQL (SQL) | 14.67 | 176 | 1468 | 7962.11 |
| MongoDB (NoSQL) | 0.31 | 4 | 1992 | 8437.25 |

## 2. Failure Analysis (Thermal Throttling)

Melalui observasi grafik yang dibuat, terlihat anomali tajam pada *throughput* MongoDB yang mencapai angka kritis (hanya 4 *request* sukses dari sekian ribu koneksi).

**Interpretasi Peneliti:**
- **Gejala:** *Latency* memuncak tak terhingga, dan sistem seakan menolak memproses paket I/O lanjutan (ditandai dengan 1992 kali *timeout*).
- **Akar Penyebab (Root Cause):** Algoritma `Bcrypt` (10 putaran) secara rakus memonopoli siklus prosesor laptop/komputer uji. Hal ini memicu mekanisme penurun-panas otomatis perangkat (***Thermal Throttling***), khususnya setelah sebelumnya mesin digeber secara agresif untuk uji PostgreSQL.
- **Dampak pada Node.js:** Karena mesin *Node.js* bersifat *single-threaded*, ketika utas tunggal (*Event-Loop*) terblokir oleh antrian komputasi kriptografi, koneksi jaringan ke pangkalan data MongoDB yang menumpuk tidak lagi dilayani.

## 3. Kesimpulan Sementera

Di skenario aplikasi Monolitik (dengan algoritma *hashing* menyatu dalam *core API*), **PostgreSQL** mempertahankan kinerja *connection pool* I/O yang lebih superior dibanding **MongoDB**. Perdebatan kapabilitas *indeks database* menjadi tidak relevan saat titik hancur sistem sesungguhnya bertumpu di lapisan perangkat lunak (Bcrypt).
