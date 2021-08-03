const {JWT} = require('google-auth-library');
const google = require('googleapis').google;
const fs = require('fs');
const keys = JSON.parse(fs.readFileSync('./secrets.json'));

async function main() {
  const client = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes:['https://googleapis.com/auth/spreadsheets.readonly'],
  });
  console.log(client);

  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({url});

  const sheets = google.sheets({ version: 'v4', auth: client });
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'meal-db!A2:A2',
  });

  console.log(res.data);
}

main().catch(console.error);
