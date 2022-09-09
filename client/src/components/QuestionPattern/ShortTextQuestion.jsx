import React from "react";
import { TextField } from "@mui/material";
import LabelComponent from "../helpers/LabelComponent";

const ShortTextQuestion = ({ shortQuestionFormik }) => {
  const { questionText, points, minChars, maxChars } =
    shortQuestionFormik.values;

  return (
    <div>
      <div style={{ width: "100%" }}>
        <form>
          <div style={{ marginTop: "-6rem", display: "flex", width: "90%" }}>
            <TextField
              label={<LabelComponent text={"Points"} />}
              name="points"
              value={points}
              onChange={shortQuestionFormik.handleChange}
              style={{ marginLeft: "auto", fontFamily: "Poppins" }}
              error={
                shortQuestionFormik.touched.points &&
                Boolean(shortQuestionFormik.errors.points)
              }
              helperText={
                shortQuestionFormik.touched.points &&
                shortQuestionFormik.errors.points
              }
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <TextField
              label={<LabelComponent text={"Enter question text"} />}
              name="questionText"
              value={questionText}
              onChange={shortQuestionFormik.handleChange}
              style={{ width: "80%" }}
              error={
                shortQuestionFormik.touched.points &&
                Boolean(shortQuestionFormik.errors.questionText)
              }
              helperText={
                shortQuestionFormik.touched.questionText &&
                shortQuestionFormik.errors.questionText
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            <TextField
              label={
                <LabelComponent text={"Enter minimum number characters"} />
              }
              name="minChars"
              value={minChars}
              onChange={shortQuestionFormik.handleChange}
              style={{ width: "20rem" }}
              error={
                shortQuestionFormik.touched.minChars &&
                Boolean(shortQuestionFormik.errors.minChars)
              }
              helperText={
                shortQuestionFormik.touched.minChars &&
                shortQuestionFormik.errors.minChars
              }
            />
            <TextField
              label={
                <LabelComponent text={"Enter maximum number characters"} />
              }
              name="maxChars"
              value={maxChars}
              onChange={shortQuestionFormik.handleChange}
              style={{ width: "20rem", marginLeft: "1rem" }}
              error={
                shortQuestionFormik.touched.maxChars &&
                Boolean(shortQuestionFormik.errors.maxChars)
              }
              helperText={
                shortQuestionFormik.touched.maxChars &&
                shortQuestionFormik.errors.maxChars
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShortTextQuestion;
