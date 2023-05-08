const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "b!Nu$11092002",
    host: "localhost",
    port: 5432,
    database: "perntodo_continued"
});

module.exports = pool;