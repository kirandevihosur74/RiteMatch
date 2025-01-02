import React from "react";
import classes from "./UserLogin.module.css";
import { TextField, Button, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../layout/ThemeContext";
import JobListingsSlider from "../layout/JobListingsSlider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";
import axios from "axios";
import { useUser } from "../layout/UserContext";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { theme } = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const navigate = useNavigate();
  const { setUser } = useUser();

  const themeStyle = theme === "light" ? classes.light : classes.dark;

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      const loginData = {
        email,
        password,
      };

      axios
        .post("http://127.0.0.1:8000/user/signin/", loginData)
        .then((response) => {
          console.log("User logged in:", response.data);
          setUser(response.data.username);
          setOpenSnackbar(true); // Open the Snackbar on successful login
          setTimeout(() => {
            navigate("/jobs"); // Navigate to jobs page after a delay
          }, 500); // Adjust delay as needed
        })
        .catch((error) => {
          console.error("Error during login:", error);
          // Handle login error (e.g., show error message)
        });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
       <Snackbar
        open={openSnackbar}
        autoHideDuration={1500} // Adjust duration as needed
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
      <section className={`${classes.user} ${themeStyle}`}>
        <h2 style={{ color: theme === "light" ? "#273746" : "#03DAC5" }}>
          We missed you &#x1FAE3;
        </h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            InputLabelProps={{
              style: { color: "#808B96" },
            }}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            error={emailError}
            sx={{
              marginBottom: 3,
              "& label": { color: theme === "light" ? "#808B96" : "white" },
              "& .MuiInputBase-input": {
                color: theme === "light" ? "black" : "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "light" ? "grey" : "#808B96",
                },
                "&:hover fieldset": {
                  borderColor: theme === "light" ? "#808B96" : "#808B96",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "light" ? "#808B96" : "#808B96",
                },
              },
            }}
          />
          <TextField
            InputLabelProps={{
              style: { color: "#808B96" },
            }}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{
              marginBottom: 3,
              "& label": { color: theme === "light" ? "#808B96" : "white" },
              "& .MuiInputBase-input": {
                color: theme === "light" ? "black" : "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme === "light" ? "grey" : "#808B96",
                },
                "&:hover fieldset": {
                  borderColor: theme === "light" ? "#808B96" : "#808B96",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "light" ? "#808B96" : "#808B96",
                },
              },
            }}
          />
          <Tooltip title="Login" placement="right" arrow>
            <Button
              sx={{
                borderRadius: 30,
                color: theme === "light" ? "white" : "black",
                backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
                transform: "translateY(-8px)",
              }}
              variant="contained"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            </Button>
          </Tooltip>
        </form>
        <small
          style={{
            color: theme === "light" ? "#273746" : "#03DAC5",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Need an account?{" "}
          <RouterLink
            to="/signup"
            style={{
              color: theme === "light" ? "#273746" : "#03DAC5",
              fontFamily: "'Roboto', sans-serif",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Register Here
          </RouterLink>
        </small>
      </section>
      <JobListingsSlider />
    </React.Fragment>
  );
};

export default UserLogin;
