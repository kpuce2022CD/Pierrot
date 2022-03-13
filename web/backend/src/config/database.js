
const mysql = require('mysql2');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "dks6syd6",
    database: "tennis",
});
db.connect();

module.exports = db;