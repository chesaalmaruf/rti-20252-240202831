# Tahap 2: Implementasi Server (Node.js & Prisma)

Pada tahap ini, kita mengimplementasikan server autentikasi (`server.js`) yang menginisiasi *endpoint* untuk digunakan dalam eksperimen.

## 1. Konfigurasi Server (Express.js)

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Operasi Kriptografi Sinkron yang sangat membebankan CPU
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
        
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 2. Kompleksitas Hashing

Fungsi inti yang diuji dalam API ini adalah `bcrypt.compare()`. Dengan 10 *salt rounds*, evaluasi *password* memakan waktu substansial dari siklus CPU. Karena Node.js *single-threaded*, ketika ratusan request masuk secara instan, *event-loop* akan kesulitan melayani koneksi database baru jika antrian *hashing* menumpuk.

---
*Status: Selesai diimplementasikan (lihat tahap 3 untuk integrasi dengan penguji beban).*
