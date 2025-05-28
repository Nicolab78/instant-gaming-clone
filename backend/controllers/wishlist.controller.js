const db = require('../db');

exports.addToWishlist = (req, res) => {
    const { userId, gameId } = req.body;

    if (!userId || !gameId) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    const sql = 'INSERT INTO wishlist (user_id, game_id) VALUES (?, ?)';
    db.query(sql, [user_email, game_id], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur ajout wishlist'})
            res.status(201).json({ message: 'Jeu ajouté à la wishlist' });
    });
};

exports.getWishlist = (req, res) => {
    const email = req.params.email;

    const sql = 'SELECT g.* FROM wishlist w JOIN games g ON w.game_id = g.id WHERE w.user_email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur chargement wishlist'})
        res.json(results);

    });
}


