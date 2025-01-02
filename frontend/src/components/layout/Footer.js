import React from "react";
import styles from "./Footer.module.css";
import { Box, Typography, Grid, Link,IconButton, Container } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from "../layout/ThemeContext";


const Footer = (props) => {
  const { theme} = useTheme();
  const currentYear = new Date().getFullYear();

  const footerClass = `${styles.footer} ${theme === "light" ? styles.light : styles.dark}`;

  return (
    <Box
      className={footerClass}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item>
          <Link href="#" sx={{ mx: 2, color: theme === "light" ? "white" : "#03DAC5"  }}>
            About Us
          </Link>
          <Link href="#" sx={{ mx: 2, color: theme === "light" ? "white" : "#03DAC5"  }}>
            Contact Us
          </Link>
          <Link href="#" sx={{ mx: 2, color: theme === "light" ? "white" : "#03DAC5"  }}>
            Support
          </Link>
          <Link href="#" sx={{ mx: 2, color: theme === "light" ? "white" : "#03DAC5"  }}>
            Careers
          </Link>
        </Grid>
        <Grid item xs={12}> 
          <IconButton sx={{ color: theme === "light" ? "white" : "#03DAC5" }} href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: theme === "light" ? "white" : "#03DAC5" }} href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton sx={{ color: theme === "light" ? "white" : "#03DAC5" }} href="https://instagram.com">
            <InstagramIcon />
          </IconButton>
          <IconButton sx={{ color: theme === "light" ? "white" : "#03DAC5" }} href="https://linkedin.com">
            <LinkedInIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", sm: "block"}, color: theme === "light" ? "white" : "#03DAC5" }}
          >
            Copyright © {currentYear} RiteMatch. All rights reserved.
          </Typography>
        </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

