const fs = require('fs');
const { execSync } = require('child_process');

// Ambil pilihan dari terminal, misal: node switch-db.js mongodb
const choice = process.argv[2]?.toLowerCase();

if (choice !== 'postgres' && choice !== 'mongodb') {
    console.error("❌ Pilihan tidak valid!");
    console.error("Gunakan perintah: node switch-db.js postgres");
    console.error("           Atau : node switch-db.js mongodb");
    process.exit(1);
}

console.log(`\n⏳ Mengubah konfigurasi project menjadi: ${choice.toUpperCase()}...`);

// 1. UPDATE FILE .env
let envContent = fs.readFileSync('.env', 'utf-8');
const pgUrl = 'DATABASE_URL="postgresql://enterprisedb:admin123@localhost:5444/db_autentikasi?schema=public"';
const mongoUrl = 'DATABASE_URL="mongodb://localhost:27017/db_autentikasi"';

if (choice === 'postgres') {
    // Nyalakan Postgres, matikan Mongo
    envContent = envContent.replace(new RegExp(`^#?\\s*${pgUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm'), pgUrl);
    envContent = envContent.replace(new RegExp(`^#?\\s*${mongoUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm'), `#${mongoUrl}`);
} else if (choice === 'mongodb') {
    // Nyalakan Mongo, matikan Postgres
    envContent = envContent.replace(new RegExp(`^#?\\s*${mongoUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm'), mongoUrl);
    envContent = envContent.replace(new RegExp(`^#?\\s*${pgUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm'), `#${pgUrl}`);
}
fs.writeFileSync('.env', envContent);
console.log("✔️  File .env berhasil diperbarui.");

// 2. UPDATE FILE prisma/schema.prisma
let schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf-8');
if (choice === 'postgres') {
    schemaContent = schemaContent.replace(/provider\s*=\s*"mongodb"/, 'provider = "postgresql"');
    schemaContent = schemaContent.replace(/id\s+String\s+@id\s+@default\(auto\(\)\)\s+@map\("_id"\)\s+@db\.ObjectId/, 'id        Int      @id @default(autoincrement())');
} else if (choice === 'mongodb') {
    schemaContent = schemaContent.replace(/provider\s*=\s*"postgresql"/, 'provider = "mongodb"');
    schemaContent = schemaContent.replace(/id\s+Int\s+@id\s+@default\(autoincrement\(\)\)/, 'id        String   @id @default(auto()) @map("_id") @db.ObjectId');
}
fs.writeFileSync('prisma/schema.prisma', schemaContent);
console.log("✔️  File schema.prisma berhasil diperbarui.");

// 3. GENERATE PRISMA CLIENT
console.log("⏳ Melakukan sinkronisasi engine Prisma (npx prisma generate)...");
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
    console.error("❌ Gagal men-generate Prisma Client. Pastikan server Anda (npm start) sedang dimatikan.");
    process.exit(1);
}

console.log(`\n✅ SELESAI! Konfigurasi project telah sukses dipindah ke ${choice.toUpperCase()}.`);
console.log(`\nLangkah selanjutnya yang perlu Anda lakukan:`);
console.log(`1. Jalankan server API (ketik: npm start)`);
console.log(`2. Buka terminal baru dan jalankan tes (ketik: node stress-test.js ${choice.toUpperCase()})`);
