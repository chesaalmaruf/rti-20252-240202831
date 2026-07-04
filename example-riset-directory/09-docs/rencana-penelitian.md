# Rencana Penelitian: Komparasi Performa PostgreSQL dan MongoDB pada Autentikasi High-Concurrency

## 1. Ringkasan

| Item | Keterangan |
|---|---|
| Judul | Analisis Performa Komparatif Antara PostgreSQL dan MongoDB pada Sistem Autentikasi Node.js dalam Kondisi High-Concurrency |
| Target Publikasi | Laporan Akhir Praktikum (atau Jurnal/Sinta 2) |
| Stack | Node.js (Express), Prisma ORM, PostgreSQL, MongoDB, Bcrypt, Autocannon |
| Masalah | Ketidaktahuan akan dampak algoritma kriptografi yang *CPU-bound* (Bcrypt) terhadap pilihan database di tengah beban puncak. |
| Metrik Utama | Throughput (Requests per Second / RPS) dan Latency (ms) |

## 2. Alur Kerja (Roadmap)

Setiap tahap memiliki file rencana detail tersendiri agar lebih rapi:

- [x] **Tahap 1** — [Perancangan Arsitektur & Skema Database](tahap-1-arsitektur-dan-skema-database.md) — *Selesai*
- [x] **Tahap 2** — [Implementasi API Server (Node.js & Prisma)](tahap-2-implementasi-node-prisma.md) — *Selesai*
- [x] **Tahap 3** — [Skrip Pengujian Beban (Autocannon)](tahap-3-pengujian-autocannon.md) — *Selesai*
- [x] **Tahap 4** — [Analisis Data & Kegagalan (*Failure Analysis*)](tahap-4-analisis-data.md) — *Selesai*
- [x] **Tahap 5** — [Draf Paper Jurnal (Kerangka IMRAD)](tahap-5-draf-paper.md) — *Selesai*

---

## 3. Catatan

Dokumen ini adalah indeks utama dokumentasi progres. Laporan selengkapnya yang menggabungkan seluruh intisari bab berada di folder `08-laporan`.
