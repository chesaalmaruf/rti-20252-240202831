# WS-03: Literature Mapping & Gap

> **Bab 3 — Literature Review, Research Gap & Baseline**

---

## Ringkasan Materi

### Literature Review = Positioning, Bukan Ringkasan

Literature review bukan merangkum paper satu per satu. Pendekatan yang benar adalah **concept-centric** — organisasi berdasarkan tema, metode, atau variabel. Tujuan: menemukan **pola, kontradiksi, dan gap**.

### Empat Jenis Research Gap

| Jenis Gap | Deskripsi | Contoh |
|-----------|----------|--------|
| **Performance Gap** | Performa belum memadai | Akurasi deteksi hanya 78% pada kasus tertentu |
| **Method Gap** | Pendekatan belum diterapkan | Belum ada yang pakai transformer untuk task ini |
| **Data Gap** | Dataset terbatas/tidak representatif | Semua studi pakai dataset sintetis |
| **Context Gap** | Belum diuji pada konteks berbeda | Belum ada evaluasi di negara berkembang |

Gap terkuat = kombinasi 2+ jenis.

### Systematic Search Strategy

1. **Database**: IEEE Xplore, ACM DL, Scopus, Google Scholar
2. **Boolean query** yang terdokumentasi eksplisit
3. **Snowballing**: backward (telusuri referensi) + forward (cari yang mengutip)
4. Klaim "belum ada penelitian" harus didukung **bukti pencarian**

### Baseline Selection — 3 Kriteria

| Kriteria | Pertanyaan |
|----------|-----------|
| **Relevan** | Apakah menyelesaikan masalah yang sama? |
| **Representatif** | Apakah mewakili common practice? |
| **State-of-the-Art** | Apakah terbaru/terbaik? |

Membandingkan deep learning 2024 dengan decision tree sederhana tanpa justifikasi = **straw man comparison** (perbandingan tidak jujur).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan baca literatur | Mencari solusi yang sudah ada | Memahami apa yang belum terjawab |
| Cara membaca paper | Tutorial, how-to | Metode, limitasi, gap |
| Baseline | Framework terpopuler | State-of-the-art yang rigorous |
| Dokumentasi pencarian | Tidak diperlukan | Wajib (reproducible) |

### Istilah Penting

- **Concept-centric** — Organisasi literatur berdasarkan konsep/metode, bukan per penulis
- **Snowballing** — Backward (telusuri referensi) + Forward (cari yang mengutip paper kunci)
- **Research Position** — Pernyataan eksplisit posisi riset terhadap studi sebelumnya
- **Straw man comparison** — Memilih baseline lemah agar metode sendiri terlihat lebih baik

---

## Template A.3 — Literature Mapping & Gap Identification

```
RQ-CONTRIBUTION-HYPOTHESIS

Gap Statement  : Meskipun penelitian sebelumnya telah membandingkan performa database, terdapat kesenjangan dalam pengujian statistik yang ketat untuk data yang tidak terdistribusi normal pada aplikasi kesehatan mobile. Mayoritas riset hanya berfokus pada efisiensi tanpa membuktikan secara signifikan apakah perbedaan waktu respons tersebut benar-benar nyata (significant) pada operasi CRUD dasar untuk skema data nutrisi balita.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah terdapat perbedaan waktu respons yang signifikan secara statistik antara Firebase Realtime Database dan MySQL Database saat melakukan operasi CRUD (Create, Read, Update, Delete) pada aplikasi mobile "Toddlers Daily Nutritional Needs"?
  Variabel IV  : Jenis Database Management System (Firebase Realtime Database vs MySQL Database).
  Variabel DV  : Performa waktu respons (Response Time).
  Metrik       : Milidetik (ms).
  Dataset      : 50 kali iterasi eksperimen per batch operasi pada rentang 1 hingga 3.000 rekaman data nutrisi.
  Baseline     : Performa MySQL Database sebagai standar RDBMS yang umum digunakan.

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Bukti empiris melalui uji Wilcoxon Signed-Rank bahwa Firebase memiliki performa waktu respons yang lebih unggul dibandingkan MySQL untuk aplikasi mobile dengan skema data sederhana.
  Jenis kontribusi        : [x] Comparison  [ ] Improvement  [ ] Novel approach
  Gap yang diisi          : Mengisi celah perbandingan performa antara database NoSQL cloud-hosted dan SQL tradisional pada platform Android 9.0 untuk data kesehatan masyarakat.

Hypothesis Pair:
  H₀ : Performa waktu respons Firebase Realtime Database dalam melakukan operasi CRUD lebih buruk daripada atau sama dengan MySQL Database.
  H₁ : Performa waktu respons Firebase Realtime Database dalam melakukan operasi CRUD lebih baik daripada MySQL Database.
  Threshold              : p-value < 0.05
  Justifikasi threshold  : Nilai alpha 0.05 adalah standar emas dalam penelitian komputasi untuk menolak hipotesis nol dengan tingkat kepercayaan 95%.
```

