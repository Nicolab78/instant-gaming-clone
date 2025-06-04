const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.addToCart); 
router.get('/:userId', cartController.getCart);
router.delete('/:userId/:game_id', cartController.removeFromCart);


module.exports = router;