const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller.js');
const reviewsController = require('../controllers/review.controller');

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.get('/:id/reviews', reviewsController.getReviewsByGameId);
router.post('/:id/reviews', reviewsController.addReview);

router.post('/', gamesController.createGame);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;

