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

exports.createGame = (req, res) => {
  const { title, description, price, image_url, release_date, stock } = req.body;
  const sql = 'INSERT INTO games (title, description, price, image_url, release_date, stock) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, price, image_url, release_date, stock], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du jeu :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.updateGame = (req, res) => {
  const gameId = req.params.id;
  const { title, description, price, image_url, release_date, stock } = req.body;
  const sql = 'UPDATE games SET title = ?, description = ?, price = ?, image_url = ?, release_date = ?, stock = ? WHERE id = ?';
  db.query(sql, [title, description, price, image_url, release_date, stock, gameId], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du jeu :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Jeu mis à jour' });
  });
};

exports.deleteGame = (req, res) => {
  const gameId = req.params.id;
  const sql = 'DELETE FROM games WHERE id = ?';
  db.query(sql, [gameId], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du jeu :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Jeu supprimé' });
  });
};