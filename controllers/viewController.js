const Item = require('../models/itemModel')
const User = require('../models/userModel')
const Cart = require('../models/cartModel')

const catchAsync = require('../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.getOverview = catchAsync(async (req, res, next) => {
    res.status(200).render('homepage')
})

exports.getItems = catchAsync(async (req, res) => {
    const items = await Item.find()

    res.status(200).render('items',{
        title: "מוצרים לרכישה",
        items
    })
})

exports.getItem = catchAsync(async (req, res, next) => {
    try {
        const id = req.params._id; // the id of the item is part of the params
        const item = await Item.findById(id).populate({
            path: 'item' // used to populate a referenced field
        });
        if (!item) {
            return next(new AppError('There is no such item!', 404))
        }

        console.log('Item is', item);
        res.status(200).render('item', {
            item
        });
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).send('Internal Server Error');
    }
});


exports.login = catchAsync(async (req, res) => {
    res.status(200).render('login',{
        title: 'התחבר'
    })
})


exports.signup = catchAsync(async (req, res) => {
    res.status(200).render('signup', {
        title: 'הרשם'
    })
})

exports.getAccount = (req, res) => {
    res.status(200).render('account',{
        title: 'המשתמש שלי',
    })
}


exports.updateUserData = catchAsync( async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        })
    res.status(200).render('account',{
        title: 'המשתמש שלי',
        user: updatedUser
    })

})


exports.materials = (req, res) => {
    res.status(200).render('materials', {
        title: 'חומרים'
    })
}

exports.getMyCart = async (req, res) => {

    // 1) Find all carts
    const cart = await Cart.find({user: req.user.id})

    // 2) Find carts with the returned id
    const itemIds = cart.map(el => el.item);
    const items = await Item.find({ _id: { $in: itemIds} }) // in the cart, only items that a user bought will appear
    // the find method using the objectId reference of the user and the item
    res.status(200).render('items', {
        title: 'המוצרים שלי',
        items: items
    })
}
