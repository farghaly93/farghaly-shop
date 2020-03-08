const mongoose = require('mongoose');

const adsSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
    text: true
  },
  descreption: {
    type: String,
    required: true,
    text: true
  },
  iamge: {
    type: String
  }
});

module.exports = mongoose.model('ads', adsSchema);
