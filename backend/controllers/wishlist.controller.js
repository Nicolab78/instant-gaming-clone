const db = require('../db');

exports.addToWishlist = (req, res) => {
  const { user_email, game_id } = req.body;

  if (!user_email || !game_id) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'INSERT INTO wishlists (user_email, game_id) VALUES (?, ?)';

  db.query(sql, [user_email, game_id], (err) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: 'Erreur ajout wishlist' });
    }
    res.status(201).json({ message: 'Jeu ajouté à la wishlist' });
  });
};

exports.getWishlist = (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Email requis' });
  }

  const sql = `
    SELECT g.* 
    FROM wishlists w 
    JOIN games g ON w.game_id = g.id 
    WHERE w.user_email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: 'Erreur chargement wishlist' });
    }
    res.json(results);
  });
};

exports.removeFromWishlist = (req, res) => {
  const { email, game_id } = req.params;

  if (!email || !game_id) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'DELETE FROM wishlists WHERE user_email = ? AND game_id = ?';
  db.query(sql, [email, game_id], (err, result) => {
    if (err) {
      console.error('Erreur suppression wishlist', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Élément non trouvé dans la wishlist' });
    }

    res.status(200).json({ message: 'Jeu retiré de la wishlist' });
  });
};