---
# WS-05: Variabel & Metrik

---

## Latihan 1 — Operationalization Chain

**RQ:** Apakah Firebase Realtime Database memberikan waktu respons yang secara signifikan lebih cepat dibandingkan MySQL Database pada operasi CRUD di aplikasi "Toddlers Daily Nutritional Needs"?

| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
| Jenis DBMS | IV | Arsitektur penyimpanan data | Firebase vs MySQL | Nominal | — |
| Kecepatan Sistem | DV | Efisiensi waktu akses | Response Time (Waktu Respons) | Ratio | Milidetik (ms) |
| Beban Data | CV | Volume pemrosesan | Jumlah rekaman data (1 - 3.000) | Ratio | Rekaman (Records) |
| Operasi Basis Data | CV | Standar interaksi data | Fungsi CRUD (Create, Read, Update, Delete) | Nominal | — |

**Apakah ada lompatan logis dalam rantai?** [ ] Ya / [x] Tidak
> Rantai sudah selaras karena "Kecepatan Sistem" secara teknis diukur melalui durasi waktu respons dari saat permintaan dikirim hingga diterima kembali oleh server.

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik DV (Response Time) yang dipilih di Latihan 1 menggunakan 3 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | 5 | Waktu respons adalah indikator utama untuk mengukur kinerja DBMS dalam menangani permintaan aplikasi. |
| Sensitive | 5 | Pengukuran dalam milidetik mampu menangkap perbedaan performa yang sangat kecil sekalipun di antara kedua database. |
| Feasible | 5 | Data waktu respons sangat mudah dikumpulkan secara otomatis melalui log sistem selama eksperimen CRUD berlangsung. |

**Apakah perlu secondary metric?** [x] Ya / [ ] Tidak
> Jika ya, apa dan mengapa? **Resource Usage (CPU/RAM).** Karena database yang cepat namun mengonsumsi memori klien yang terlalu besar dapat membebani perangkat mobile pengguna.

**Contoh kasus ceiling effect untuk metrik ini:**
> Jika jaringan internet yang digunakan sangat lambat (misalnya di bawah 128 kbps), perbedaan kecepatan antara Firebase dan MySQL mungkin tidak akan terlihat karena keduanya sama-sama tertahan oleh batasan kecepatan jaringan (*network bottleneck*).

---

## Latihan 3 — Data Quality Check

Evaluasi 4 dimensi kualitas data berdasarkan eksperimen individu:

| Dimensi | Pertanyaan | Jawaban & Strategi Mitigasi |
|---------|-----------|------------------|
| Completeness | *Apakah semua data point terkumpul?* | Risiko kehilangan data log jika sistem crash saat batch 3.000 data. **Mitigasi:** Menggunakan skrip otomatis yang menyimpan hasil setiap iterasi langsung ke file lokal secara berkala. |
| Consistency | *Apakah ada kontradiksi internal?* | Variasi waktu respons akibat fluktuasi jaringan selama 50 kali pengulangan. **Mitigasi:** Melakukan pengujian pada lingkungan jaringan yang terkontrol dan menggunakan nilai rata-rata (mean) dari 50 iterasi untuk stabilitas data. |
| Validity | *Apakah benar-benar mengukur yang dimaksud?* | Waktu respons mungkin tercampur dengan waktu pemrosesan UI di Android. **Mitigasi:** Mengukur waktu eksekusi murni pada level kode backend/database listener, bukan dari sisi antarmuka pengguna. |
| Representativeness | *Apakah sampel mewakili populasi target?* | Beban 3.000 data mungkin terlalu kecil untuk aplikasi skala nasional. **Mitigasi:** Menegaskan dalam limitasi penelitian bahwa hasil ini berlaku untuk penggunaan skala menengah atau aplikasi pemantauan gizi lokal. |

---

## Refleksi

> Mengapa memilih metrik setelah melihat data dianggap p-hacking? Apa bedanya dengan eksplorasi data yang sah?

**Jawaban:**
> Memilih metrik setelah melihat data dianggap p-hacking karena peneliti cenderung hanya akan memilih metrik yang menunjukkan hasil "menang" atau "signifikan" bagi metode yang didukungnya. Hal ini merusak objektivitas riset karena hasil yang dilaporkan bukan merupakan hasil uji hipotesis yang jujur, melainkan hasil pencarian paksa atas statistik yang terlihat bagus.
> 
> Perbedaannya dengan eksplorasi data yang sah terletak pada pelaporannya. Eksplorasi data bertujuan untuk menemukan pola baru tanpa klaim pembuktian awal. Jika dalam eksplorasi ditemukan metrik baru yang menarik, hal tersebut harus dilaporkan sebagai "temuan tambahan" atau "saran riset mendatang", bukan diklaim sebagai tujuan utama penelitian yang sudah direncanakan dari awal.