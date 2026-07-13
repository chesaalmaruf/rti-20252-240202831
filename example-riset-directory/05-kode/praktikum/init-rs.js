const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017/?directConnection=true";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("admin");
        
        // Initiate replica set
        const result = await db.command({ replSetInitiate: {
            _id: "rs0",
            members: [{ _id: 0, host: "localhost:27017" }]
        }});
        
        console.log("Replica Set berhasil diinisialisasi:", result);
    } catch (e) {
        if (e.codeName === 'AlreadyInitialized') {
            console.log("Replica Set sudah terinisialisasi sebelumnya.");
        } else {
            console.error("Gagal menginisialisasi:", e);
        }
    } finally {
        await client.close();
    }
}

main();
