const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "ibnu",
  host: "localhost",
  port: 5432,
  database: "todopern",
});

module.exports = pool;
