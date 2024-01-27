const { Pool } = require("pg");

exports.pool1 = new Pool({
  host: "localhost",
  database: "PosApp",
  user: "postgres",
  port: "5432",
  password: "admin",
});
