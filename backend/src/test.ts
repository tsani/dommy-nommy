import Sheets from "node-sheets";
const fs = require("fs");
const keys = JSON.parse(fs.readFileSync("./secrets.json"));
async function main() {
  try {
    const gs = new Sheets(
      "1C6q4Y5ewclcuAkEmX-Df8kpMYBEUAAGq2wSHcdaV7oQ"
    );
    const email = keys.client_email;
    const key = keys.private_key;
    await gs.authorizeJWT(keys);
    const table = await gs.tables("meal-db!A1:E3");
    console.log(table.headers);
    console.log(table.formats);
    console.log(table.rows);
  } catch (err) {
    console.error(err);
  }
}

main();
