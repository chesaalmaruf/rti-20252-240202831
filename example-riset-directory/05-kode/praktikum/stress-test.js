const { PrismaClient } = require('@prisma/client');
const autocannon = require('autocannon');
const fs = require('fs');

const dbName = process.argv[2] || 'Database_Saat_Ini';
const prisma = new PrismaClient();

function generateHTMLChart(history) {
    const dbNames = Object.keys(history);
    const datasetsLatency = [];
    const datasetsThroughput = [];

    const colors = [
        { border: '#3498db', bg: 'rgba(52, 152, 219, 0.1)' }, // Biru
        { border: '#2ecc71', bg: 'rgba(46, 204, 113, 0.1)' }, // Hijau
        { border: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)' }, // Merah
        { border: '#f1c40f', bg: 'rgba(241, 196, 15, 0.1)' }  // Kuning
    ];

    dbNames.forEach((db, index) => {
        const c = colors[index % colors.length];
        const lSeries = history[db].latencySeries || [];
        const tSeries = history[db].throughputSeries || [];

        datasetsLatency.push({
            label: db.toUpperCase(),
            data: lSeries,
            borderColor: c.border,
            backgroundColor: c.bg,
            borderWidth: 2,
            fill: true,
            tension: 0.2, // Efek melengkung ala grafik saham
            pointRadius: 2,
            pointHitRadius: 10
        });

        datasetsThroughput.push({
            label: db.toUpperCase(),
            data: tSeries,
            borderColor: c.border,
            backgroundColor: c.bg,
            borderWidth: 2,
            fill: true,
            tension: 0.2,
            pointRadius: 2,
            pointHitRadius: 10
        });
    });

    // Karena dihitung per detik (selama 30 detik), Sumbu X selalu konstan (Detik 1-30)
    const timeLabels = Array.from({length: 30}, (_, i) => `Detik ${i+1}`);

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Visualisasi Eksperimen DBMS (Time Series)</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #0d1117; color: #c9d1d9; }
        .container { max-width: 1000px; margin: auto; background: #161b22; padding: 30px; border-radius: 10px; border: 1px solid #30363d; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
        h1 { text-align: center; color: #58a6ff; }
        p.desc { text-align: center; color: #8b949e; font-size: 14px; margin-bottom: 40px; }
        .chart-wrapper { width: 100%; height: 400px; margin-bottom: 50px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📈 Grafik Time-Series Performa Database</h1>
        <p class="desc">Memantau fluktuasi Latency dan Throughput dari detik pertama hingga akhir pengujian (30 detik).</p>
        
        <h2>1. Rata-rata Latency per Detik</h2>
        <div class="chart-wrapper">
            <canvas id="latencyChart"></canvas>
        </div>
        
        <h2>2. Throughput per Detik (RPS)</h2>
        <div class="chart-wrapper">
            <canvas id="throughputChart"></canvas>
        </div>
    </div>

    <script>
        Chart.defaults.color = '#8b949e';
        Chart.defaults.borderColor = '#30363d';

        const labels = ${JSON.stringify(timeLabels)};

        // Grafik Latency
        new Chart(document.getElementById('latencyChart'), {
            type: 'line',
            data: { labels: labels, datasets: ${JSON.stringify(datasetsLatency)} },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: { 
                    x: { title: { display: true, text: 'Waktu Pengujian (Detik)' } },
                    y: { title: { display: true, text: 'Waktu Tunggu / Latency (ms)' }, beginAtZero: true } 
                }
            }
        });

        // Grafik Throughput
        new Chart(document.getElementById('throughputChart'), {
            type: 'line',
            data: { labels: labels, datasets: ${JSON.stringify(datasetsThroughput)} },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: { 
                    x: { title: { display: true, text: 'Waktu Pengujian (Detik)' } },
                    y: { title: { display: true, text: 'Jumlah Request Berhasil (RPS)' }, beginAtZero: true } 
                }
            }
        });
    </script>
</body>
</html>`;
    
    fs.writeFileSync('grafik_hasil.html', html);
    console.log("\n[!] BERHASIL: Diagram Line Chart (Sumbu Waktu) telah diperbarui di 'grafik_hasil.html'!");
}

async function runStressTest() {
    console.log(`=== Mempersiapkan Stress Test untuk: ${dbName.toUpperCase()} ===`);
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error("Data user kosong. Harap jalankan 'npm run seed' terlebih dahulu.");
        process.exit(1);
    }
    const payload = JSON.stringify({ email: user.email, password: "password123" });
    await prisma.$disconnect();

    console.log("\n=== Memulai Stress Test ===");
    
    // Variabel Time-Series (Per Detik)
    const latencySeries = [];
    const throughputSeries = [];
    
    let currentSecondLatencies = [];
    let reqCountPerSecond = 0;
    let lastKnownLatency = 0; // Menyimpan nilai latency terakhir jika tidak ada request sukses di detik tertentu

    // Rekam data secara statis setiap 1000ms (1 Detik)
    const monitorInterval = setInterval(() => {
        // 1. Simpan Throughput (RPS) detik ini
        throughputSeries.push(reqCountPerSecond);
        reqCountPerSecond = 0;

        // 2. Simpan Rata-rata Latency detik ini
        if (currentSecondLatencies.length > 0) {
            const sum = currentSecondLatencies.reduce((a, b) => a + b, 0);
            lastKnownLatency = sum / currentSecondLatencies.length;
            currentSecondLatencies = []; // Kosongkan untuk detik berikutnya
        }
        // Masukkan rata-rata (atau nilai terakhir jika 0 request) ke grafik
        latencySeries.push(lastKnownLatency);
    }, 1000);

    const instance = autocannon({
        url: 'http://localhost:3000/api/login',
        connections: 500,
        duration: 30,
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: payload
    }, (err, result) => {
        clearInterval(monitorInterval);

        if (err) {
            console.error("Error saat melakukan stress test:", err);
            return;
        }
        
        const metrik = {
            "Rata-rata Latency (ms)": result.latency.average,
            "Latency Terlama (ms)": result.latency.max,
            "Rata-rata Throughput (RPS)": result.requests.average,
            "Total Request Sukses": result.requests.total,
            "Total Gagal / Timeout": result.timeouts + result.errors,
            "latencySeries": latencySeries, 
            "throughputSeries": throughputSeries 
        };

        let history = {};
        if (fs.existsSync('hasil_eksperimen.json')) {
            history = JSON.parse(fs.readFileSync('hasil_eksperimen.json'));
        }

        history[dbName] = metrik;
        fs.writeFileSync('hasil_eksperimen.json', JSON.stringify(history, null, 2));

        console.log("\n\n=======================================================");
        console.log("     TABEL HASIL EKSPERIMEN (OTOMATIS DARI TERMINAL)");
        console.log("=======================================================\n");
        
        const tableData = {};
        const keysToShow = ["Rata-rata Latency (ms)", "Latency Terlama (ms)", "Rata-rata Throughput (RPS)", "Total Request Sukses", "Total Gagal / Timeout"];
        
        keysToShow.forEach(mKey => {
            tableData[mKey] = {};
            Object.keys(history).forEach(dKey => {
                tableData[mKey][dKey] = history[dKey][mKey] || 0;
            });
        });

        console.table(tableData);
        generateHTMLChart(history);
    });

    // Tiap kali ada response, simpan latency-nya ke keranjang detik saat ini
    instance.on('response', (client, statusCode, resBytes, responseTime) => {
        currentSecondLatencies.push(responseTime);
        reqCountPerSecond++;
    });

    autocannon.track(instance, { renderProgressBar: true });
}

runStressTest().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
