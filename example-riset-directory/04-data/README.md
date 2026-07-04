# 04 - Data

Direktori ini digunakan untuk menyimpan dataset pengujian dan data metrik hasil rekaman alat (Autocannon).

## Isi Data

- **Data Seeding**: Dataset pengguna *dummy* sejumlah 100.000 (dibangkitkan menggunakan `@faker-js/faker` dengan `seed=42`).
- **Data Eksekusi (JSON)**: Menyimpan luaran alat *load tester* (Autocannon) yang mencatat matriks RPS dan Latency dari 0 sampai 30 detik untuk pengujian PostgreSQL dan MongoDB (`hasil_eksperimen.json`).
