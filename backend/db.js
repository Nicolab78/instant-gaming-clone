const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql',               
  user: 'root',
  password: 'root',
  database: 'instant_gaming',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
