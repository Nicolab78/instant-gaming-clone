const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller.js');

router.get('/', gamesController.getAllGames);

module.exports = router;

