# Tahap 3: Pengujian Beban Menggunakan Autocannon

Alat yang dipilih untuk melakukan validasi kemampuan konkurensi dari sistem adalah **Autocannon** (berbasis Node.js), yang berfungsi mengeksekusi rentetan *request* `HTTP POST` secara simultan ke peladen.

## 1. Konfigurasi Skrip Uji (stress-test.js)

```javascript
const autocannon = require('autocannon');
const fs = require('fs');

async function runTest(dbName) {
    const result = await autocannon({
        url: 'http://localhost:3000/api/login',
        connections: 500, // Variabel Kontrol 1
        duration: 30,     // Variabel Kontrol 2
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });
    
    // Simpan hasil JSON ke log eksperimen
    const logData = { db: dbName, throughput: result.requests.average, ... };
    fs.writeFileSync(`hasil_eksperimen.json`, JSON.stringify(logData, null, 2));
}
```

## 2. Skenario Eksekusi

Prosedur uji coba yang terkalibrasi adalah sebagai berikut:
1. Jalankan `server.js` dengan koneksi ke **PostgreSQL**.
2. Jalankan `stress-test.js` dan rekam metrik performanya.
3. **PENTING (Mitigasi Bias)**: Hentikan *server*, biarkan laptop pendinginan (*cooldown*) selama 5 menit guna menghilangkan *thermal throttling*.
4. Ganti `.env` (*Database URL*) ke **MongoDB**.
5. Jalankan `server.js` kembali dan eksekusi `stress-test.js` untuk tahap kedua.

---
*Status: Selesai diuji, dilanjutkan dengan ekstraksi luaran di tahap 4.*
