const db = require('../db');

exports.getReviewsByGameId = (req, res) => {
    const gameId = req.params.id;
    const sql = 'SELECT * FROM reviews WHERE game_id = ? ORDER BY created_at DESC';

    db.query(sql, [gameId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.json(results);
    }
    );

};

exports.addReview = (req, res) => {
  const gameId = req.params.id;
  const { user_email, content } = req.body;

  if (!user_email || !content) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'INSERT INTO reviews (game_id, user_email, content) VALUES (?, ?, ?)';
  db.query(sql, [gameId, user_email, content], (err) => {
    if (err) {
      console.error('Erreur insertion avis', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Avis ajouté avec succès' });
  });
};


