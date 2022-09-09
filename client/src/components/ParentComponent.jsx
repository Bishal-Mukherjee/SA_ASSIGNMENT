import React, { useState, Fragment } from "react";
import {
  Select,
  MenuItem,
  Paper,
  Card,
  InputLabel,
  Button,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import McqQuestion from "./QuestionPattern/McqQuestion";
import ShortTextQuestion from "./QuestionPattern/ShortTextQuestion";
import LabelComponent from "./helpers/LabelComponent";
import QuestionModal from "./helpers/QuestionModal";
import { useFormik } from "formik";
import {
  optionValidationSchema,
  questionValidationSchema,
  shortQuestionValidationSchema,
} from "./helpers/ValidationSchemas";
import "../App.css";
import { addQuestions } from "../services/questions";

const ParentComponent = () => {
  const [isMcqType, setIsMcqType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [values, setValues] = useState({
    open: false,
    options: [],
    questionAddedMessage: false,
  });

  const optionFormik = useFormik({
    validationSchema: optionValidationSchema,
    initialValues: {
      optionText: "",
    },
    onSubmit: () => {
      const { optionText } = optionFormik.values;
      setValues({
        ...values,
        options: [...values.options, optionText],
      });
      optionFormik.setValues({ ...optionFormik.values, optionText: "" });
    },
  });

  const questionFormik = useFormik({
    validationSchema: questionValidationSchema,
    initialValues: {
      questionText: "",
      points: 0,
      correctOption: -1,
    },
    onSubmit: () => {
      if (questionFormik.values.correctOption !== -1) {
        handleAddQuestion({
          question: {
            questionType: 0,
            questionText: questionFormik.values.questionText,
            options: values.options,
            correctOption: questionFormik.values.correctOption,
            points: questionFormik.values.points,
          },
        });
        questionFormik.handleReset();
        optionFormik.handleReset();
        setValues({ ...values, options: [] });
      }
    },
  });

  const shortQuestionFormik = useFormik({
    validationSchema: shortQuestionValidationSchema,
    initialValues: {
      questionText: "",
      points: 0,
      minChars: 0,
      maxChars: 0,
    },
    onSubmit: () => {
      handleAddQuestion({
        question: {
          questionType: 1,
          questionText: shortQuestionFormik.values.questionText,
          minChars: shortQuestionFormik.values.minChars,
          maxChars: shortQuestionFormik.values.maxChars,
          points: shortQuestionFormik.values.points,
        },
      });
      shortQuestionFormik.handleReset();
    },
  });

  const handleChange = (e) => {
    setIsMcqType(e.target.value);
  };

  const handleAddQuestion = ({ question }) => {
    setQuestions((prevstate) => [...prevstate, question]);
  };

  const handleFinalSubmission = async () => {
    const response = await addQuestions({ questions });
    if (response) {
      setValues({ ...values, questionAddedMessage: true });
      window.location.reload();
    }
  };

  const questionTypeObj = {
    0: (
      <McqQuestion
        values={values}
        setValues={setValues}
        optionFormik={optionFormik}
        questionFormik={questionFormik}
        handleAddQuestion={handleAddQuestion}
      />
    ),
    1: (
      <ShortTextQuestion
        handleAddQuestion={handleAddQuestion}
        shortQuestionFormik={shortQuestionFormik}
      />
    ),
  };

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ marginTop: "1rem" }}>
          <LabelComponent text={`#${questions.length + 1} Question`} />
        </div>
        <InputLabel style={{ marginTop: "1rem" }}>
          <LabelComponent
            text={"Choose question type"}
            style={{ fontSize: "15px", marginLeft: "-1rem" }}
          />
        </InputLabel>
        <Select
          label=""
          onChange={(e) => handleChange(e)}
          style={{ width: "12rem" }}
        >
          <MenuItem value={0}>
            <LabelComponent text={"MCQ"} />
          </MenuItem>
          <MenuItem value={1}>
            <LabelComponent text={"Short Text"} />
          </MenuItem>
        </Select>
      </div>

      <div>
        <div
          style={{
            marginTop: "2.5rem",
            height: "30rem",
          }}
        >
          {questionTypeObj[isMcqType]}
        </div>
      </div>

      {isMcqType !== null && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Button
              variant="contained"
              color="inherit"
              onClick={() =>
                isMcqType === 0
                  ? questionFormik.handleSubmit()
                  : shortQuestionFormik.handleSubmit()
              }
            >
              <LabelComponent text={"+ Add Question"} />
            </Button>
          </div>

          <div style={{ marginLeft: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinalSubmission}
              disabled={questions.length === 0 ? true : false}
            >
              <CloudUpload /> <LabelComponent text={"Save"} />
            </Button>
          </div>
        </div>
      )}

      <div>
        {values.questionAddedMessage && (
          <LabelComponent text={"Question Paper was successfully uploaded"} />
        )}
      </div>

      <div style={{ height: "20rem", marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {questions.map((question, index) => (
            <Paper
              style={{
                width: "10rem",
                cursor: "pointer",
                margin: "1rem",
              }}
              onClick={() =>
                setValues({
                  ...values,
                  selectedQuestionIdex: index,
                  open: true,
                })
              }
            >
              <Card className="questionCard" style={{ height: "5rem" }}>
                <LabelComponent
                  text={`Question #${index + 1}`}
                  style={{ marginTop: "1.5rem" }}
                />
              </Card>
            </Paper>
          ))}
        </div>
      </div>

      <Fragment>
        {values.open && (
          <QuestionModal
            values={values}
            setValues={setValues}
            question={questions[values.selectedQuestionIdex]}
          />
        )}
      </Fragment>
    </div>
  );
};

export default ParentComponent;
