import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import SockJsClient from 'react-stomp';
import { useLocation } from "react-router-dom";

const SOCKET_URL = 'http://localhost:8083/ws-message';
const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
        Waiting Queue...
      </Typography>
      <Typography>

      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" disabled>
        Join Call
      </Button>
    </CardActions>
  </React.Fragment>
);

// ----------------------------------------------------------------------------------------

WaitingRoom.propTypes = {
  appointment: PropTypes.object,
};

// ----------------------------------------------------------------------------------------

export default function WaitingRoom (){

  const { state } = useLocation();

  const {appointment} = state;

  console.log('inside waiting room',appointment)
  console.log('queuesize', appointment.doctorDetails.doctorQueueSize)
  const queueToken = parseInt(appointment.doctorDetails.doctorQueueSize)+1;
  const currentQueue = parseInt(appointment.doctorDetails.doctorCurrentQueueSize);
  const [queueSize, setQueueSize] = React.useState(queueToken);
  const [message, setMessage] = React.useState(currentQueue);
  const [waitingQueue, setWaitingQueue] = React.useState(currentQueue-queueToken);

  const handledisconnect = async () => {
    let api = "http://localhost:8083/api/patientDetails/onCallDisconnect";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(appointment),
      redirect: "follow",
    };
    await fetch(
      api,
      requestOptions
    )
      .then((response) => {
        if(response.status === 200) {
          console.log("success of on call disconnect");
        }
      })
      .catch((error) => console.log("error", error));
  };

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log("message from server ");
    console.log(msg);
    setMessage(msg);
    setWaitingQueue(msg-queueSize);
  }
  return (
    <Box sx={{ minWidth: 300 }}>
      <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/message']}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
          />
      {/* <Card variant="outlined">{card}</Card> */}
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
        Waiting Queue 
      </Typography>
      <Typography sx={{ fontSize: 100 }} color="#1a237e" >
      {waitingQueue}
      </Typography>
    </CardContent>
    <CardActions>
      {waitingQueue>0 && (<Button variant="contained" disabled>
        Join Call
      </Button>) 
       }
       {waitingQueue == 0 && (<Button variant="contained" color="#1a237e">
        Join Call
      </Button>)}
    </CardActions>
  </React.Fragment>
  </Card>
          <Button onClick={handledisconnect}>Disconnect</Button>
      Message from socket = {message}<br/>
      Queue = {queueSize}<br/>
      Waiting line = {waitingQueue}
    </Box>
  );
};

// export default WaitingRoom;
