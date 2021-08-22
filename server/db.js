const db = require('./db.json');
const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: "123",
//     database: "notee",
//     host: "localhost",
//     port: 5432
// });

const DB_URL = db.DB_URL;
const pool = new Pool({
    connectionString: DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

module.exports = pool;