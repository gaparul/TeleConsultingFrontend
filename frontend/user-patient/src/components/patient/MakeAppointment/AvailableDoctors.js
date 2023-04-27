import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { Container, Button, Typography, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import WaitingRoom from "./WaitingRoom";
import { Navigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: blue[100],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(doctorID, name, specialization, availability) {
  return { doctorID, name, specialization, availability };
}

AvailableDoctors.propTypes = {
  category: PropTypes.string,
};

export default function AvailableDoctors({ category }) {

  const [rows, setrows] = React.useState([]);
  const [isAvailable, setAvailable] = React.useState(false);
  const [appointmentSuccess, setSuccess] = React.useState(false);
  const [appointment, setappointment] = React.useState({});

  const patient = localStorage.getItem("patient");
  const jwtToken = localStorage.getItem("token")
  const patientDetails = JSON.parse(patient);
  const patientID = patientDetails.patientId;

  let appointmentDetails = {};

  const createAppointment = async (e, doctorID) => {
    e.preventDefault();

    let api = "http://localhost:8083/api/patientDetails/createAppointment";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("Authorization",`Bearer ${jwtToken}`);

    const appointmentData = {
      appointmentOpdType: category,
      patientDetails: parseInt(patientID),
      doctorID: parseInt(doctorID),
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(appointmentData),
      redirect: "follow",
    };
    await fetch(
      api,
      requestOptions
    )
      .then(async (response) => {
        if(response.status === 200) {
            
            await response.json().then((e)=>{
              console.log(e.appointmentID)
              appointmentDetails = e;
              console.log(appointmentDetails)
              setappointment(appointmentDetails);
              <WaitingRoom appointment={appointment}/>
            })

            setSuccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getAvailableDoctorWithSelectedSpecialisation = async (category) => {
    let api =
      "http://localhost:8083/api/patientDetails/AvailableDoctorsBySpecialisation";
    let doctors = [];

    const rawData = {
      category: category,
    };

    setAvailable(false);
    setSuccess(false);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("Authorization",`Bearer ${jwtToken}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawData),
      redirect: "follow",
    };
    await fetch(api, requestOptions)
      .then(async (response) => {
        if (response.status === 200) {
          setAvailable(true);
          await response.json().then(async (e) => {
            await e.forEach((doctor) => {
              const id = JSON.stringify(doctor.doctorID);
              const name = doctor.doctorFirstName + " " + doctor.doctorLastName;
              const data = createData(
                id,
                name,
                doctor.doctorSpecialisation,
                doctor.doctorAvailable
              );
              doctors.push(data);
            });
            setrows(doctors);
          });
        }
        if (response.status === 404) {
          console.log("setting available false");
          setAvailable(false);
        }
      })
      .catch((error) => {
        setAvailable(false);
        console.log("error", error);
      });
  };

  React.useEffect(() => {
    getAvailableDoctorWithSelectedSpecialisation(category);
  }, [category]);

  return (
    <Container>
      <Typography variant="h6"> Available {category} Specialists</Typography>
      {isAvailable === true ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Doctor ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Specialization</StyledTableCell>
                <StyledTableCell align="left">Availability</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.doctorID}>
                  <StyledTableCell component="th" scope="row">
                    {row.doctorID}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.specialization}</StyledTableCell>
                  <StyledTableCell>{row.availability}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="info"
                      endIcon={<SendIcon />}
                      onClick={async (e) => await createAppointment(e, row.doctorID)}
                    >
                      Create Appointment
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">
          {" "}
          No {category} Specialists Available!
        </Typography>
      )}
      {appointmentSuccess && (
        <>
        <Alert severity="success">Appointment Successfully created!</Alert>
        <Navigate to={"/patient/dashboard/waiting"} state={{appointment}}/>
        {/* <WaitingRoom appointment={appointment}/> */}
        </>
      )}
      
    </Container>
  );
}
