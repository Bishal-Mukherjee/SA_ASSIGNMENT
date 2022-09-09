import { Typography } from "@mui/material";
import React from "react";

const LabelComponent = ({ text, style }) => {
  return (
    <Typography fontFamily="Poppins" style={{ ...style }}>
      {text}
    </Typography>
  );
};

export default LabelComponent;
