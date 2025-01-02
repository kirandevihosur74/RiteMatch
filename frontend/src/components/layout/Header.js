import React, { useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "../layout/ThemeContext";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { Button, Tooltip } from "@mui/material";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";
import Logo_light from "../../../src/assets/logo_ligt.png";
import Logo_dark from "../../../src/assets/logo_dar.png";
import { NavLink } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Header = ({ username }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    setUser(null);
    setOpenSnackbar(true);
    navigate("/login");
  };

  const headerClass = `${styles.header} ${
    theme === "light" ? styles.light : styles.dark
  }`;

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <header className={headerClass}>
        {theme === "light" ? (
          <img
            src={Logo_dark}
            alt="Company Logo"
            style={{ height: "50px", marginLeft: "10px" }}
          />
        ) : (
          <img
            src={Logo_light}
            alt="Company Logo"
            style={{ height: "50px", marginLeft: "10px" }}
          />
        )}
        <NavLink to="/" className={styles.navLink}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: theme === "light" ? "white" : "#03DAC5",
            }}
          >
            Resume Builder
          </p>
        </NavLink>
        <NavLink to="/" className={styles.navLink}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: theme === "light" ? "white" : "#03DAC5",
            }}
          >
            Job Seeker
          </p>
        </NavLink>
        <NavLink to="/" className={styles.navLink}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: theme === "light" ? "white" : "#03DAC5",
            }}
          >
            Employers
          </p>
        </NavLink>
        <NavLink to="/" className={styles.navLink}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: theme === "light" ? "white" : "#03DAC5",
            }}
          >
            Collaborate
          </p>
        </NavLink>
        {user && (
          <Tooltip title="Logout" placement="bottom" arrow>
            <Button
              sx={{
                marginLeft: "30rem",
                borderRadius: "25%",
                minWidth: "48px",
                width: "48px",
                height: "48px",
                padding: "0",
                color: theme === "light" ? "black" : "black",
                backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
                "&:hover": {
                  backgroundColor: theme === "light" ? "#273746" : "#808B96",
                },
                transform: "translateY(-1px)",
              }}
              variant="contained"
              type="submit"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </Button>
          </Tooltip>
        )}
        <Tooltip
          title={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
          placement="bottom"
          arrow
        >
          <Button
            onClick={toggleTheme}
            sx={{
              marginRight: "10px",
              borderRadius: "25%",
              minWidth: "48px",
              width: "48px",
              height: "48px",
              padding: "0",
              color: theme === "light" ? "black" : "black",
              backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
              "&:hover": {
                backgroundColor: theme === "light" ? "#273746" : "#808B96",
              },
              transform: "translateY(-1px)",
            }}
            variant="contained"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Tooltip>
      </header>
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
    </React.Fragment>
  );
};

export default Header;
