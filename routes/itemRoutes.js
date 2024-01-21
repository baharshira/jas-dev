const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const userController = require("../controllers/userController");

const router = express.Router();


router
    .route('/')
    .get(/*authController.protect,*/ itemController.getAllItems)
    .post(itemController.createItem);

router
    .route('/:_id')
    .get(itemController.getItem)
    .patch(itemController.updateItem)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        itemController.deleteItem
    );


// router
//     .route('/:itemId/addToCart')
//     .post(authController.protect, /*authController.restrictTo('users')*/ itemController.addToCart)

module.exports = router;