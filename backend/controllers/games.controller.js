const db = require('../db');


exports.getAllGames = (req, res) => {
    db.query('SELECT * FROM games', (err, results) => {
        if (err) {
            console.error('Error fetching games:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
}
