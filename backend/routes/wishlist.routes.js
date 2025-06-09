const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/', wishlistController.addToWishlist);
router.get('/:user_id', wishlistController.getWishlist);
router.delete('/:user_id/:game_id', wishlistController.removeFromWishlist);

module.exports = router;
