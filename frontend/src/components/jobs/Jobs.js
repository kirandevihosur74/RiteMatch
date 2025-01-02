import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import { useTheme } from "../layout/ThemeContext";
import { Close as CloseIcon } from "@mui/icons-material";
import classes from "./Jobs.module.css";
import {Link} from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const jobsPerPage = 9;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const { theme } = useTheme();

  console.log("Current theme:", theme);

  const themeStyle = theme === "light" ? classes.light : classes.dark;

  console.log("ThemeStyle:", themeStyle);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // const savedPage = localStorage.getItem("jobsPage");
    // if (savedPage) {
    //   setCurrentPage(parseInt(savedPage)); // Set the current page from local storage
    // } else {
    //   // If no page is saved, set it to the defaultPage
    //   setCurrentPage(defaultPage);
    // }
    setCurrentPage(defaultPage);
    setIsLoading(true);
    let timeoutId = null;

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/jobs/");
        if (response.ok) {
          const data = await response.json();
          // Wait for the remainder of the 5 seconds before setting the state
          timeoutId = setTimeout(() => {
            setJobs(data);
            setIsLoading(false);
          }, Math.max(0, 500 - (Date.now() - startTime)));
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        setError(error);
        setIsLoading(false); // You might want to keep it false in case of error
      }
    };

    const startTime = Date.now();
    fetchData();

    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [defaultPage]);

  //   const handleJobClick = (jobUrl) => {
  //     // Save the current state to local storage
  //     localStorage.setItem('jobsPage', currentPage.toString());
  //     window.open(jobUrl, '_blank');
  //   };

  if (error) {
    return <p>Error loading jobs: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" marginBottom={3} sx={{
          color: theme === "light" ? "#273746;" : "#03DAC5",
        }}>
          Job Listings
        </Typography>
        <Typography variant="h6" marginBottom={3}>
        <Tooltip title="Check your Job Score" placement="top" arrow>
          <Button
          component={Link}
          to="/jobscore"
            sx={{
              textTransform: "capitalize",
              borderRadius: "10px",
              fontSize: "18px",
              color: theme === "light" ? "#273746;" : "#03DAC5",
              "&:hover": {
                backgroundColor: theme === "light" ? "#808B96" : "#00C7B3",
                color: theme === "light" ? "white" : "#1E1E1E",
              },
              // backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
            }}
          >
            Job Score
          </Button>
          </Tooltip>
        </Typography>
      </div>
      <Grid container spacing={3}>
        {currentJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Paper
              sx={{
                height: "160px",
                width: "100%",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
                borderRadius: "18px",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
                },
                backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
                color: theme === "light" ? "white" : "#03DAC5",
              }}
              elevation={3}
              onClick={() => handleJobClick(job)}
              style={{ cursor: "pointer" }}
            >
              <Box padding={2}>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="subtitle1">{job.company}</Typography>
                <Typography variant="body2">{job.location}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <Pagination
          sx={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
            borderRadius: "18px",
            backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
            color: theme === "light" ? "white" : "#03DAC5",
            "& .MuiPaginationItem-root": {
              color: theme === "light" ? "white" : "#03DAC5",

              // Specific style for the active page number
              "&.Mui-selected": {
                color: theme === "light" ? "black" : "white",
              },
            },
          }}
          className={themeStyle}
          count={Math.ceil(jobs.length / jobsPerPage)}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            localStorage.setItem("jobsPage", value.toString());
          }}
          color="primary"
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="job-description-dialog"
        sx={{
          borderRadius: "20px", // Set the desired border radius
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Raleway, sans-serif",
            fontWeight: "900",
            backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
            color: theme === "light" ? "white" : "#03DAC5",
          }}
        >
          {selectedJob?.title}
          <IconButton
            className={classes.iconButton}
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
            color: theme === "light" ? "white" : "#03DAC5",
          }}
        >
          <h3 style={{ marginTop: "-4px", fontWeight: "500" }}>
            {selectedJob?.company}
          </h3>
          <h5 style={{ marginTop: "-10px", fontWeight: "200" }}>
            {selectedJob?.location}
          </h5>
          <h4 style={{ fontWeight: "550" }}>About the Job </h4>
          <DialogContentText
            sx={{
              backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
              color: theme === "light" ? "white" : "#03DAC5",
            }}
          >
            <p style={{ textAlign: "justify" }}>{selectedJob?.description}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: theme === "light" ? "#808b96" : "#1E1E1E",
            color: theme === "light" ? "white" : "#03DAC5",
          }}
        >
          <Button
            sx={{
              borderRadius: "10px",
              color: theme === "light" ? "white" : "#03DAC5",
              "&:hover": {
                backgroundColor: theme === "light" ? "#1976D2" : "#00C7B3",
                color: theme === "light" ? "white" : "#1E1E1E",
              },
              // backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
            }}
            onClick={() => window.open(selectedJob?.jobUrl, "_blank")}
          >
            Visit Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Jobs;
