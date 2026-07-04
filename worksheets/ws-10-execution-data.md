# WS-10: Experiment Execution & Data Collection

> **Bab 10 — Eksekusi Eksperimen & Pengumpulan Data**

---

## Ringkasan Materi

### Experiment Execution Pipeline

```
Design → Execution Plan → Controlled Execution → Data Collection → Data Logging → Dataset for Analysis
```

### Multiple Run = Non-Negotiable

Single run **tidak pernah cukup** untuk klaim ilmiah. Minimum 5-10 run per skenario dengan seed berbeda. Multiple run menghasilkan:
- Mean, std, confidence interval
- Distribusi hasil → uji statistik
- Variabilitas → error bar di grafik

### Execution Plan

Setiap eksperimen harus memiliki plan sebelum eksekusi:
- Daftar skenario
- Jumlah run per skenario
- Random seed per run (pre-determined!)
- Urutan eksekusi (randomisasi/counterbalancing)
- Pre-execution checklist

### Data Logging Komprehensif

Setiap run menghasilkan log terstruktur:
1. **Identitas** — Run ID, timestamp, skenario
2. **Konfigurasi** — Semua parameter, seed, code version
3. **Hasil** — Semua metrik, output detail
4. **Metadata** — Waktu eksekusi, resource usage, warning/error

Format: CSV/JSON/database — **bukan stdout yang di-copy-paste**.

### Engineering vs Research Execution

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Run | Sekali (deploy) | Multiple (min 5-10, seed berbeda) |
| Logging | Error log, access log | Semua parameter, metrik, metadata |
| Anomali | Bug → fix → redeploy | Investigasi → dokumentasi → analisis |
| Urutan | Tidak penting | Bisa bias — perlu randomisasi |

### Anomali = Dokumentasi, Bukan Hapus

Run gagal/anomali tidak boleh dihapus tanpa dokumentasi. Bisa jadi:
- **Bug** → fix & re-run (dokumentasikan!)
- **Batas kemampuan metode** → DNF = temuan
- **Data yang bias** jika hanya simpan run "berhasil"

### Jebakan Kognitif

1. "Satu angka cukup" → tanpa distribusi, tidak bisa diuji
2. "Seed tidak penting" → bahkan algoritma deterministik bisa dipengaruhi library stokastik
3. "Run gagal langsung hapus" → kehilangan temuan potensial
4. "Semua run harus hari ini" → thermal throttling, fatigue

---

## Template A.10 — Execution Plan & Data Log

```
EXECUTION PLAN

| Run # | Skenario | Seed | Parameter | Status | Waktu | Output File |
|-------|----------|------|-----------|--------|-------|-------------|
| 1     |          |      |           |        |       |             |
| 2     |          |      |           |        |       |             |
| 3     |          |      |           |        |       |             |
| ...   |          |      |           |        |       |             |

Jumlah runs per skenario : ____
Total runs               : ____

DATA LOG (per run):
  Run ID    : ____________________
  Timestamp : ____________________
  Skenario  : ____________________
  Input     : ____________________
  Output    : ____________________
  Anomali   : ____________________
  Catatan   : ____________________
```

---

## Latihan 1 — Execution Plan

Susun execution plan untuk eksperimen Anda. Tentukan skenario, jumlah run, dan seed sebelum eksekusi.

| Run # | Skenario | Seed | Parameter Kunci | Status |
|-------|----------|------|----------------|--------|
| 1 | PostgreSQL, Beban 500 | 42 | c=500, d=30s | Selesai |
| 2 | PostgreSQL, Beban 500 | 42 | c=500, d=30s | Selesai |
| 3 | PostgreSQL, Beban 500 | 42 | c=500, d=30s | Selesai |
| 4 | MongoDB, Beban 500 | 42 | c=500, d=30s | Selesai |
| 5 | MongoDB, Beban 500 | 42 | c=500, d=30s | Selesai |
| 6 | MongoDB, Beban 500 | 42 | c=500, d=30s | Selesai |

**Total skenario:** 2 (PostgreSQL dan MongoDB)
**Run per skenario:** 3
**Total run keseluruhan:** 6

---

## Latihan 2 — Data Log Terstruktur

Desain format data log untuk eksperimen Anda. Tentukan field apa saja yang akan dicatat.

**Identitas:**
| Field | Contoh |
|-------|--------|
| Run ID | *run-pg-001* |
| Timestamp | *2026-07-04T10:30:00* |
| Skenario | *PostgreSQL - 500 Concurrent* |

**Konfigurasi:**
| Field | Contoh |
|-------|--------|
| Seed | *42 (Dataset)* |
| Code version | *Praktikum v1.0.0* |
| Hyperparameter| *c=500, d=30s* |

**Hasil:**
| Metrik | Tipe Data | Range Valid |
|--------|----------|-------------|
| Rata-rata Latency (ms) | float | 0.0 – >10000.0 |
| Rata-rata Throughput (RPS) | float | 0.0 – >100.0 |
| Total Request Sukses | int | 0 - >1000 |
| Total Gagal / Timeout | int | 0 - >2000 |
| latencySeries | array(float) | Deret waktu (Time-series) |

**Format output:** [ ] CSV / [X] JSON / [ ] Database / [ ] Lainnya: ____

---

## Latihan 3 — Anomaly Protocol

Rencanakan bagaimana menangani anomali. Untuk setiap jenis, tentukan langkah yang diambil.

| Jenis Anomali | Contoh | Tindakan |
|---------------|--------|----------|
| Run gagal (crash) | Node.js Out of Memory atau Prisma Crash | Hentikan server (Ctrl+C), kill task, catat di log, ulangi dari awal. |
| Hasil ekstrem | Total gagal 1992 requests (MongoDB) | Indikasi Thermal Throttling. Hentikan eksekusi, biarkan CPU cooldown 5 menit, ulangi eksekusi. |
| Waktu eksekusi anomali | Autocannon *hang* / *stuck* | Cek service DBMS (Postgres/Mongo) di Windows Services, restart service. |
| Inkonsistensi dengan run lain | RPS drop drastis pada run ke-3 | Periksa *background process* (Windows Update/Defender Scan), matikan, re-run. |

**Prinsip:** Detect → Investigate → Document → Decide

---

## Refleksi

> Pernahkah Anda melaporkan hasil riset/tugas dari single run? Apa risikonya? Bagaimana multiple run mengubah kepercayaan terhadap hasil?

**Pengaruh single run:**
> Pada praktikum pengujian awal, kami hanya menjalankan tes 1 kali per database berurutan. Hasilnya MongoDB sangat buruk (4 sukses, 1992 gagal). Kemungkinan hal ini dipengaruhi oleh *thermal throttling* CPU karena dilakukan pasca-uji PostgreSQL, sehingga hasil single run ini sangat rawan bias dan tidak adil bagi MongoDB.

**Yang akan dilakukan berbeda:**
> Melakukan minimal 3 putaran (*multiple runs*) untuk setiap skenario dengan menyisipkan waktu jeda istirahat (*cooldown phase*) 3-5 menit antar putaran. Dengan begitu, stabilitas suhu dan performa komputasi akan sama rata (*fair*) bagi tiap pengujian.
