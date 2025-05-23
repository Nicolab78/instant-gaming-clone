const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller.js');
const reviewsController = require('../controllers/review.controller');

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.get('/:id/reviews', reviewsController.getReviewsByGameId);
router.post('/:id/reviews', reviewsController.addReview);


module.exports = router;

