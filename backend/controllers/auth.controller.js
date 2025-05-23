const db = require('../db');         
const bcrypt = require('bcrypt');   


exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log('🧪 Reçu depuis Angular :', req.body); 

  if (!email || !password) {
    console.log('Email ou mot de passe manquant');
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      console.log('Email introuvable :', email);
      return res.status(401).json({ message: 'Email incorrect.' });
    }

    const user = results[0];
    console.log('Utilisateur trouvé :', user.email);

   
    const bcrypt = require('bcrypt'); 

    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        console.error('Erreur bcrypt :', bcryptErr);
        return res.status(500).json({ message: 'Erreur bcrypt.' });
      }

      if (!isMatch) {
        console.log('Mauvais mot de passe');
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }

      console.log('Connexion réussie !');
      return res.status(200).json({
        message: 'Connexion réussie',
        userId: user.id,
        email: user.email,
        token: 'fake-token'
      });
    });
  });
};


exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur.' });

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hash], (error) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email déjà utilisé.' });
        }
        return res.status(500).json({ message: 'Erreur lors de la création du compte.' });
      }

      res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    });
  });
};