
const mysql = require('mysql2');
const db = mysql.createConnection({
    user: "root",
    port: "3306",
    host: "localhost",
    password: "passwd",
    database: "tennisanalysis",
});
db.connect();

module.exports = db;