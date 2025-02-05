const mongoose = require('mongoose');


// the item and user containing a reference to a user object and item object
const cartSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: [true, 'Cart must belong to an item!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Cart must belong to an user!']
    },
    price:{
        type: Number,
        require: [true, 'Item must have a price!']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
})

// populating the user and item in the cart schema
cartSchema.pre(/^find/, function (next) {
    this.populate('user').populate({
        path: 'item',
        select: 'name'
    })
    next();
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;