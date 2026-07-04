# Pengaruh Jenis Arsitektur DBMS (PostgreSQL vs MongoDB) terhadap Latency dan Throughput pada Proses Autentikasi Beban Tinggi

**Judul:** Analisis Performa Komparatif Antara PostgreSQL dan MongoDB pada Sistem Autentikasi Node.js dalam Kondisi High-Concurrency

**Target publikasi:** Laporan Penelitian Akhir Praktikum

## Ringkasan

Penelitian ini mengevaluasi kinerja arsitektur basis data relasional (PostgreSQL) berbanding basis data dokumen (MongoDB) saat menangani lalu lintas permintaan masuk yang sangat tinggi pada *endpoint* autentikasi (`POST /api/login`). Eksperimen ini dirancang menggunakan *Node.js* dan abstraksi akses data menggunakan *Prisma ORM*, serta menggunakan fungsi kriptografi berat *Bcrypt* (10 salt rounds) untuk mengukur di mana titik leher botol (*bottleneck*) sistem akan terjadi di bawah stres konstan sejumlah 500 pengguna (*concurrent*).

Detail lengkap topik & roadmap: [09-docs/rencana-penelitian.md](09-docs/rencana-penelitian.md)

## Struktur Direktori

| Folder | Isi |
|---|---|
| [00-admin/](00-admin/) | Administrasi penelitian (jadwal, log eksperimen) |
| [01-proposal/](01-proposal/) | Perumusan proposal |
| [02-literatur/](02-literatur/) | Referensi & paper terkait beban CPU vs I/O |
| [03-teori/](03-teori/) | Arsitektur skema Database & ORM |
| [04-data/](04-data/) | Data mentah JSON dari Autocannon |
| [05-kode/](05-kode/) | Source code: API Server (Node.js) & skrip Stress-test |
| [06-output/](06-output/) | Statistik & visualisasi chart throughput/latency |
| [07-manuskrip/](07-manuskrip/) | Draf kerangka IMRAD untuk laporan ilmiah |
| [08-laporan/](08-laporan/) | Laporan akhir penelitian praktikum |
| [09-docs/](09-docs/) | Dokumen dokumentasi per tahap penelitian |

## Status Tahapan

- [x] **Tahap 1** — Perancangan Arsitektur & Skema Database — *Selesai* ([detail](09-docs/tahap-1-arsitektur-dan-skema-database.md))
- [x] **Tahap 2** — Implementasi API Server Node.js & Prisma — *Selesai* ([detail](09-docs/tahap-2-implementasi-node-prisma.md))
- [x] **Tahap 3** — Skrip Pengujian Autocannon — *Selesai* ([detail](09-docs/tahap-3-pengujian-autocannon.md))
- [x] **Tahap 4** — Ekstraksi Data & Analisis (Thermal Throttling) — *Selesai* ([detail](09-docs/tahap-4-analisis-data.md))
- [x] **Tahap 5** — Draf Laporan Ilmiah — *Selesai* ([detail](09-docs/tahap-5-draf-paper.md))

## Laporan Penelitian

Laporan penelitian komprehensif (ringkasan metodologi, hasil, kendala CPU bottleneck, kesimpulan): [08-laporan/laporan-penelitian.md](08-laporan/laporan-penelitian.md)
