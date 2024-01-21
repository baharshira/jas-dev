
const User = require('../models/userModel');
const Item = require('../models/itemModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()/*.populate('cart');*/


    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// exports.addToCart = catchAsync(async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;
//     const user = await User.findById(userId);
//     const item = await Item.findById(itemId);
//
//     if (!user || !item) {
//       return res.status(404).json({ success: false, message: 'User or Item not found' });
//     } else {
//       // Push the itemId to the cart array
//       user.cart.push({ itemId: item._id });
//
//       // Save the updated user document
//       await user.save();
//
//       res.status(200).json({ success: true, data: user.cart });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });




exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
    // try {
    //   const cart = await User.findById(req.params.id).populate('cart')
    //   console.log('cart is',cart)
    //   if (!cart){
    //     return next(new AppError('No cart with that user id!'))
    //   }
    //   else {
    //     res.status(200).json({
    //       status: 'success',
    //       cart
    //     })
    //   }
    // }
    // catch(err){
    //   res.status(400).json({
    //     status: 'fail',
    //     'message': err.message
    //   })
    // }
};

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};



