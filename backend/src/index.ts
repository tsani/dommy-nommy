import fs from 'fs';

import fastify from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';

import api from './api';

async function main() {
    const sheetId = '1C6q4Y5ewclcuAkEmX-Df8kpMYBEUAAGq2wSHcdaV7oQ';
    const secrets = JSON.parse(fs.readFileSync('./secrets.json').toString());

    const app = fastify({ logger: true });
    app.register(api({ sheets: { sheetId, secrets } }));
    app.register(fastifyView, {
        engine: {
            ejs
        },
    });

    await app.listen(4000);
}

main().catch((e) => {
    console.error(`Fatal: ${e.stack}`);
});
