const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Item = require('../models/itemModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel')


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently item in cart
    const item = await Item.findById(req.params.id)

    // 2) Create checkout session in stripe (payment session) and define the params
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?item=${req.params.id}&user=${req.user.id}&price=${item.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/items/:${req.params.id}`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        mode: 'subscription',
        line_items:[
            {
                price: 'price_1OXh1xL2md4Fp61OpJHMxyuy', // I'll change it later to be item.price, right now having some issue with that
                quantity: 1
            }
        ]
    });
    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session: session // redirect to the stripe session page
    })
    next();
})

exports.createCartCheckout = catchAsync (async (req, res, next) => {
    const {item, user, price} = req.query;

    if(!item && !user && !price) return next();

    await Cart.create({item, user, price});

    res.redirect(req.originalUrl.split('?')[0]);
})