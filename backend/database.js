
const mysql = require('mysql2');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "2019152",
    database: "tennisanalysis",
});
db.connect();

module.exports = db;