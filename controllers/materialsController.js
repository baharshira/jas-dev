const catchAsync = require('../utils/catchAsync');
const Materials = require('./../models/materialsModel')
const AppError = require("../utils/appError");


exports.getAllMaterials = catchAsync(async (req, res, next) => {
    const materials = await Materials.find()

    if (!materials) {
        return next(new AppError('No materials found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            materials: materials
        }
    });
})