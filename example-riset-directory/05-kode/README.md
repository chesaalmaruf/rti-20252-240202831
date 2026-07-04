# 05 - Kode

Direktori ini menyimpan implementasi *source code* (sistem aplikasi pengujian dan *load tester* eksperimen).

## Struktur Kode

1. `server.js` — Server Node.js (Express) yang menampung rute API Autentikasi (`POST /api/login`) dengan integrasi keamanan Bcrypt.
2. `stress-test.js` — Kode Node.js untuk mengeksekusi Autocannon secara otomatis, mengumpulkan agregasi Time-Series, dan mengekspor hasilnya.
3. `switch-db.js` — Skrip utilitas otomatikal untuk menukar konfigurasi lingkungan `.env` dan `schema.prisma` ke basis data target antara PostgreSQL dan MongoDB.
4. `seed.js` — Skrip pembangkit 100k data dummy.

## Referensi Setup

Dokumentasi untuk instalasi dependensi, kode `server.js`, dan eksekusi tes: 
- [../09-docs/tahap-2-implementasi-node-prisma.md](../09-docs/tahap-2-implementasi-node-prisma.md)
- [../09-docs/tahap-3-pengujian-autocannon.md](../09-docs/tahap-3-pengujian-autocannon.md)
