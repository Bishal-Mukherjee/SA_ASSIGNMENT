const express = require("express");
const router = express.Router();
const {
  addQuestions,
  getAllQuestionIds,
  getQuestionById,
} = require("../controllers/Question");

router.post("/addQuestions", addQuestions);

router.post("/getAllQuestionIds", getAllQuestionIds);

router.post("/getQuestionById", getQuestionById);

module.exports = router;
