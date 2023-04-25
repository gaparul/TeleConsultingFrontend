import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8083/ws-message';
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

// ----------------------------------------------------------------------------------------

WaitingRoom.propTypes = {
  appointment: PropTypes.object,
};

// ----------------------------------------------------------------------------------------

export default function WaitingRoom ({appointment}){

  console.log('inside waiting room',appointment)
  const [message, setMessage] = React.useState(0);
  // let appointmentData;
  // let queueSize;
  console.log('queuesize', appointment.doctorDetails.doctorQueueSize)
  const queueToken = parseInt(appointment.doctorDetails.doctorQueueSize);
  // const [appointmentData, setAppointmentData] = React.useState();
  const [queueSize, setQueueSize] = React.useState(queueToken);
  // const getAppointment = async () => {

  //   // let apptid = parseInt(appt);
  //   const getApptApi = `http://localhost:8083/api/patientDetails/getAppointmentById/`;
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: "",
  //     redirect: "follow",
  //   };
  //   await fetch(
  //     getApptApi,
  //     requestOptions
  //   )
  //     .then((response) => {
  //       if(response.status === 200) {
  //         response.json().then((e)=>{
  //           console.log(e);
  //           // setAppointmentData(e);
  //           appointmentData = e;
  //           queueSize = e.doctorDetails.doctorQueueSize;
  //           console.log(appointmentData);
  //           console.log("queue size is : ");
  //           console.log(queueSize);
  //           // console.log(JSON.stringify(appointmentData));
  //           // console.log(appointmentData.doctorDetails.doctorQueueSize);
  //           // setQueueSize(e.doctorDetails.doctorQueueSize);
  //         });
          
  //         handledisconnect();
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };
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
          console.log("success");
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
  }
  return (
    <Box sx={{ minWidth: 300 }}>
      <Card variant="outlined">{card}</Card>
      <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/message']}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
          />
          <Button onClick={handledisconnect}>Disconnect</Button>
      Message from socket = {message}
      Queue = {queueSize}
    </Box>
  );
};

// export default WaitingRoom;
