import React from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import LabelComponent from "./helpers/LabelComponent";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;

  const navigationButtons = [
    {
      text: "All Questions",
      location: "/all-questions",
    },
    {
      text: "Add Questions",
      location: "/questions",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {navigationButtons.map(({ text, location }) => (
            <Button color="inherit" onClick={() => navigate(location)}>
              <LabelComponent
                text={text}
                style={{
                  textTransform: "capitalize",
                  textDecoration:
                    location === currentLocation ? "underline" : "none",
                }}
              />
            </Button>
          ))}

          <div style={{ marginLeft: "auto" }}>
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{ textTransform: "capitalize" }}
            >
              <LabelComponent text={"LOGOUT"} />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
