# WS-08: Proposal Integration (UTS)

> **Bab 8 — Proposal & Checkpoint**

---

## Ringkasan Materi

### Proposal = Satu Argumen Utuh

Proposal riset bukan kumpulan bab yang independen. Ia adalah **satu argumen** yang mengalir dari masalah ke rencana solusi. Jika satu koneksi putus, seluruh proposal kehilangan koherensi.

### Integration Map — 6 Koneksi Kritis

```
Problem (Bab 2) → Gap (Bab 3) → RQ & H (Bab 4) → Metrik (Bab 5) → Sistem (Bab 6) → Eksperimen (Bab 7)
```

| Koneksi | Pertanyaan Verifikasi |
|---------|----------------------|
| Problem → Gap | Apakah gap muncul dari analisis literatur terhadap masalah? |
| Gap → RQ | Apakah RQ langsung menjawab gap yang teridentifikasi? |
| RQ → Metrik | Apakah setiap variabel di RQ punya metrik terdefinisi? |
| Metrik → Sistem | Apakah setiap metrik bisa diukur oleh komponen sistem? |
| Sistem → Eksperimen | Apakah desain eksperimen menggunakan sistem sebagai instrumen? |

### Koherensi Vertikal + Horizontal

- **Vertikal** — Alur logis atas-ke-bawah (problem → experiment). Setiap section menjawab pertanyaan yang diangkat section sebelumnya dan memunculkan pertanyaan baru.
- **Horizontal** — Konsistensi terminologi (nama variabel di RQ = di hipotesis = di metrik = di desain)

**Operasionalisasi Red Thread** (benang merah):
```
Bab 2 (Problem) → | memperkenalkan masalah X + evidensi |
                          ↓ menimbulkan pertanyaan: "apa akar gap-nya?"
Bab 3 (Gap)     → | menjawab pertanyaan tadi + membuka "lalu apa yang perlu diteliti?" |
                          ↓
Bab 4 (RQ/H)    → | menjawab gap dengan pertanyaan spesifik + prediksi terukur |
                          ↓
Bab 5-7 (Method)→ | menjawab RQ melalui desain eksperimen yang tepat |
```
Jika ada lompatan (section B tidak menjawab pertanyaan section A), red thread putus.

### Jebakan Kognitif

| Jebakan | Deskripsi |
|---------|----------|
| "Selling" Introduction | Menulis promosi, bukan menyajikan data dan gap |
| Copy-paste Methodology | Menyalin deskripsi tekstbook tanpa menyesuaikan ke RQ |
| Optimistic Timeline | Meremehkan waktu implementasi; selalu tambah buffer 30-50% |
| No Possibility of Failure | Mengimplikasikan hasil pasti sukses — proposal jujur mengakui H₀ mungkin tidak ditolak |

### Struktur Proposal

1. **Pendahuluan** — Latar belakang + problem statement (Bab 1-2)
2. **Tinjauan Pustaka** — Literature review + gap + baseline (Bab 3)
3. **RQ / Kontribusi / Hipotesis** — (Bab 4)
4. **Metodologi** — Metrik + sistem + desain eksperimen (Bab 5-7)
5. **Timeline & Output**

### Istilah Penting

- **Integration Map** — Diagram 6 koneksi kritis antar komponen proposal
- **Vertical Coherence** — Alur logis atas-ke-bawah
- **Horizontal Coherence** — Konsistensi terminologi di semua bagian
- **Checkpoint** — Titik self-assessment sebelum transisi dari desain ke eksekusi

---

## Template A.8 — Integration Checklist

### PROPOSAL INTEGRATION CHECKLIST

#### Koneksi Vertikal (Flow Atas-Bawah):
* [X] Problem → Gap: masalah terdokumentasi di literatur
* [X] Gap → RQ: pertanyaan menjawab gap spesifik
* [X] Gap → Hypothesis: hipotesis memprediksi jawaban
* [X] Hypothesis → Metric: metrik mengukur variabel dalam hipotesis
* [X] Metric → System: komponen sistem menghasilkan/mengukur metrik
* [X] System → Experiment: desain eksperimen menggunakan sistem

