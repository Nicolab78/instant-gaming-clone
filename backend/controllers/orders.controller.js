const db = require('../db');

exports.validateOrder = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) return res.status(400).json({ message: "user_id requis" });

  // 1. Récupérer le panier de l'utilisateur
  const getCartSql = `
    SELECT ci.game_id, ci.quantity, c.id AS cart_id
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE c.user_id = ?
  `;

  db.query(getCartSql, [user_id], (err, cartItems) => {
    if (err) return res.status(500).json({ message: 'Erreur lecture panier' });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    const cart_id = cartItems[0].cart_id;

    // 2. Créer la commande
    const insertOrderSql = `INSERT INTO orders (user_id) VALUES (?)`;
    db.query(insertOrderSql, [user_id], (err, orderResult) => {
      if (err) return res.status(500).json({ message: 'Erreur création commande' });

      const order_id = orderResult.insertId;

      // 3. Insérer tous les items
      const insertItemsSql = `
        INSERT INTO order_items (order_id, game_id, quantity)
        VALUES ?
      `;
      const itemsData = cartItems.map(item => [order_id, item.game_id, item.quantity]);

      db.query(insertItemsSql, [itemsData], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur ajout produits commande' });

        // 4. Vider le panier
        const deleteCartSql = `DELETE FROM cart_items WHERE cart_id = ?`;
        db.query(deleteCartSql, [cart_id], (err) => {
          if (err) return res.status(500).json({ message: 'Commande créée mais panier non vidé' });

          res.status(201).json({ message: 'Commande validée', order_id });
        });
      });
    });
  });
};
