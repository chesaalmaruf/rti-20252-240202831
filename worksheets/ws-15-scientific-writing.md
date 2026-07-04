# WS-15: Scientific Writing

> **Bab 15 — Penulisan Ilmiah**

---

## Ringkasan Materi

### Scientific Argument Flow

```
Problem → Gap → RQ → Method → Result → Analysis → Conclusion → Contribution
```

Paper ilmiah adalah **satu argumen utuh** dari masalah ke kontribusi. Setiap node harus terhubung logis ke node sebelum dan sesudahnya.

### Struktur IMRAD

| Section | Peran | Pertanyaan Kunci |
|---------|-------|-----------------|
| **Introduction** | Motivasi + frame | Why is this needed? |
| **Method** | Deskripsi (reproducible) | How was it done? |
| **Results** | Laporan objektif | What was found? |
| **Discussion** | Interpretasi + refleksi | What does it mean? |
| **Conclusion** | Ringkasan + kontribusi | So what? |

### Logical Flow — "Red Thread"

Setiap paragraf menjawab satu pertanyaan dan memicu pertanyaan berikutnya. Alur logis ini harus terasa di tiga level:
1. **Antar-kalimat** dalam paragraf
2. **Antar-paragraf** dalam section
3. **Antar-section** dalam paper

### Internal Consistency

Setiap elemen yang dijanjikan di Introduction harus hadir di Discussion/Conclusion.

**Consistency Matrix:**
```
           Intro  Method  Result  Discuss  Conclude
RQ1          ✓      ✓       ✓       ✓        ✓
RQ2          ✓      ✓       ✓       ✗ ←      ✓
Metrik-X     ✗      ✗       ✓ ←     ✗        ✗
```
**Masalah:** RQ2 dibahas di semua bagian kecuali Discussion. Metrik-X muncul di Result tapi tidak diperkenalkan di Method.

### Writing Quality Triad

| Kualitas | Deskripsi | Contoh Buruk → Baik |
|----------|----------|---------------------|
| **Clarity** | Dipahami sekali baca | "Performa meningkat" → "Accuracy meningkat dari 85.3% ke 89.7%" |
| **Precision** | Istilah eksak, tanpa ambiguitas | "signifikan" → "signifikan secara statistik (p=0.003, d=1.2)" |
| **Conciseness** | Setiap kata menambah informasi | Hapus kalimat redundan, filler words |

### Urutan Penulisan yang Disarankan

1. **Method & Results** — paling stabil, tulis pertama
2. **Discussion** — interpretasi berdasarkan hasil
3. **Introduction** — frame sesuai temuan aktual
4. **Abstract & Conclusion** — terakhir

### Target Jumlah Kata

| Section | Target |
|---------|--------|
| Introduction | 500–700 |
| Related Work | 700–1000 |
| Method | 800–1200 |
| Results | 500–800 |
| Discussion | 600–900 |
| Conclusion | 200–400 |

### Jebakan Kognitif

1. "Lebih panjang = lebih lengkap" → conciseness lebih berharga
2. "Introduction harus ditulis pertama" → justru ditulis terakhir
3. "Jargon teknis = lebih ilmiah" → clarity lebih penting
4. "Discussion = ringkasan Results" → Discussion = interpretasi + konteks

---

## Template A.15 — Paper Structure Checklist

```
PAPER STRUCTURE CHECKLIST

Title   : Pengaruh Jenis Arsitektur DBMS (PostgreSQL vs MongoDB) terhadap Latency dan Throughput pada Proses Autentikasi Beban Tinggi
Target  : [X] Jurnal  [ ] Konferensi  [X] Laporan

Section Check:
  [X] Abstract — masalah, metode, hasil utama, kontribusi (max 250 kata)
  [X] Introduction — konteks → gap → RQ → kontribusi → struktur paper
  [X] Related Work — concept-centric, gap positioning
  [X] Method — reproducible: desain, variabel, metrik, setup, prosedur
  [X] Results — tabel + grafik + observasi (tanpa interpretasi)
  [X] Discussion — interpretasi, perbandingan, implikasi, limitation
  [X] Conclusion — jawaban RQ, kontribusi, future work

Consistency Matrix:
  [X] RQ di Introduction = RQ di Method = RQ di Conclusion
  [X] Variabel di Method = variabel di Results
  [X] Klaim di Discussion didukung data di Results
  [X] Limitasi di Discussion di-address di Conclusion/Future Work

Writing Quality:
  [X] Clarity — mudah dipahami tanpa re-read
  [X] Precision — tidak ada istilah ambigu
  [X] Conciseness — tidak ada kalimat redundan
```

---

## Latihan 1 — Paper Outline

Buat outline paper untuk riset Anda menggunakan struktur IMRAD.

