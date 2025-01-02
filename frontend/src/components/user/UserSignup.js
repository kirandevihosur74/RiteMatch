import React from "react";
import classes from "./UserSignup.module.css";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { getCode, getNames } from "country-list";
import { useTheme } from "../layout/ThemeContext";
import axios from "axios"; // Import axios
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("30549946986");
  const [country, setCountry] = useState("US");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stateName, setStateName] = useState("");
  const { theme } = useTheme();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const themeStyle = theme === "light" ? classes.light : classes.dark;

  const countryNames = getNames();
  const countries = countryNames.map((name) => ({
    label: name,
    value: getCode(name),
  }));

  function validateEmail(email) {
    const re =
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formErrors = {};

    // Validate form inputs
    if (!firstName.trim()) formErrors.firstName = "First name is required";
    if (!lastName.trim()) formErrors.lastName = "Last name is required";
    if (!validateEmail(email)) formErrors.email = "Email is invalid";
    if (!password) formErrors.password = "Password is required";
    if (password !== repassword)
      formErrors.repassword = "Passwords do not match";
    // ... add other validation checks as needed

    // If there are errors, update the state and stop form submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      user: {
        first_name: firstName, // Assuming firstName is a state variable for the user's first name
        last_name: lastName, // Assuming lastName is a state variable for the user's last name
        email: email, // Assuming email is a state variable for the user's email
        password: password, // Assuming password is a state variable for the user's password
      },
      dateOfBirth: selectedDate && selectedDate.format("YYYY-MM-DD"), // Format date as required
      address_1: address1, // Assuming address1 is a state variable for the user's primary address
      address_2: address2, // Assuming address2 is a state variable for the user's secondary address
      city: city, // Assuming city is a state variable for the user's city
      country: country, // Assuming country is a state variable for the user's country
      state: stateName, // Assuming stateName is a state variable for the user's state
      zip: zipCode, // Assuming zipCode is a state variable for the user's zip code
      cell: phone, // Assuming phone is a state variable for the user's cell phone number
    };

    axios
      .post("http://127.0.0.1:8000/user/signup/", userData)
      .then((response) => {
        // Handle response here (e.g., redirect to login or display a success message)
        console.log("User registered:", response.data);
        setOpenSnackbar(true); // Open the Snackbar on successful registration
        setTimeout(() => {
          navigate("/login"); // Navigate to login page after a delay
        }, 500);
      })
      .catch((error) => {
        // Handle error here (e.g., display error message)
        console.error("Error during registration:", error);
      });
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          User registered successfully!
        </Alert>
      </Snackbar>
      <section className={`${classes.user} ${themeStyle}`}>
        <h2 style={{ color: theme === "light" ? "#273746" : "#03DAC5" }}>
          Let's find a job match for you &#x1F642;
        </h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              type="text"
              variant="outlined"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
              sx={{
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
              type="text"
              variant="outlined"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
              sx={{
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
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              type="email"
              variant="outlined"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              sx={{
                width: "50%",
                marginBottom: 4,
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                slotProps={{
                  textField: {
                    sx: {
                      width: "50%",
                      "& .MuiInputLabel-root": {
                        color: theme === "light" ? "#808B96" : "#808B96",
                      },
                      "& .MuiInputBase-input": {
                        color: theme === "light" ? "black" : "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme === "light" ? "grey" : "#808B96",
                        },
                        "&:hover fieldset": {
                          borderColor:
                            theme === "light" ? "#808B96" : "#808B96",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor:
                            theme === "light" ? "#808B96" : "#808B96",
                        },
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              label="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{
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
              label="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{
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
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
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
              select
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
                style: { color: "#808B96" },
              }}
              style={{ textAlign: "left" }}
              sx={{
                "& label": { color: theme === "light" ? "#808B96" : "#808B96" },
                "& .MuiInputBase-input": {
                  color: theme === "light" ? "black" : "#808B96",
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
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              label="State"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
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
              label="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
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
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              InputLabelProps={{
                style: { color: "#808B96" },
              }}
              type="password"
              variant="outlined"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              fullWidth
              sx={{
                marginBottom: 4,
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
              type="password"
              variant="outlined"
              label="Renter Password"
              onChange={(e) => setRepassword(e.target.value)}
              value={repassword}
              required
              fullWidth
              sx={{
                marginBottom: 4,
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
          </Stack>
          <Tooltip title="Register" placement="right" arrow>
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-user-round-plus"
              >
                <path d="M2 21a8 8 0 0 1 13.292-6" />
                <circle cx="10" cy="8" r="5" />
                <path d="M19 16v6" />
                <path d="M22 19h-6" />
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
          Already have an account?{" "}
          <RouterLink
            to="/login"
            underline="hover"
            style={{
              color: theme === "light" ? "#273746" : "#03DAC5",
              fontFamily: "'Roboto', sans-serif",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Login Here
          </RouterLink>
        </small>
      </section>
    </React.Fragment>
  );
};

export default UserSignup;
