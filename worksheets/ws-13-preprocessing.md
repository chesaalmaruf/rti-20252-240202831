# WS-13: Data Preprocessing

> **Bab 13 — Preprocessing & Persiapan Data untuk Analisis**

---

## Ringkasan Materi

### Data Refinement Pipeline

```
Raw Data → Cleaning → Transformation → Normalization → Processed Data → Analysis Ready
```

Setiap tahap memiliki tujuan berbeda. **Preprocessing bukan langkah teknis biasa** — setiap keputusan preprocessing adalah keputusan riset yang bisa mengubah kesimpulan.

### Empat Prinsip Preprocessing

| Prinsip | Deskripsi |
|---------|----------|
| **Consistency** | Metode sama untuk data yang sama |
| **Transparency** | Setiap langkah terdokumentasi |
| **Reproducibility** | Orang lain bisa mengulang dengan hasil sama |
| **Minimal Distortion** | Ubah sesedikit mungkin; jika normalisasi tidak perlu, jangan lakukan |

### Cleaning Triad

| Masalah | Strategi | Risiko |
|---------|---------|--------|
| **Missing values** | | |
| — Listwise deletion | Missing < 5%, random | Data loss |
| — Mean/median imputation | Sedikit missing, dist. normal | Mengurangi variabilitas |
| — Model-based imputation | Banyak missing, pola sistematis | Introduces dependency |
| — Flag & separate | Missing karena alasan substantif | Kompleksitas analisis |
| **Duplikat** | Identifikasi → verifikasi → hapus | False positive (data mirip ≠ duplikat) |
| **Error format** | Standardisasi tipe, encoding | Kehilangan informasi saat konversi |

### Normalisasi — Kapan & Metode Mana

| Metode | Formula | Output | Sensitif Outlier? |
|--------|---------|--------|-------------------|
| Min-max | (x-min)/(max-min) | [0, 1] | Ya |
| Z-score | (x-mean)/std | Unbounded | Lebih robust |
| Robust scaling | (x-median)/IQR | Unbounded | Paling robust |

**Kunci:** Parameter normalisasi harus dihitung dari **training set saja** — bukan seluruh data. Pelanggaran = **data leakage**.

### Data Leakage Prevention

Data leakage terjadi ketika informasi dari test set "bocor" ke preprocessing:
- Normalisasi parameter dari seluruh dataset ← **SALAH**
- Cross-validation dilakukan sebelum split ← **SALAH**
- Feature selection menggunakan label test set ← **SALAH**

### Jebakan Kognitif

1. "Preprocessing cuma teknis — tidak perlu detail" → bisa ubah kesimpulan
2. "Lebih banyak preprocessing = lebih bersih = lebih baik" → over-processing distorsi data
3. "Normalisasi selalu diperlukan" → belum tentu, tergantung metode analisis
4. "Imputation sama untuk semua situasi" → strategi harus sesuai konteks

---

## Template A.13 — Preprocessing Documentation Log

```
PREPROCESSING LOG

Dataset           : Hasil log eksperimen (JSON)
Jumlah data awal  : 2 set time-series (PostgreSQL & MongoDB)

Cleaning:
| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Missing | 0           | -          | Log dihasilkan sistemis |
| Duplikat| 0           | -          | Setiap request tercatat 1 id |
| Error   | 0           | -          | Autocannon handling otomatis |

Transformation:
| Transformasi | Variabel | Detail | Alasan |
|-------------|----------|--------|--------|
| Aggregation | RPS      | Menggabungkan total req per detik | Menampilkan pergerakan kecepatan server (*time-series*) |

Normalization:
  Metode    : Tidak diterapkan
  Alasan    : Eksperimen membandingkan angka mutlak/absolut performa fisik sistem (ms, RPS). Normalisasi menghilangkan *scale* dunia nyata.
  Parameter : -

Leakage Check:
  [X] Parameter normalisasi dari training set saja (Tidak ada data leakage karena bukan model Prediksi AI/ML)
  [X] Tidak ada informasi test set dalam preprocessing
  [X] Cross-validation dilakukan setelah split

Jumlah data akhir : 2 set grafik time-series & tabel metrik absolut.
Script tersedia   : [X] Ya → path: `/praktikum/stress-test.js` | [ ] Belum
```

