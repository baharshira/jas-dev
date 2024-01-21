const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        artist: {
            required: true,
            type: String
        },
        price: {
            type: Number,
            required: [true, 'An item must have a price']
        },
        summary: {
            type: String,
        },
        artistPage: String,
        description: {
            type: String,
            trim: true
        },
        imgPath: {
            type: String,
            required: true,
        },
        artistLogo: String
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


// DOCUMENT MIDDLEWARE: runs before .save() and .create()
itemSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {


itemSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;