const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.addToCart); 
router.get('/:email', cartController.getCart);
router.delete('/:email/:game_id', cartController.removeFromCart);

module.exports = router;