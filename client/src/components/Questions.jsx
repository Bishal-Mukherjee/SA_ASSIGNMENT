/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { getAllQuestionIds, getQuestionById } from "../services/questions";
import { Autocomplete, TextField, Paper, Typography } from "@mui/material";

const Questions = () => {
  const [values, setValues] = useState({
    questionIds: [],
    selectedQuestionId: "",
    questionPaper: [],
  });

  const { questionIds, selectedQuestionId, questionPaper } = values;

  const handleFetchQuestions = async () => {
    const temp = await getAllQuestionIds();
    setValues({
      ...values,
      questionIds: [...values.questionIds, ...temp.questionIds],
    });
  };

  const handleFetchQuestionPaperById = async () => {
    if (selectedQuestionId !== "" || selectedQuestionId !== null) {
      const response = await getQuestionById({
        questionPaperId: selectedQuestionId,
      });
      if (response) {
        setValues({ ...values, questionPaper: response.question.questions });
      }
    }
  };

  useEffect(() => {
    handleFetchQuestions();
  }, []);

  useEffect(() => {
    handleFetchQuestionPaperById();
  }, [selectedQuestionId]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <Autocomplete
          disablePortal
          options={questionIds}
          sx={{ width: 300 }}
          onChange={(e, questionId) =>
            setValues({ ...values, selectedQuestionId: questionId })
          }
          renderInput={(params) => (
            <TextField {...params} label="Choose question paper Id" />
          )}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <Typography style={{ fontFamily: "Poppins" }}>Questions:</Typography>
        <div style={{ width: "25rem", marginTop: "1.5rem" }}>
          {questionPaper.map(
            (
              {
                questionType,
                questionText,
                points,
                options,
                minChars,
                maxChars,
              },
              key
            ) => (
              <Paper elevation={3} key={key} style={{ marginTop: "1rem" }}>
                {questionType === 0 && (
                  <Fragment>
                    <div>
                      <Typography>{questionText}</Typography>
                      <div>
                        <Typography>Points: {points}</Typography>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {options.map((option, key) => (
                          <Typography key={key} style={{ marginLeft: "1rem" }}>
                            ○ {option}
                          </Typography>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                )}
                {questionType === 1 && (
                  <Fragment>
                    <div>
                      <Typography>{questionText}</Typography>
                      <div>
                        <Typography>Points: {points}</Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <Typography style={{ fontFamily: "Poppins" }}>
                          Minmum Character required: {minChars}
                        </Typography>
                        <Typography style={{ fontFamily: "Poppins" }}>
                          Maximum Character required: {maxChars}
                        </Typography>
                      </div>
                    </div>
                  </Fragment>
                )}
              </Paper>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
