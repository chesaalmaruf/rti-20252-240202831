const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
// Mengunci Random Seed agar data dummy yang dihasilkan selalu sama (Reproducibility)
faker.seed(42);

async function main() {
    console.log('=== Memulai Proses Seeding 100.000 Data User ===');

    // Enkripsi password dummy konstan dengan 10 putaran salt (Bcrypt default)
    const passwordHash = await bcrypt.hash('password123', 10);

    const totalData = 100000;
    const batchSize = 5000; // Dibagi per batch agar RAM 8GB laptop Bos tetap aman dan tidak overload

    for (let i = 0; i < totalData; i += batchSize) {
        const usersBatch = [];

        for (let j = 0; j < batchSize; j++) {
            usersBatch.push({
                email: faker.internet.email().toLowerCase(),
                password: passwordHash,
            });
        }

        // Memasukkan data secara massal per batch
        await prisma.user.createMany({
            data: usersBatch,
            skipDuplicates: true
        });

        console.log(`Berhasil memasukkan ${i + usersBatch.length} data...`);
    }

    console.log('=== Proses Seeding Selesai Sukses! ===');
}

main()
    .catch((e) => {
        console.error('Terjadi error saat seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });