import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VolunteerActivismTwoTone from "@mui/icons-material/VolunteerActivismTwoTone";

const CallRoomHeader=()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#1a237e"}}>
        <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          {" "}
          <VolunteerActivismTwoTone fontSize="large" />
          eConsultation
        </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default CallRoomHeader;