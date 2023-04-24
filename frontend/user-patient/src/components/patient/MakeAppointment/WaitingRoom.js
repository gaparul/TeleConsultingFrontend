import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Waiting Queue...
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" disabled>
  Join Call
</Button>
      </CardActions>
    </React.Fragment>
  );

const WaitingRoom = () => {
  return (
    <Box sx={{ minWidth: 300}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default WaitingRoom