| Section | Konten Utama (2-3 kalimat) | Target Kata |
|---------|---------------------------|------------|
| Abstract | *Menguji performa PostgreSQL vs MongoDB pada autentikasi Node.js berbeban tinggi (Bcrypt). PostgreSQL unggul telak dengan 14.67 RPS berbanding 0.31 RPS. Kegagalan mayoritas disebabkan oleh CPU bottleneck di application layer.* | 200-250 |
| Introduction | *Pemilihan database NoSQL sering dianggap peluru perak untuk performa tinggi, namun efeknya pada CPU-intensive task seperti autentikasi jarang dibahas. Studi ini membandingkannya langsung di lingkungan terkontrol.* | 500-700 |
| Related Work | *Perbandingan relasional dan dokumen DB, studi beban kerja CPU-bound vs I/O bound.* | 700-1000 |
| Method | *100k data dummy, Prisma ORM, uji Autocannon 500 concurrent users selama 30 detik. Metrik: Latency, RPS.* | 800-1200 |
| Results | *Tabel performa agregat RPS (14 vs 0) dan grafik line-chart time-series timeout MongoDB.* | 500-800 |
| Discussion | *Perbedaan performa bukan berasal dari optimasi indeks DB, melainkan event-loop terblokir akibat komputasi hashing Bcrypt yang mencekik (throttle) CPU.* | 600-900 |
| Conclusion | *PostgreSQL lebih tangguh di skenario monolitik Node.js. Rekomendasi riset: memisahkan arsitektur enkripsi ke microservice terpisah.* | 200-400 |

---

## Latihan 2 — Consistency Matrix

Buat consistency matrix untuk memverifikasi internal consistency paper Anda.

|  | Intro | Method | Result | Discussion | Conclusion |
|--|-------|--------|--------|-----------|-----------|
| RQ Utama (DB mana lebih baik?) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik (RPS & Latency) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Analisis Bottleneck (CPU) | ✗ | ✗ | ✓ | ✓ | ✓ |
| Variabel Bebas (Tipe DB) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Variabel Terikat (Kinerja) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Kontribusi (Wawasan Arsitektur)| ✓ | ✗ | ✗ | ✓ | ✓ |

**Isi setiap sel:** ✓ (ada & konsisten), ✗ (missing), ~ (ada tapi inkonsisten)

**Inkonsistensi yang ditemukan:**
> Analisis `CPU Bottleneck` baru disadari dan muncul pada tahapan *Results* serta *Discussion*, padahal tidak direncanakan secara eksplisit dari awal (*Intro/Method*).

**Tindakan perbaikan:**
> Merevisi kembali bab *Introduction* dan *Method* untuk memasukkan parameter pengecekan beban CPU (*Resource Monitoring*) sebagai bagian integral dari penelitian sejak awal, sehingga alurnya lebih linear dan *consistent*.

---

## Latihan 3 — Writing Quality Check

Ambil satu paragraf dari tulisan Anda (atau tulis paragraf baru) dan evaluasi kualitasnya.

**Paragraf asli:**
> MongoDB memiliki kecepatan RPS 0.31 dan ini jelek sekali dibanding Postgres 14.67 karena laptopnya kepanasan buat ngitung password bcrypt.

| Kriteria | Evaluasi | Perbaikan |
|----------|---------|-----------|
| Clarity | *Kalimat terlalu santai (jelek sekali, kepanasan) dan terkesan tidak profesional.* | *Ganti istilah informal dengan terminologi teknis (throughput, thermal throttling).* |
| Precision | *Tidak spesifik penyebab "kepanasan"-nya.* | *Jelaskan bahwa komputasi hashing Bcrypt memakan siklus CPU tinggi.* |
| Conciseness | *Kata "ngitung" tidak tepat untuk hashing.* | *Ubah dengan frasa komputasi kriptografi.* |

**Paragraf setelah perbaikan:**
> PostgreSQL menunjukkan *throughput* rata-rata (14.67 RPS) yang signifikan lebih tinggi dibandingkan MongoDB (0.31 RPS). Observasi lebih lanjut mengindikasikan bahwa tingginya tingkat kegagalan (1.992 *timeouts*) pada sistem MongoDB disebabkan oleh pembatasan suhu prosesor (*thermal throttling*) akibat intensifnya beban komputasi kriptografi Bcrypt, bukan murni keterbatasan dari arsitektur pangkalan data itu sendiri.

---

## Refleksi

> Apa perbedaan antara menulis "tentang" riset dan menulis sebagai "argumen" riset? Bagaimana urutan penulisan (Method → Discussion → Introduction) mengubah kualitas tulisan?

> Menulis "tentang" riset sekadar melaporkan fakta (seperti buku harian lab), sedangkan menulis sebagai "argumen" riset berarti menyusun fakta-fakta tersebut untuk mempertahankan sebuah hipotesis. Dengan menulis *Method* & *Results* terlebih dahulu, kita tidak "mengarang" kesimpulan secara sepihak sebelum melihat bukti empiris yang riil, sehingga alur logika tetap berakar pada data objektif.
