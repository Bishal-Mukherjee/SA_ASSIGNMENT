const Question = require("../models/Question");
const { v4 } = require("uuid");

// add questions
exports.addQuestions = async (req, res) => {
  try {
    const question = Question({
      userEmail: req.body.userEmail,
      questionPaperId: v4(),
      ...req.body,
    });
    await question.save();
    res.status(200).json({ message: "Question saved successfully" });
  } catch (err) {
    console.log(err);
  }
};

// fetch all the questions based on the email
// this same endpoint can aslo be used to fetch a particular
// question paper
exports.getAllQuestionIds = async (req, res) => {
  try {
    const { email } = req.body;
    const questions = await Question.find({ email });
    const questionIds = questions.map((q) => q.questionPaperId);
    res.status(200).json({ questionIds });
  } catch (err) {
    console.log(err);
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { questionPaperId } = req.body;
    const question = await Question.findOne({ questionPaperId });
    res.status(200).json({ question });
  } catch (err) {
    console.log(err);
  }
};

// fetch all the questions based on the email
// this same endpoint can aslo be used to fetch a particular
// question paper
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question({ ...req.body });
    res.status.json({ questions });
  } catch (err) {
    console.log(err);
  }
};
