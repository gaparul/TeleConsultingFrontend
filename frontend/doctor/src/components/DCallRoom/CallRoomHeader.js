import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CallRoomHeader=()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <a href="" style={{ textDecoration: 'none',color: 'white', }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',}}}>
            e-Consultation
          </Typography>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default CallRoomHeader;