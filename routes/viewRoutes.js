const express = require('express')

const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const cartController = require('../controllers/cartController');

const router = express.Router()


router.get('/',
    cartController.createCartCheckout,
    authController.isLoggedIn,
    viewController.getOverview)

router.get('/items', authController.isLoggedIn, viewController.getItems)

router.get('/item/:_id', authController.isLoggedIn, viewController.getItem)

router.get('/login',authController.isLoggedIn, viewController.login)

router.get('/signup', viewController.signup)

router.get('/me', authController.protect, viewController.getAccount)

router.post('/submit-user-data', authController.protect, viewController.updateUserData)

router.get('/materials', authController.isLoggedIn, viewController.materials)

router.get('/cart', authController.protect, viewController.getMyCart)

module.exports = router