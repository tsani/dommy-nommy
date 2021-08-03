import { google } from 'googleapis';
import fastify from 'fastify';
import fetch from 'node-fetch';
import fp from 'fastify-plugin';

// // Eventually we should make a fastify plugin that shares the google
// // auth between all the routes.
// declare module 'fastify' {
//   interface FastifyInstance {
//     googleAuth: ???
//   }
// }

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  const auth = await google.auth.getClient({
    scopes: ['https://googleapis.com/auth/spreadsheets.readonly']
  });
  console.log(auth);
  const sheets = google.sheets({ version: 'v4', auth });
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'meal-db!A2:A2',
  });

  return JSON.stringify(result);
});

async function main() {
  await app.listen(4000);
}

main().catch((e) => {
  console.error(`Fatal: ${e.stack}`);
});
