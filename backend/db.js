const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ton mot de passe si besoin
  database: 'instant_gaming'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur MySQL :', err);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

module.exports = db;
