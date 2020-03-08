const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    items: [{
        itemId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        }
    }],
    userId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    checked: {
        type: Number,
        default: 0
    },
    shiped: {
        type: Number,
        default: 0
    },
    delievered: {
        type: Number,
        default: 0
    }
});

module.exports = new mongoose.model('wishlist', wishlistSchema);