const db = require('../db');

exports.addToCart = (req, res) => {
  const { user_email, game_id } = req.body;

  console.log("Données reçues pour ajout au panier :", req.body);

  if (!user_email || !game_id) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'INSERT INTO cart (user_email, game_id) VALUES (?, ?)';
  db.query(sql, [user_email, game_id], (err) => {
    if (err) {
      console.error("Erreur SQL lors de l'ajout au panier :", err);
      return res.status(500).json({ message: 'Erreur ajout panier' });
    }

    res.status(201).json({ message: 'Jeu ajouté au panier' });
  });
};

   

    exports.getCart = (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Email requis' });
  }

  const sql = `
    SELECT g.*
    FROM cart c
    JOIN games g ON c.game_id = g.id
    WHERE c.user_email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Erreur chargement panier :", err);
      return res.status(500).json({ message: 'Erreur chargement panier' });
    }

    res.json(results);
  });
};






    exports.removeFromCart = (req, res) => {
        const { email, game_id } = req.params;

        if (!email || !game_id) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        const sql = 'DELETE FROM cart WHERE user_email = ? AND game_id = ?';

        db.query(sql, [email, game_id], (err, result) => {
            if (err) {
                console.error('Erreur suppression panier :', err);
            }

            if (result.affectedRow === 0 ) {
                return res.status(404).json({ message: 'Elément non trouvé dans le panier'});    
            }

            res.status(200).json({ message: 'Jeu retiré du panier'});
        });
    };