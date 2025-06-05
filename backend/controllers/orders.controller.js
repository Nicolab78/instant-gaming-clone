const db = require('../db');

exports.validateOrder = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) return res.status(400).json({ message: "user_id requis" });

  const getCartSql = `
    SELECT ci.game_id, ci.quantity, c.id AS cart_id, g.price
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    JOIN games g ON ci.game_id = g.id
    WHERE c.user_id = ?
  `;

  db.query(getCartSql, [user_id], (err, cartItems) => {
    if (err) return res.status(500).json({ message: 'Erreur lecture panier' });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    const cart_id = cartItems[0].cart_id;

    const insertOrderSql = `INSERT INTO orders (user_id) VALUES (?)`;
    db.query(insertOrderSql, [user_id], (err, orderResult) => {
      if (err) return res.status(500).json({ message: 'Erreur création commande' });

      const order_id = orderResult.insertId;

      const insertItemsSql = `
        INSERT INTO order_items (order_id, game_id, quantity, price)
        VALUES ?
      `;
      const itemsData = cartItems.map(item => [order_id, item.game_id, item.quantity, item.price]);

      db.query(insertItemsSql, [itemsData], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur ajout produits commande' });

        const deleteCartSql = `DELETE FROM cart_items WHERE cart_id = ?`;
        db.query(deleteCartSql, [cart_id], (err) => {
          if (err) return res.status(500).json({ message: 'Commande créée mais panier non vidé' });

          res.status(201).json({ message: 'Commande validée', order_id });
        });
      });
    });
  });
};

exports.getOrdersByUser = (req, res) => {
  const userId = req.params.userId;
  console.log('[getOrdersByUser] userId =', userId);

  const sql = `
    SELECT o.id, o.created_at, 
           SUM(oi.price * oi.quantity) AS total_price
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    GROUP BY o.id, o.created_at
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('[getOrdersByUser] Erreur SQL :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    console.log('[getOrdersByUser] Résultats :', results);
    res.json(results);
  });
};



exports.getOrderDetails = (req, res) => {
  const orderId = req.params.orderId;
  console.log('[getOrderDetails] orderId =', orderId);

  const sql = `
    SELECT g.title, g.price, oi.quantity
    FROM order_items oi
    JOIN games g ON g.id = oi.game_id
    WHERE oi.order_id = ?
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error('[getOrderDetails] SQL ERROR:', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    console.log('[getOrderDetails] Résultats =', results);
    res.json(results);
  });
};


