import React, { useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
  Snackbar,
  Alert,
  Slide,
  CircularProgress,
  Box,
  CardContent,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import { useTheme } from "../layout/ThemeContext";
import JobListingsSlider from "../layout/JobListingsSlider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../layout/UserContext";
import classes from "./UserLogin.module.css";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const themeStyle = theme === "light" ? classes.light : classes.dark;

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(!email);
    setPasswordError(!password);

    if (email && password) {
      const loginData = { email, password };

      axios
        .post("http://127.0.0.1:8000/user/signin/", loginData)
        .then((response) => {
          const token = response.data.token;
          const username = response.data.username;

          if (token) {
            localStorage.setItem("token", token);
            setUser(username);
            setOpenSnackbar(true);
            setTimeout(() => navigate("/resume"), 500);
          }
        });
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Logged in successfully!
        </Alert>
      </Snackbar>

      <section className={`${classes.user} ${themeStyle}`}>
        <h2 style={{ color: theme === "light" ? "#273746" : "#03DAC5" }}>
          We missed you &#x1FAE3;
        </h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            fullWidth
            value={email}
            error={emailError}
            sx={{ marginBottom: 3, '& label': { color: theme === "light" ? "#808B96" : "white" },
                  '& .MuiInputBase-input': { color: theme === "light" ? "black" : "white" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: theme === "light" ? "grey" : "#808B96" },
                    '&:hover fieldset': { borderColor: "#808B96" },
                    '&.Mui-focused fieldset': { borderColor: "#808B96" },
                  }}}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            fullWidth
            value={password}
            error={passwordError}
            sx={{ marginBottom: 3, '& label': { color: theme === "light" ? "#808B96" : "white" },
                  '& .MuiInputBase-input': { color: theme === "light" ? "black" : "white" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: theme === "light" ? "grey" : "#808B96" },
                    '&:hover fieldset': { borderColor: "#808B96" },
                    '&.Mui-focused fieldset': { borderColor: "#808B96" },
                  }}}
          />

          {errorMsg && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMsg}</Alert>}

          <Tooltip title="Login" placement="right" arrow>
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: 30, color: theme === "light" ? "white" : "black",
                    backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
                    transform: "translateY(-8px)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            </Button>
          </Tooltip>
        </form>
        <small style={{ color: theme === "light" ? "#273746" : "#03DAC5" }}>
          Need an account? <RouterLink to="/signup" style={{ color: theme === "light" ? "#273746" : "#03DAC5", textDecoration: "underline" }}>Register Here</RouterLink>
        </small>
      </section>

      <Grid container spacing={4} px={{ xs: 2, md: 6 }} py={6}>
        <Grid item xs={12} md={5}>
          <Card sx={{ backgroundColor: theme === "light" ? "#fdfdfd" : "#2b2b2b",
                      color: theme === "light" ? "#1a1a1a" : "#f1f1f1",
                      borderRadius: 4, boxShadow: 6, height: "100%", p: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                🔍 Navigating the 2025 Job Market
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                In 2025, the job landscape is shaped by <strong>AI innovation</strong>,
                <strong> remote-first work</strong>, and <strong> niche skill specialization</strong>.
                Candidates are expected to not only meet the required qualifications but also
                showcase adaptability, brand presence, and continuous learning.
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                🎯 How <strong>RiteMatch</strong> gives you the edge:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                <li style={{ marginBottom: "10px" }}>✅ <strong>Smart Resume Upload</strong> instantly matches your skills with open roles.</li>
                <li style={{ marginBottom: "10px" }}>🔧 <strong>Profile Optimization</strong> improves your visibility to recruiters.</li>
                <li style={{ marginBottom: "10px" }}>💼 <strong>Curated Job Matches</strong> tailored by AI to your interests & experience.</li>
                <li style={{ marginBottom: "10px" }}>📊 <strong>Match Scores</strong> show how well your profile fits each job.</li>
                <li>✨ <strong>Weekly Insights</strong> keep you informed about your market position.</li>
              </Box>
              <Typography variant="body2" sx={{ fontStyle: "italic", textAlign: "center", mt: 3, color: theme === "light" ? "#34495e" : "#aab7b8" }}>
                “Opportunities don't happen. You create them — and RiteMatch helps you do just that.”
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <JobListingsSlider />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserLogin;