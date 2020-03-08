const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
        default: 'grey'
    }
});

module.exports = mongoose.model('categories', categoriesSchema);