import React from "react";
import { Box, Typography, Grid, Link, IconButton, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "../layout/ThemeContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const footerClass = `${styles.footer} ${theme === "light" ? styles.light : styles.dark}`;

  return (
    <Box className={footerClass}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {/* Links Column */}
          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="#" underline="hover" sx={{ display: "block", mb: 0.5, color: "inherit" }}>
                About Us
              </Link>
              <Link href="#" underline="hover" sx={{ display: "block", mb: 0.5, color: "inherit" }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Links Column */}
          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="#" underline="hover" sx={{ display: "block", mb: 0.5, color: "inherit" }}>
                Support
              </Link>
              <Link href="#" underline="hover" sx={{ display: "block", mb: 0.5, color: "inherit" }}>
                Careers
              </Link>
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent={{ xs: "center", sm: "flex-end" }} gap={1}>
              <IconButton href="https://facebook.com" sx={{ color: "inherit" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" sx={{ color: "inherit" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://instagram.com" sx={{ color: "inherit" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://linkedin.com" sx={{ color: "inherit" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "inherit" }}
            >
              © {currentYear} RiteMatch. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;