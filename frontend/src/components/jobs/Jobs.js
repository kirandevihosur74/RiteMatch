import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useUser } from "../layout/UserContext";
import { useTheme } from "../layout/ThemeContext";
import "react-circular-progressbar/dist/styles.css";
import CircularSpinner from "../layout/CircularSpinner";

const Jobs = () => {
  const { matchedJobs, setMatchedJobs } = useUser();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const jobsPerPage = 9;

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/ai-agent/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            intro: "Here are my skills. Recommend jobs accordingly.",
          }),
        });

        const data = await res.json();
        const sorted = [...data].sort(
          (a, b) =>
            (b.job?.eligibility_percentage || 0) -
            (a.job?.eligibility_percentage || 0)
        );

        setMatchedJobs(sorted);
        localStorage.setItem("matchedJobs", JSON.stringify(sorted));
      } catch (error) {
        console.error("Failed to fetch AI jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [setMatchedJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = matchedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const progressBarStyles = buildStyles({
    pathColor: theme === "light" ? "#4CAF50" : "#03DAC5",
    textColor: theme === "light" ? "#4CAF50" : "#03DAC5",
    trailColor: "#d6d6d6",
    strokeWidth: 8,
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {" "}
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularSpinner />

          {/* GIFs below the spinner */}
          <img
            src="http://media.giphy.com/media/C0KhKrQD3sITe/giphy.gif"
            alt="funny gif"
            width="400"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 3, sm: 5, md: 6 },
        mt: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 600,
          mb: 5,
          color: theme === "light" ? "#273746" : "#03DAC5",
        }}
      >
       🔍 Top Job Matches Based on Your Skills
      </Typography>

      <Grid container spacing={6}>
        {currentJobs.map((item, index) => {
          const job = item.job || item;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 1.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  backgroundColor: theme === "light" ? "#f2f4f8" : "#2a2a2a",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" mb={0.5}>
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme === "light" ? "#3f51b5" : "#03DAC5",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    View Job
                  </a>
                  <Box sx={{ height: 50, width: 50 }}>
                    <CircularProgressbar
                      value={job.eligibility_percentage || 75}
                      text={`${job.eligibility_percentage || 75}%`}
                      styles={progressBarStyles}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="center" mt={5}>
        <Pagination
          count={Math.ceil(matchedJobs.length / jobsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Jobs;
