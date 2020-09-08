const mongoose = require('mongoose');

const sentenceSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  font: String,
  size: Number,
  style: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
