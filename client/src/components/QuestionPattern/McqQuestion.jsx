import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Tooltip,
  Paper,
  Card,
} from "@mui/material";
import { Delete, Edit, SaveAlt, Check } from "@mui/icons-material";
import LabelComponent from "../helpers/LabelComponent";
import lodash from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const QuestionOption = ({
  optionText,
  index,
  handleOptionRemove,
  questionFormik,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentOption, setCurrentOption] = useState("");

  return (
    <Paper elevation={3} style={{ margin: "1rem" }}>
      <Card style={{ width: "10rem", height: "10rem" }}>
        <div style={{ margin: "1rem", height: "2rem" }}>
          {isEditing ? (
            <TextField
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
            />
          ) : (
            <LabelComponent text={optionText} />
          )}
        </div>
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Tooltip title={"Delete"}>
              <IconButton onClick={() => handleOptionRemove({ index })}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>

          <div>
            <Tooltip title={isEditing ? "Save" : "Edit"}>
              <IconButton
                onClick={() => {
                  setIsEditing(!isEditing);
                  setCurrentOption(optionText);
                }}
              >
                {isEditing ? <SaveAlt /> : <Edit />}
              </IconButton>
            </Tooltip>
          </div>

          <div>
            <Tooltip title="Mark as correct option">
              <IconButton
                color={
                  questionFormik.values.correctOption === index
                    ? "primary"
                    : "default"
                }
                onClick={() =>
                  questionFormik.setValues({
                    ...questionFormik.values,
                    correctOption: index,
                  })
                }
              >
                <Check />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
    </Paper>
  );
};

const McqQuestion = ({ optionFormik, questionFormik, values, setValues }) => {
  const { options } = values;

  const handleOptionRemove = ({ index }) => {
    lodash.remove(options, (n) => {
      return options[index] === n;
    });
    setValues({ ...values, options: [...options] });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <div>
      <form onSubmit={questionFormik.handleSubmit}>
        <div style={{ marginTop: "-6rem", display: "flex", width: "90%" }}>
          <TextField
            label={<LabelComponent text={"Points"} />}
            name="points"
            value={questionFormik.values.points}
            onChange={questionFormik.handleChange}
            style={{ marginLeft: "auto", fontFamily: "Poppins" }}
            error={
              questionFormik.touched.points &&
              Boolean(questionFormik.errors.points)
            }
            helperText={
              questionFormik.touched.points && questionFormik.errors.points
            }
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <TextField
            label={<LabelComponent text={"Enter question text"} />}
            name="questionText"
            value={questionFormik.values.questionText}
            onChange={questionFormik.handleChange}
            style={{ width: "80%" }}
            error={
              questionFormik.touched.questionText &&
              Boolean(questionFormik.errors.questionText)
            }
            helperText={
              questionFormik.touched.questionText &&
              questionFormik.errors.questionText
            }
          />
        </div>
      </form>

      <div
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div>
          <form onSubmit={optionFormik.handleSubmit}>
            <TextField
              label={<LabelComponent text={"Enter option text"} />}
              onChange={optionFormik.handleChange}
              name="optionText"
              value={optionFormik.values.optionText}
              error={
                optionFormik.touched.optionText &&
                Boolean(optionFormik.errors.optionText)
              }
              helperText={
                optionFormik.touched.optionText &&
                optionFormik.errors.optionText
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                height: "3rem",
                marginLeft: "1rem",
                marginTop: "0.2rem",
              }}
            >
              <LabelComponent text={"+ Add Option"} />
            </Button>
          </form>
        </div>
        <div>
          {questionFormik.values.questionText !== "" &&
            options.length === 0 && (
              <LabelComponent
                text={"Please add some options"}
                style={{ color: "red", marginTop: "0.5rem" }}
              />
            )}
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {options.map((option, index) => (
            <QuestionOption
              optionText={option}
              index={index}
              handleOptionRemove={handleOptionRemove}
              questionFormik={questionFormik}
              key={index}
            />
          ))}
        </div>
      </div>

      <div style={{ height: "2rem" }}>
        {options.length !== 0 && questionFormik.values.correctOption === -1 && (
          <LabelComponent
            text={"Please mark an option correct"}
            style={{ color: "red" }}
          />
        )}
      </div>
    </div>
  );
};

export default McqQuestion;
