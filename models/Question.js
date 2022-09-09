const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  email: {
    type: String,
  },
  questionPaperId: {
    type: String,
  },
  questions: [
    {
      // questionType: MCQ (0) || ShortText (1)
      questionType: {
        type: Number,
      },
      questionText: {
        type: String,
      },
      points: {
        type: Number,
      },
      options: {
        type: Array,
      },
      correctOption: {
        type: Number,
      },
      minChars: {
        type: Number,
      },
      maxChars: {
        type: Number,
      },
    },
  ],
});

module.exports = Question = mongoose.model("question", questionSchema);
