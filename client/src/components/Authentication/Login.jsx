/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LabelComponent from "../helpers/LabelComponent";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/users";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = yup.object({
    email: yup.string().required("Please enter email"),
    password: yup.string().required("Please enter password"),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      const { token, user } = await userLogin({
        email: formik.values.email,
        password: formik.values.password,
      });
      if (token) {
        window.location.reload();
        navigate("/questions");
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    } else {
      navigate("/questions");
    }
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{ marginTop: "10rem", width: "35rem", height: "20rem" }}
        >
          <div style={{ marginTop: "1rem" }}>
            <LabelComponent text={"Login"} style={{ fontSize: "25px" }} />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            style={{ marginTop: "2rem", width: "100%" }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                label={<LabelComponent text={"Enter Email"} />}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                style={{ width: "20rem" }}
              />
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <TextField
                type={showPassword ? "text" : "password"}
                label={<LabelComponent text={"Enter Password"} />}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                style={{ width: "20rem" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Button
                type="submit"
                variant="contained"
                color="info"
                style={{ width: "10rem" }}
              >
                <LabelComponent text={"Login"} />
              </Button>
            </div>

            <div>
              <Typography onClick={() => navigate("/register")}>
                <LabelComponent
                  text={"Not registered? Register"}
                  style={{
                    color: "grey",
                    marginTop: "0.5rem",
                    cursor: "pointer",
                  }}
                />
              </Typography>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