#### Koneksi Horizontal (Konsistensi):
* [X] Istilah sama di semua bagian
* [X] Variabel di RQ = variabel di hipotesis = metrik di desain
* [X] Scope tidak berubah dari masalah ke eksperimen

Rubrik Self-Assessment:
| Kriteria | 1 (Lemah) | 2 (Cukup) | 3 (Baik) | Skor |
|----------|-----------|-----------|----------|------|
| Koherensi |          |           |          |      |
| Specificity |        |           |          |      |
| Feasibility |        |           |          |      |
| Rigor     |          |           |          |      |


---

## Latihan 1 — Kompilasi Proposal Mini

Kumpulkan hasil dari WS-02 sampai WS-07 menjadi satu ringkasan proposal.

| Komponen | Sumber | Isi (1-2 kalimat) |
| :--- | :--- | :--- |
| **Problem Statement** | WS-02 | Lonjakan trafik *high-concurrency* pada rute login Node.js memicu pembengkakan *latency* dan degradasi *throughput*. Hal ini berakar dari perbedaan efisiensi internal pengindeksan basis data relasional (PostgreSQL) vs basis data dokumen (MongoDB) saat menghadapi beban komputasi kriptografi Bcrypt secara simultan. |
| **Gap** | WS-03 | Riset terdahulu hanya menguji operasi CRUD murni secara terisolasi (*Context Gap*). Selain itu, terdapat kontradiksi hasil pengujian data tunggal antara studi berbasis kueri mentah dengan studi berbasis ORM modern di bawah kondisi beban konkurensi tinggi (*Method Gap*). |
| **RQ** | WS-04 | Apakah penggunaan MongoDB v7.0 menghasilkan rata-rata *latency* login yang sekurang-kurangnya 20% lebih rendah dan *throughput* (*requests per second*) yang lebih tinggi secara signifikan dibandingkan dengan PostgreSQL v16 pada dataset 100.000 pengguna dengan simulasi beban 500 pengguna serentak di bawah enkapsulasi Prisma ORM pada lingkungan Node.js? |
| **Hipotesis** | WS-04 | $H_1$: $\mu_{\text{Latency MongoDB}} < 0.80 \times \mu_{\text{Latency PostgreSQL}}$ dan $\mu_{\text{Throughput MongoDB}} > \mu_{\text{Throughput PostgreSQL}}$ pada taraf signifikansi $\alpha = 0.05$. |
| **Variabel & Metrik** | WS-05 | IV = Jenis Arsitektur DBMS (PostgreSQL v16 vs MongoDB v7.0); DV = Performa autentikasi yang diukur melalui metrik *Average Response Time* (milidetik) dan *Throughput* (*Requests Per Second*). |
| **Sistem** | WS-06 | Aplikasi REST API berbasis Node.js/Express.js sebagai repositori rute `/api/login` yang menjembatani kueri ke pangkalan data PostgreSQL dan MongoDB lokal melalui satu antarmuka tunggal, yaitu Prisma ORM. |
| **Desain Eksperimen** | WS-07 | Eksperimen laboratorium terkontrol berbasis localhost dengan menyuntikkan beban 500 koneksi bersamaan selama 30 detik menggunakan Autocannon, direplikasi sebanyak 30 kali penuh pada tiap DBMS dengan instruksi kliring *query cache* via *restart service* di setiap perpindahan siklus. |

---

## Latihan 2 — Integration Checklist

Verifikasi 6 koneksi kritis. Isi dengan merujuk tabel di Latihan 1.

