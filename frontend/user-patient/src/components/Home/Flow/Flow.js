import React from "react";

import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import flowImage from "./image/flowchart.png";

const theme = createTheme();

const Flow = () => {
  return (
    // <ThemeProvider theme={theme}>
    //   <Box
    //     sx={{
    //       py: 3,
    //       px: 2,
    //       mt: "auto",
    //     }}
    //   >
        <div>
            <Typography variant="h3" fontStyle="center" sx={{ color: "#0d47a1" }}>
          Know How It Works!
        </Typography>

        <Box
          component="img"
          sx={{
            height: '10%',
            width: 1,
          }}
          alt=""
          src={flowImage}
        />
        </div>
    //   </Box>
    // </ThemeProvider>
  );
};

export default Flow;
