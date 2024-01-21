const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/checkout-session/:id', authController.protect, cartController.getCheckoutSession)
module.exports = router;