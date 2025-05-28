const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/', wishlistController.addToWishlist);
router.get('/:email', wishlistController.getWishlist);
router.delete('/:email/:game_id', wishlistController.removeFromWishlist);

module.exports = router;