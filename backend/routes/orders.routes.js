const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.post('/', ordersController.validateOrder);
router.get('/details/:orderId', ordersController.getOrderDetails);
router.get('/:userId', ordersController.getOrdersByUser);

module.exports = router;
