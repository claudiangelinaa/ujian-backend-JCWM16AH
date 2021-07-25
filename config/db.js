const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend_2021',
    port: '3306',
    multipleStatements: true
});

module.exports = pool;