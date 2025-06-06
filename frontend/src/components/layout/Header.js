import React, { useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "../layout/ThemeContext";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { Button, Tooltip, Snackbar, Alert, Slide, Box } from "@mui/material";
import { useUser } from "./UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import Logo_light from "../../../src/assets/logo_ligt.png";
import Logo_dark from "../../../src/assets/logo_dar.png";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Header = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear(); // clear token or session
    setOpenSnackbar(true);
    navigate("/login");
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <>
      <Box
        className={`${styles.header} ${
          theme === "light" ? styles.light : styles.dark
        }`}
        component="header"
      >
        {/* Logo Section */}
        <Box className={styles.leftSection}>
          <img
            src={theme === "light" ? Logo_dark : Logo_light}
            alt="Logo"
            className={styles.logo}
          />
        </Box>

        {/* Navigation Links */}
        {user && (
          <Box className={styles.navSection}>
            <NavLink to="/resume" className={styles.navLink}>
              Resume Insights
            </NavLink>
            <NavLink to="/jobs" className={styles.navLink}>
              My Jobs
            </NavLink>
            <NavLink to="/tailor" className={styles.navLink}>
              Tailor Resume
            </NavLink>
            <NavLink to="#" className={styles.navLink}>
              Track Jobs
            </NavLink>
          </Box>
        )}
        {/* Action Buttons */}
        <Box className={styles.rightSection}>
          {user && (
            <Tooltip title="Logout" arrow>
              <Button onClick={handleLogout} className={styles.iconBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </Button>
            </Tooltip>
          )}

          <Tooltip
            title={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
            arrow
          >
            <Button onClick={toggleTheme} className={styles.iconBtn}>
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Logout Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Logged out successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
