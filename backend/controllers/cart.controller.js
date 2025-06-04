const db = require('../db');

const checkOrCreateCart = (user_id, callback) => {
  const checkSql = 'SELECT id FROM cart WHERE user_id = ?';
  db.query(checkSql, [user_id], (err, result) => {
    if (err) return callback(err);

    if (result.length > 0) {
      return callback(null, result[0].id);
    } else {
      const createSql = 'INSERT INTO cart (user_id) VALUES (?)';
      db.query(createSql, [user_id], (err, insertResult) => {
        if (err) return callback(err);
        callback(null, insertResult.insertId);
      });
    }
  });
};

exports.addToCart = (req, res) => {
  const { user_id, game_id } = req.body;

  console.log("Données reçues pour ajout au panier :", req.body);

  if (!user_id || !game_id) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  checkOrCreateCart(user_id, (err, cart_id) => {
    if (err) {
      console.error('Erreur panier :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    const insertItemSql = `
      INSERT INTO cart_items (cart_id, game_id, quantity)
      VALUES (?, ?, 1)
      ON DUPLICATE KEY UPDATE quantity = quantity + 1
    `;

    db.query(insertItemSql, [cart_id, game_id], (err) => {
      if (err) {
        console.error('Erreur ajout item :', err);
        return res.status(500).json({ message: 'Erreur ajout panier.' });
      }

      res.status(201).json({ message: 'Jeu ajouté au panier' });
    });
  });
};

exports.getCart = (req, res) => {
  const user_id = req.params.userId;
  console.log("🎯 getCart exécuté pour l'utilisateur :", req.params.userId);

  const sql = `
    SELECT g.*, ci.quantity
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    JOIN games g ON ci.game_id = g.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Erreur SQL lors de la récupération du panier :", err);
      return res.status(500).json({ message: 'Erreur chargement panier' });
    }

    res.json(results);
  });
};

exports.removeFromCart = (req, res) => {
  const { user_id, game_id } = req.params;

  const sql = `
    DELETE ci FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE c.user_id = ? AND ci.game_id = ?
  `;

  db.query(sql, [user_id, game_id], (err, result) => {
    if (err) {
      console.error('Erreur suppression panier :', err);
      return res.status(500).json({ message: 'Erreur suppression panier' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Élément non trouvé dans le panier' });
    }

    res.status(200).json({ message: 'Jeu retiré du panier' });
  });
};
