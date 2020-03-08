const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    userEmail: String,
    message: String,
    role: String,
    date: String
});

module.exports = new mongoose.model('messages', messagesSchema);