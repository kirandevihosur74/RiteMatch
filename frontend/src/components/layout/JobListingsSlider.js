// JobListingsSlider.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Paper, Grid, Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./JobListingSlider.module.css";
import { useTheme } from "../layout/ThemeContext"

const JobListingsSlider = () => {
  const [jobs, setJobs] = useState([]);
  const { theme } = useTheme();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/jobs/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data.slice(0, 10)); // Get the first 10 jobs
      } catch (error) {
        console.error("Fetching jobs failed: ", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Slider {...sliderSettings}>
        {jobs.map((job) => (
          <Grid container spacing={1} key={job.id} padding={1}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  height: "160px",
                  width: "100%",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
                  borderRadius: "18px",
                  backgroundColor: theme === "light" ? "white" : "#1E1E1E",
                  color: theme === "light" ? "black" : "#03DAC5"
                }}
                elevation={3}
              >
                <Box padding={3}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="subtitle1">{job.company}</Typography>
                  <Typography variant="body2">{job.location}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ))}
    </Slider>
  );
};

export default JobListingsSlider;
