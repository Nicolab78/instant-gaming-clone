const db = require('../db');


exports.getAllGames = (req, res) => {
    db.query('SELECT * FROM games', (err, results) => {
        if (err) {
            console.error('Error fetching games:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
}

exports.getGameById = (req, res) => {
  const gameId = req.params.id;
  const sql = 'SELECT * FROM games WHERE id = ?';

  db.query(sql, [gameId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Jeu non trouvé' });

    res.json(results[0]);
  });
};

