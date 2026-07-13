# Tahap 5: Penyusunan Draf Paper Jurnal

Dokumen ini merangkum penyusunan naskah penelitian berstruktur IMRAD untuk dipublikasikan, dirangkum dari Lembar Kerja (Worksheet 15).

## 1. Metadata Publikasi

**Judul Draft:** Analisis Performa Komparatif Antara PostgreSQL dan MongoDB pada Sistem Autentikasi Node.js dalam Kondisi High-Concurrency
**Potensi Outlet:** 

## 2. Draf Abstrak

Menguji performa PostgreSQL vs MongoDB pada autentikasi Node.js berbeban tinggi (Bcrypt). Secara keseluruhan, PostgreSQL unggul telak dengan *throughput* sebesar 14.67 RPS berbanding MongoDB dengan hanya 0.31 RPS. Analisis data lebih dalam menemukan bahwa kegagalan (1.992 timeouts) pada MongoDB didominasi oleh fenomena CPU bottleneck (*thermal throttling*) di *application layer*, yang menghambat *event-loop*, bukan keterbatasan arsitektur pangkalan data. Temuan ini menyarankan pemisahan (*decoupling*) fungsi kriptografi dari server logika pusat (*microservices*).

## 3. Matriks Konsistensi IMRAD

| Komponen | Abstract | Intro | Method | Result | Discussion | Conclusion |
|--|---|---|---|---|---|---|
| **RQ Utama (DB mana lebih baik?)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Metrik (RPS & Latency)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Analisis Bottleneck (CPU)** | ✓ | ✓ | ~ | ✓ | ✓ | ✓ |

*(Catatan: Ada sedikit inkonsistensi historis di mana Analisis Bottleneck tidak sepenuhnya direncanakan dari tahap metodologi awal, namun temuan eksploratif ini telah diintegrasikan menjadi kontribusi utama).*

---
*Status: Penulisan Draf Selesai (Naskah Penuh siap untuk diekspor ke folder 08-Laporan).*
