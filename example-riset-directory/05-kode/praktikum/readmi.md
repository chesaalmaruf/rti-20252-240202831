# Pengujian Migrasi PostgreSQL ke MongoDB dengan Prisma

Proyek ini bertujuan untuk melakukan pengujian dan simulasi migrasi database dari **PostgreSQL** ke **MongoDB** menggunakan **Prisma ORM**. Pengujian ini melibatkan pembuatan 100.000 data pengguna (*dummy users*) untuk mengevaluasi performa dan proses migrasi.

## 🚀 Fitur dan Skenario
1. **Seeding Data Besar**: Memasukkan 100.000 data pengguna (email unik & password yang di-hash dengan bcrypt) secara *batch* agar tidak membebani memori (RAM).
2. **Prisma ORM**: Menggunakan Prisma sebagai penghubung dan pengelola skema database.
3. **Skenario Migrasi**: Skema saat ini menggunakan PostgreSQL, dan akan diubah ke MongoDB pada tahap pengujian selanjutnya.

## 🛠️ Teknologi yang Digunakan
- Node.js
- Prisma ORM (`@prisma/client`)
- PostgreSQL (Tahap Awal)
- MongoDB (Target Migrasi)
- Faker.js (Untuk generate data dummy)
- Bcrypt (Untuk hashing password)

## 📦 Instalasi

1. Clone repositori atau buka folder proyek ini.
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Sesuaikan file `.env` dengan kredensial database PostgreSQL Anda:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/nama_database?schema=public"
   ```
4. Lakukan sinkronisasi skema Prisma ke database:
   ```bash
   npx prisma db push
   ```
   *(Catatan: Anda juga bisa menggunakan `npx prisma migrate dev`)*

## 🌱 Seeding Data

Untuk memasukkan 100.000 data *dummy* ke dalam database, jalankan perintah berikut:

```bash
npm run seed
```
Skrip ini akan memasukkan data dalam kelompok (*batch*) sebanyak 5.000 baris per eksekusi untuk menjaga kestabilan memori.

## 📝 Langkah Selanjutnya (TODO)
- [x] Membuat file `server.js` untuk membuat endpoint API (Express.js, JWT) sesuai dengan yang terdaftar di `package.json`.
- [x] Mengubah `provider` di `prisma/schema.prisma` menjadi `"mongodb"`.
- [x] Menyesuaikan model `User` di skema Prisma agar kompatibel dengan tipe data MongoDB (misal: `ObjectId`).
- [x] Melakukan pengujian performa query pada MongoDB setelah migrasi selesai.