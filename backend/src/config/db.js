const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "foodapp",
  password: "Admin@12345",
  port: 5432
});

module.exports = pool;