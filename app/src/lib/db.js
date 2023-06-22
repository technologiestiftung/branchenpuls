const pgp = require("pg-promise")();
const devMode = process.env.NODE_ENV === "development";
const settingsLocal = {
  host: process.env.NEXT_PUBLIC_DB_HOST_LOCAL,
  port: process.env.NEXT_PUBLIC_DB_PORT_LOCAL,
  database: process.env.NEXT_PUBLIC_DB_DATABASE_LOCAL,
  user: process.env.NEXT_PUBLIC_DB_USER_LOCAL,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD_LOCAL,
};
const settingProduction = {
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
};
const db = pgp(devMode ? settingProduction : settingProduction);

module.exports = db;
