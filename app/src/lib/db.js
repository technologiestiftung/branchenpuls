const pgp = require("pg-promise")();
const db = pgp({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
});

module.exports = db;
