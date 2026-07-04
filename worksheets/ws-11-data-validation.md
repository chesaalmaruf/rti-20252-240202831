# WS-11: Data Validation & Integrity

> **Bab 11 — Validasi Data & Integritas**

---

## Ringkasan Materi

### Data Trust Model

```
Raw Data → Data Cleaning → Consistency Check → Validation Process → Trusted Data
```

Data mentah belum bisa dipercaya. Harus melewati pipeline validasi sebelum siap untuk analisis statistik.

### Empat Pilar Data Quality

| Pilar | Deskripsi | Contoh Pelanggaran |
|-------|----------|-------------------|
| **Accuracy** | Nilai dalam range masuk akal | Akurasi = 1.5 (di luar [0,1]) |
| **Consistency** | Format seragam di semua run | Run 1: CSV, Run 2: JSON |
| **Completeness** | Tidak ada data hilang dari plan | 97 dari 100 run tercatat |
| **Validity** | Data sesuai desain eksperimen | Parameter baseline tercampur treatment |

### Proses Validasi Progresif

1. **Format validation** — Tipe file, header, kolom
2. **Range validation** — Nilai dalam batas logis
3. **Consistency validation** — Format seragam antar-run
4. **Logic validation** — Data cocok dengan desain eksperimen

Jika gagal di langkah awal → tidak perlu lanjut.

### Anomaly Detection — 3 Jenis

| Jenis | Deskripsi | Deteksi |
|-------|----------|---------|
| **Statistical outlier** | Nilai di luar distribusi normal | IQR: < Q1-1.5×IQR atau > Q3+1.5×IQR |
| **Contextual anomaly** | Normal absolut, abnormal dalam konteks | Run 1-10: ~91%, Run 11-20: ~88% |
| **Pattern anomaly** | Pola sistematis (bukan random) | Performa menurun berurutan |

**Prinsip:** Detect → Investigate → Document → Decide — **JANGAN langsung hapus.**

### Engineering vs Research Validation

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan | Data sesuai spesifikasi bisnis | Data layak untuk analisis statistik |
| Missing data | Impute / set default | Investigasi penyebab → dokumentasi |
| Outlier | Bug → fix | Mungkin temuan → investigasi |
| Dokumentasi | Minimal (log error) | Komprehensif (anomali + keputusan) |

### Jebakan Kognitif

1. "Logging otomatis ≠ data benar" → bisa ada bug di logger
2. "Outlier = hapus" → bisa jadi temuan penting
3. "Dataset kecil tidak perlu validasi" → justru lebih rentan
4. "Mean normal = data benar" → [94, 95, 93, **44**, 94] → mean 84% terlihat wajar

---

## Template A.11 — Data Validation Checklist

```
DATA VALIDATION CHECKLIST

Completeness:
  [X] Semua skenario tercakup
  [X] Jumlah run sesuai rencana
  [X] Tidak ada file output hilang
  Missing: 0 dari 6 data points

Format Consistency:
  [X] Semua file format sama (JSON laporan eksperimen)
  [X] Header konsisten
  [X] Tipe data konsisten (numerik tetap numerik)

Range & Logic:
  [X] Nilai dalam range masuk akal
  [X] Tidak ada waktu negatif
  [X] Metrik throughput dan latency tidak di luar range fisik
  Anomali ditemukan: Throughput MongoDB anjlok ekstrim (0.31 RPS) akibat *CPU Thermal Throttling*.

Cross-Validation:
  [X] Run identik → hasil mendekati
  [X] Trend konsisten dengan ekspektasi (CPU 100% memicu timeout)

Keputusan:
  [X] Data siap analisis
  [ ] Perlu cleaning
  [ ] Perlu re-run
```

---

## Latihan 1 — Completeness Check

Verifikasi apakah semua data yang direncanakan sudah terkumpul.

| Skenario | Run Direncanakan | Run Tercatat | Missing | Alasan |
|----------|-----------------|-------------|---------|--------|
| *PostgreSQL (c=500)* | *3* | *3* | *0* | *Data terekam penuh via Autocannon* |
| *MongoDB (c=500)* | *3* | *3* | *0* | *Data terekam penuh via Autocannon* |

**Total expected:** 6 | **Total actual:** 6 | **Missing:** 0

**Keputusan untuk data missing:**
> Tidak ada data *missing*. Semua data log telah diekstrak sukses ke dalam format JSON.

---

## Latihan 2 — Anomaly Investigation

Periksa data Anda untuk anomali. Gunakan metode IQR atau z-score.

**Dataset sampel (atau data Anda sendiri):**

| Run | MongoDB Throughput (RPS) |
|-----|-------------|
| 1 | *0.31* |
| 2 | *0.25* |
| 3 | *0.30* |
| 4 | *14.67 (Postgres)* |
| 5 | *14.50 (Postgres)* |

**Deteksi outlier (Konteks Eksperimen MongoDB):**
- Nilai MongoDB terlalu ekstrim mendekati 0 jika dibandingkan dengan PostgreSQL (14.67 RPS). Ini adalah *contextual anomaly*.

**Investigasi (untuk setiap outlier):**

| Outlier | Nilai | Kemungkinan Penyebab | Keputusan |
|---------|-------|---------------------|-----------|
| *Throughput Mongo Drop* | *0.31 RPS* | *CPU laptop mencapai batas thermal throttling dari pengujian Bcrypt di run sebelumnya, menyebabkan event-loop Node.js terhambat massal.* | *Analisis batas perangkat (Boundary condition), tambahkan mitigasi jeda istirahat (cooldown) antar run 5 menit.* |

---

## Latihan 3 — Validation Report

Buat laporan validasi ringkas untuk dataset eksperimen Anda.

**1. Completeness:** 100% data terkumpul
**2. Format:** [X] Konsisten / [ ] Ada inkonsistensi: -
**3. Range check (anomali):** Ditemukan performa ekstrim rendah pada MongoDB yang dipicu oleh CPU bottleneck (*Application Layer*), bukan murni dari kendala *Database Layer*.
**4. Logic check:** [X] Parameter sesuai plan / [ ] Ada ketidaksesuaian: -

**Kesimpulan:** [X] Data siap analisis / [ ] Perlu tindakan: Lanjutkan ke interpretasi kegagalan (*failure analysis*).

---

## Refleksi

> Apa perbedaan antara "data yang benar" dan "data yang dipercaya"? Mengapa proses validasi formal diperlukan meskipun data dikumpulkan secara otomatis?

> "Data yang benar" adalah data yang dicatat secara akurat oleh sistem (misalnya: tercatat 1992 *timeouts* dengan tepat tanpa ada log yang korup). Sedangkan "Data yang dipercaya" adalah data yang telah diyakini tidak terkontaminasi variabel perancu eksternal yang merusak validitasnya (misal: *timeout* terjadi murni dari kemampuan DBMS, bukan gara-gara laptop mendadak menjalankan *Windows Update* atau *thermal throttling*).
> Proses validasi menjembatani data mentah agar konteksnya ditelaah terlebih dahulu sebelum ditarik menjadi kesimpulan buta.