| Koneksi | Status | Bukti |
| :--- | :---: | :--- |
| **Problem → Gap** | ✅ | Gap muncul langsung dari evaluasi literatur (Tavares, Budiman, Pujas, Andrianto) yang menunjukkan bahwa riset terdahulu tidak menguji beban gabungan kueri-kriptografi pada skenario login. |
| **Gap → RQ** | ✅ | RQ secara eksplisit menanyakan performa komparatif kedua arsitektur DBMS menggunakan Prisma ORM pada skenario login dengan beban 500 *concurrent users*. |
| **RQ → Hypothesis** | ✅ | Hipotesis secara langsung memprediksi margin keuntungan performa MongoDB sebesar $\ge$ 20% untuk *latency* dan keunggulan *throughput* pada nilai $\alpha = 0.05$. |
| **Hypothesis → Metric**| ✅ | Metrik yang tercantum di hipotesis secara operasional diturunkan menjadi metrik *Average Response Time* (ms) dan *Requests Per Second* (RPS) pada tabel variabel. |
| **Metric → System** | ✅ | Metrik *latency* dan *throughput* akan dihasilkan dan direkam secara otomatis oleh komponen instrumentasi sistem, yaitu berkas log JSON keluaran Autocannon CLI. |
| **System → Experiment**| ✅ | Desain eksperimen menggunakan arsitektur sistem (API Node.js + Prisma) sebagai media perantara yang dimanipulasi konfigurasi `.env`-nya untuk merekam perubahan metrik. |

* **Koneksi mana yang paling lemah?** — (Seluruh koneksi bernilai kuat dan setara).
* **Bagaimana cara memperkuatnya?**
    > Koneksi dari hulu ke hilir sudah diperkuat dengan mengunci variabel pengganggu (volume data, *work factor* Bcrypt, spesifikasi hardware, dan penggunaan localhost) agar kausalitas IV ke DV bersifat murni.
* **Konsistensi horizontal — apakah istilah dan scope konsisten?** `[X] Ya` / `[ ] Tidak`
    > *Catatan:* Nama variabel, jenis DBMS, jumlah dataset (100k), dan tingkat konkurensi (500) konsisten dari Bab 1 hingga metodologi pengujian.

---

## Latihan 3 — Rubrik Self-Assessment

Evaluasi proposal mini menggunakan rubrik.

| Kriteria | Skor (1-3) | Justifikasi |
| :--- | :---: | :--- |
| **Koherensi** | 3 | Rantai logika dari *problem statement* hingga desain pengujian berulang 30 kali saling mengunci tanpa lompatan asumsi subjektif. |
| **Specificity** | 3 | Seluruh variabel, versi teknologi (PostgreSQL v16, MongoDB v7.0), metrik (ms, RPS), dan batas ambang batas (20%) didefinisikan secara numerik dan eksak. |
| **Feasibility** | 3 | Pengujian dipindahkan dari Docker ke instalan native lokal host untuk menghemat RAM komputer, menggunakan skrip otomasi *seeding* bawaan Prisma ORM. |
| **Rigor** | 3 | Desain pengujian menggunakan uji hipotesis statistik formal (*Independent Sample T-Test*) dengan pembersihan *cache* di setiap siklus untuk menjamin keabsahan data. |

* **Skor total:** **12** / 12
* **Apakah proposal siap untuk fase eksekusi?** `[X] Ya` / `[ ] Belum`
    > *Catatan:* Desain rancangan metode sudah 100% *actionable* dan siap dituangkan ke dalam baris kode program.

---

## Refleksi

* **Bagian termudah:** Mengidentifikasi variabel (IV & DV) dan menentukan metrik pengujian, karena parameter kecepatan dan kapasitas pada server *backend* sudah memiliki standar alat ukur industri yang pasti (Autocannon).
* **Bagian tersulit:** Menyelaraskan *Research Gap* dengan literatur terdahulu agar tidak terkesan mengada-ada, serta memitigasi faktor validitas internal seperti gangguan *network jitter* dan bias *query caching* pangkalan data.
* **Yang akan dilakukan berbeda:** > Jika mengulang dari awal, saya akan langsung menetapkan batas arsitektur pengujian pada jaringan lokal (*native host*) sejak awal tanpa perlu membuang waktu menganalisis kompleksitas virtualisasi menggunakan Docker Desktop yang berat bagi spesifikasi laptop.