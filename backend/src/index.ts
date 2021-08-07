import fastify from 'fastify';
import api from './api';
import fs from 'fs';

async function main() {
    const sheetId = '1C6q4Y5ewclcuAkEmX-Df8kpMYBEUAAGq2wSHcdaV7oQ';
    const secrets = JSON.parse(fs.readFileSync('./secrets.json').toString());

    const app = fastify({ logger: true });
    app.register(api({ sheets: { sheetId, secrets } }));
    await app.listen(4000);
}

main().catch((e) => {
    console.error(`Fatal: ${e.stack}`);
});
