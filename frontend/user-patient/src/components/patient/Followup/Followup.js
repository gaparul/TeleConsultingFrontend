import React from 'react'

import { Container, Stack, Typography, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { tableCellClasses } from "@mui/material/TableCell";
import { blue } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from "react-router-dom";

import WaitingRoom from '../MakeAppointment/WaitingRoom';
import { async } from '@firebase/util';

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
  }
}));

function createData(appointmentId, appointmentDate, opdType, doctorName, followupDate, doctorID) {
  return {
    appointmentId,
    appointmentDate,
    opdType,
    doctorName,
    followupDate,
    doctorID
  };
}


const Followup = () => {

  const navigate = useNavigate();

  const [rows, setrows] = React.useState([]);
  const [appointment, setappointment] = React.useState({});
  const [appointmentSuccess, setSuccess] = React.useState(false);

  const patient = localStorage.getItem("patient");
  const jwtToken = localStorage.getItem("token");
  const patientData = JSON.parse(patient);

  let appointmentDetails = {};
  // -------------------------------------------------------------------------

  const createAppointment = async (doctorID, category) => {

    const patientID = patientData.patientId;

    let api = "http://localhost:8083/api/patientDetails/createAppointment";
    
    // patientDetails = patiendID, appointmentOPDType = selected specialisation category

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("Authorization", `Bearer ${jwtToken}`);
    
    
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

  const getAppointment = async (e, doctorID, appointmentId) => {
    e.preventDefault();
    const followupApi = `http://localhost:8083/api/patientDetails/makeFollowupFalse/${appointmentId}`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("Authorization", `Bearer ${jwtToken}`);

    const requestOpt = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    await fetch(followupApi, requestOpt)
      .then(async response => {
        await response.json().then((e) => {
          console.log(e);
          console.log("Made follow up false successfully!")
        })
      })
      .catch(error => console.log('error', error));

    const api = `http://localhost:8083/api/patientDetails/getDoctorById/${doctorID}`;

    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    myHeader.set("Authorization", `Bearer ${jwtToken}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeader,
      redirect: 'follow'
    };
    
    await fetch(api, requestOptions)
      .then(async response => {
        await response.json().then(async (e) => {
          console.log(e);
          const isDoctorAvailable = parseInt(e.doctorAvailable);

          if(isDoctorAvailable) {
            await createAppointment(doctorID, e.doctorSpecialisation)
          }
          else {
            navigate('/patient/dashboard/makeAppointment')
          }
        })
      })
      .catch(error => console.log('error', error));
  }

  const getFollowUp = async () => {
    const patientID = patientData.patientId;

    const api = `http://localhost:8083/api/patientDetails/getFollowUps/${patientID}`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("Authorization", `Bearer ${jwtToken}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    const appointmentRows = []
    
    await fetch(api, requestOptions)
      .then(async response => {
        await response.json().then(async (e) => {
          await e.forEach((appointment) => {
            const id = JSON.stringify(appointment.appointmentID);
            const opdType = appointment.appointmentOpdType;
            const date = appointment.appointmentDate;
            const doctorId = appointment.doctorDetails.doctorID;
            const doctorFname = appointment.doctorDetails.doctorFirstName;
            const doctorLname = appointment.doctorDetails.doctorLastName;
            const doctorName = `${doctorFname}  ${doctorLname}`;
            const followupDate = appointment.followUpDay;
            const data = createData(
              id,
              date,
              opdType,
              doctorName,
              followupDate,
              doctorId
            );
            appointmentRows.push(data);
          });
          setrows(appointmentRows);
        });
      })
      .catch(error => console.log('error', error));
  }

  // -------------------------------------------------------------------------

  React.useEffect(() => {
    getFollowUp();
  }, []);

  // -------------------------------------------------------------------------

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Follow Up
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Appointment ID</StyledTableCell>
                <StyledTableCell align="left">Appointment Date</StyledTableCell>
                <StyledTableCell align="left">OPD Type</StyledTableCell>
                <StyledTableCell align="left">Doctor</StyledTableCell>
                <StyledTableCell align="left">Follow Up Date</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.appointmentId}>
                  <StyledTableCell component="th" scope="row">
                    {row.appointmentId}
                  </StyledTableCell>
                  <StyledTableCell>{row.appointmentDate}</StyledTableCell>
                  <StyledTableCell>{row.opdType}</StyledTableCell>
                  <StyledTableCell>{row.doctorName}</StyledTableCell>
                  <StyledTableCell>{row.followupDate}</StyledTableCell>
                  <StyledTableCell>
                  <Button
                      variant="outlined"
                      color="info"
                      startIcon={<AddIcon color="info"/>}
                      onClick={async (e) => await getAppointment(e, row.doctorID, row.appointmentId)}
                    >
                      Get Appointment
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {appointmentSuccess && (
        <>
        <Alert severity="success">Appointment Successfully created!</Alert>
        <Navigate to={"/patient/dashboard/waiting"} state={{appointment}}/>
        {/* <WaitingRoom appointment={appointment}/> */}
        </>
      )}
      </Container>
    </>
  )
}

export default Followup