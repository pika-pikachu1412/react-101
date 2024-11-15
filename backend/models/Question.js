const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      option: String,
      isRight: Boolean,
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
