const express = require('express');
const materialsControllers = require("../controllers/materialsController");

const router = express.Router();

router
    .route('/')
    .get(materialsControllers.getAllMaterials)

module.exports = router;