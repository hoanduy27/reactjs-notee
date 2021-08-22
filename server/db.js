const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: "123",
//     database: "notee",
//     host: "localhost",
//     port: 5432
// });
const DB_URL = "postgres://jwxnwipgpdhoer:fc5f5e51b3a51bc99b1bf6d6955c5abc8d6cdbb8d6980ac76b5bfa5a22203927@ec2-54-147-93-73.compute-1.amazonaws.com:5432/datrd6m6ekecfa"
const pool = new Pool({
    connectionString: DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

module.exports = pool;