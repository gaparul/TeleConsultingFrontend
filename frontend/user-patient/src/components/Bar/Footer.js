import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright() {
  return (
    <>
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="primary" href="/home">
        Team-8 e-Consultation
      </Link>{" "}
      {new Date().getFullYear()}
      {".         "}
      <Link color="primary" href="https://github.com/gaparul/TeleConsultingPlatform">
      <GitHubIcon/>
      {"Github FrontEnd       "}
      </Link>
      <Link color="primary" href="https://github.com/Rupen-project/TeleConsulting">
      <GitHubIcon/>
      {"Github Backend"}
      </Link>
    </Typography>
    
    </>

  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#bbdefb",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" >
          This project is a part of Healthcare Application Development Project
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};
export default Footer;
