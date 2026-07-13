const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runBenchmark() {
    console.log("=== Memulai Pengujian Performa Database (1000 Percobaan) ===");
    
    // Ambil 1 user acak dari database untuk login
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error("Data user kosong. Harap jalankan 'npm run seed' terlebih dahulu.");
        process.exit(1);
    }
    
    console.log(`\n1. Login untuk mendapatkan Token (user: ${user.email})`);
    const loginRes = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: 'password123' })
    });
    
    const loginData = await loginRes.json();
    if (loginRes.status !== 200) {
        console.error("Gagal login:", loginData);
        process.exit(1);
    }
    const token = loginData.token;
    console.log("   Login berhasil, token didapatkan.");

    const trials = 1000;

    // --- TEST PAGE 1 ---
    console.log(`\n2. Menguji Endpoint Paginasi - Page 1 (${trials} percobaan)...`);
    let totalTimePage1 = 0;
    
    for (let i = 0; i < trials; i++) {
        const start = performance.now();
        await fetch('http://localhost:3000/api/users?page=1&limit=50', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        totalTimePage1 += (performance.now() - start);
        
        // Opsional: tampilkan progres tiap 200 iterasi agar terminal tidak sepi
        if ((i + 1) % 200 === 0) {
            console.log(`   Progres: ${i + 1}/${trials}`);
        }
    }
    
    console.log(`   --> Rata-rata Waktu Respons Page 1: ${(totalTimePage1 / trials).toFixed(2)} ms`);

    // --- TEST PAGE 1000 ---
    console.log(`\n3. Menguji Endpoint Paginasi - Page 1000 (Skip Jauh) (${trials} percobaan)...`);
    let totalTimePage1000 = 0;
    
    for (let i = 0; i < trials; i++) {
        const start = performance.now();
        await fetch('http://localhost:3000/api/users?page=1000&limit=50', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        totalTimePage1000 += (performance.now() - start);
        
        if ((i + 1) % 200 === 0) {
            console.log(`   Progres: ${i + 1}/${trials}`);
        }
    }
    
    console.log(`   --> Rata-rata Waktu Respons Page 1000: ${(totalTimePage1000 / trials).toFixed(2)} ms`);

    console.log("\n=== Pengujian Selesai ===");
    await prisma.$disconnect();
}

runBenchmark().catch(console.error);
