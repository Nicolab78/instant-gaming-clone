const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'instant_gaming'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur MySQL :', err);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

module.exports = db;
