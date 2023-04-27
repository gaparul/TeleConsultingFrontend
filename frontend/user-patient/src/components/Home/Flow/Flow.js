import React from "react";

import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import flowImage from "./image/flowchart.png";

const theme = createTheme();

const Flow = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
        }}
      >
        <Typography variant="h3" fontStyle="center" sx={{ color: "#0d47a1" }}>
          Know How It Works!
        </Typography>

        <Box
          component="img"
          sx={{
            height: 780,
            width: 1675,
          }}
          alt=""
          src={flowImage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Flow;
