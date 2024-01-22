const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router();


router
    .route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem);

router
    .route('/:_id')
    .get(itemController.getItem)
    .patch(itemController.updateItem)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'), //only admins can delete items
        itemController.deleteItem
    );


module.exports = router;