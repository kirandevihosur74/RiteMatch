import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Paper,
  Grid,
  Pagination,
  Button,
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import "./JobScore.module.css";
import { useTheme } from "../layout/ThemeContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const JobScore = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const { theme } = useTheme();

  const skillsOptions = [
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "Data Analysis",
    "Machine Learning",
    "Data Modeling",
    "Web Development",
    "React",
    "Node.js",
    "Full Stack Development",
    "Html",
    "CSS",
    "C++",
    "Ruby",
    "Angular",
    "Vue.js",
    "Django",
    "Flask",
    "Git",
    "REST API",
    "GraphQL",
    "UI/UX Design",
    "DevOps",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Big Data",
    "NoSQL",
    "Testing/QA",
    "Agile/Scrum",
    "CI/CD",
    "Cybersecurity",
    "Blockchain",
  ];

  const progressBarStyles = buildStyles({
    pathTransitionDuration: 0.5,
    pathColor: theme === "light" ? "white" : "#03DAC5",
    textColor: theme === "light" ? "white" : "#03DAC5",
    trailColor: theme === "light" ? "#273746" : "#1E1E1E",

    backgroundColor: theme === "light" ? "white" : "#1E1E1E",
    // This will reduce the size of the circular progress bar
    strokeWidth: 1, // Reduce the stroke width to decrease size
    // You can also add textSize here if you want to adjust the text size
  });

  const calculateJobScore = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/match/skills/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: selectedSkills }),
      });

      if (response.ok) {
        const data = await response.json();
        setJobData(data);
        // setJobScore(data.jobScore);
        setOpenDialog(true); // Open the dialog when job score is received
      } else {
        console.error("Failed to fetch job score");
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <Box sx={{ padding: 20 }}>
      <Autocomplete
        multiple
        id="skills"
        sx={{
          backgroundColor: theme === "light" ? "white" : "white",
          color: theme === "light" ? "white" : "#1E1E1E",
          width: "400px",
          marginLeft: "350px",
          "& .MuiInputLabel-root": {
            // This will target the label
            color: "desired-color-here", // Replace 'desired-color-here' with the color you want
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme === "light" ? "black" : "#03DAC5", // Replace 'desired-border-color' with the color you want
            },
            "&:hover fieldset": {
              borderColor: "light" ? "black" : "#03DAC5", // Replace 'hover-border-color' with the color you want
            },
            "&.Mui-focused fieldset": {
              borderColor: "light" ? "black" : "#03DAC5", // Replace 'focused-border-color' with the color you want
            },
          },
        }}
        options={skillsOptions}
        value={selectedSkills}
        onChange={(event, newValue) => {
          setSelectedSkills(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Skills"
            variant="outlined"
            fullWidth
          />
        )}
        clearText="Clear"
      />
      <Button
        sx={{
          textTransform: "capitalize",
          borderRadius: "10px",
          fontSize: "18px",
          marginTop: "50px",
          marginLeft: "460px",
          marginBottom: "40px",
          color: theme === "light" ? "#273746;" : "#03DAC5",
          "&:hover": {
            backgroundColor: theme === "light" ? "#808B96" : "#00C7B3",
            color: theme === "light" ? "white" : "#1E1E1E",
          },
          // backgroundColor: theme === "light" ? "#808B96" : "#03DAC5",
        }}
        onClick={calculateJobScore}
      >
        Check my Job Score
      </Button>
      {jobData && jobData.length > 0 && (
        <React.Fragment>
          <Grid container spacing={3}>
            {currentJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    height: "180px",
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
                  //onClick={() => handleJobClick(job)}
                  style={{ cursor: "pointer" }}
                >
                  <Box padding={2}>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="subtitle1">
                      Company: {job.company}
                    </Typography>
                    <Typography variant="body2">
                      Location: {job.location}
                    </Typography>

                    {/* <div style={{ marginLeft: "290px",marginTop:"-25px",width: "60px", height: "60px" }}>
                    <CircularProgressbar styles={progressBarStyles} value={job.eligibility_percentage} text={`${job.eligibility_percentage}%`} />
                    </div> */}
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor:
                            theme === "light" ? "#808b96" : "#1E1E1E",
                          color: theme === "light" ? "white" : "#03DAC5",
                        }}
                      >
                        View Job
                      </a>
                      <div
                        style={{
                          height: "60px",
                          width: "60px",
                          marginLeft: "220px",
                          marginTop: "10px",
                        }}
                      >
                        <CircularProgressbar
                          styles={progressBarStyles}
                          value={job.eligibility_percentage}
                          text={`${job.eligibility_percentage}%`}
                        />
                      </div>
                    </Box>
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
              count={Math.ceil(jobData.length / jobsPerPage)}
              page={currentPage}
              onChange={(event, value) => {
                setCurrentPage(value);
              }}
              color="primary"
            />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default JobScore;