---

## Latihan 1 — Cleaning Plan

Periksa dataset Anda (atau dataset contoh) dan dokumentasikan masalah yang ditemukan.

| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| *Data Kosong (Missing)* | *0* | *-* | *Autocannon merekam metrik lengkap, tidak ada paket terbuang tanpa status.* |
| *Timeouts / Gagal* | *MongoDB (1992)* | *Dicatat sebagai `Total Gagal`* | *Ini adalah temuan anomali performa sesungguhnya, BUKAN data kotor yang boleh dihapus.* |

**Jumlah data sebelum cleaning:** 2 File Laporan
**Jumlah data setelah cleaning:** 2 File Laporan
**Persentase data yang hilang/berubah:** 0%

---

## Latihan 2 — Normalisasi Decision

Tentukan apakah data Anda perlu normalisasi, dan jika ya, metode apa yang tepat.

| Variabel | Range Asli | Distribusi | Outlier? | Metode Normalisasi | Alasan |
|----------|-----------|-----------|----------|-------------------|--------|
| *Throughput (RPS)* | *0.0 – 14.67* | *Variatif / Drop ke 0* | *Ya (MongoDB 0.31)* | *Tidak perlu* | *Skala metrik RPS harus dijaga apa adanya agar kecepatan aktual tergambar nyata (misal: 14 RPS vs 0.3 RPS).* |

**Apakah normalisasi diperlukan?** [ ] Ya / [X] Tidak
**Justifikasi:**
> Eksperimen ini mengukur dan membandingkan performa batas (*stress test*). Konteks satuan ukur seperti detik (s), milidetik (ms), dan *Requests per Second* (RPS) memiliki makna nyata. Menormalkan data menjadi skala `0-1` akan menghancurkan informasi kontekstual tentang seberapa lambat atau cepat sistem dalam waktu dunia nyata.

**Leakage check:**
- [X] Parameter dihitung dari training set saja (N/A)
- [X] Normalisasi diterapkan setelah train-test split (N/A)

---

## Latihan 3 — Preprocessing Report

Buat ringkasan preprocessing lengkap — dokumentasi yang cukup bagi orang lain untuk mereplikasi.

```
PREPROCESSING SUMMARY

1. Dataset: Log JSON Autocannon (praktikum stress test)
2. Data awal: 2 set run records, 5 features aggregat
3. Cleaning:
   - Missing values: 0 kasus, metode: N/A
   - Duplikat: 0 kasus, tindakan: N/A
   - Error: 0 kasus, tindakan: N/A (Timeout tidak dihitung sebagai data kotor)
4. Transformation: Konversi list respon individu menjadi pergerakan *time-series* interval 1 detik.
5. Normalisasi: Tidak diterapkan (metode), parameter dari N/A (Data mutlak dipertahankan).
6. Data akhir: 2 set array *time-series*, 5 features aggregat per DBMS.
7. Leakage check: [X] Lulus / [ ] Ada masalah
```

---

## Refleksi

> Apakah Anda pernah melakukan normalisasi "karena biasa dilakukan" tanpa mempertimbangkan apakah benar-benar diperlukan? Apa risiko over-preprocessing?

> Kadangkala normalisasi dilakukan secara "buta" karena menjadi standar di *machine learning*, tanpa mengingat bahwa metrik eksperimen sistem (*Systems Research*) seperti FPS, Latency, atau Bandwidth seringkali wajib disajikan dalam skala absolut aslinya agar dapat dipahami dan di-*benchmark* oleh pengguna (*developer* lain).
> Risiko *over-preprocessing* adalah hilangnya signifikansi praktikal. Jika latensi diubah menjadi skor normal 0-1, pembaca tidak akan tahu apakah aplikasi tersebut merespons dalam 100ms (cepat) atau 5000ms (lambat).
