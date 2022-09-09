import React from "react";
import { Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const QuestionModal = ({ values, setValues, question }) => {
  return (
    <Dialog open={values.open} maxWidth="md" fullWidth={true}>
      <div style={{ display: "flex" }}>
        <IconButton
          style={{ marginLeft: "auto" }}
          onClick={() => setValues({ ...values, open: false })}
        >
          <Close />
        </IconButton>
      </div>

      <div style={{ height: "5rem", width: "100%" }}>
        {JSON.stringify(question)}
      </div>
    </Dialog>
  );
};

export default QuestionModal;
