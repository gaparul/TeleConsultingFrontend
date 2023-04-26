import React from 'react'

import { Container, Stack, Typography, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { tableCellClasses } from "@mui/material/TableCell";
import { blue } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';

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

function createData(appointmentId, appointmentDate, opdType, doctorName, followupDate) {
  return {
    appointmentId,
    appointmentDate,
    opdType,
    doctorName,
    followupDate
  };
}


const Followup = () => {

  const [rows, setrows] = React.useState([]);

  const patient = localStorage.getItem("patient");
  const patientData = JSON.parse(patient);

  const getFollowUp = async () => {
    const patientID = patientData.patientId;

    const api = `http://localhost:8083/api/patientDetails/getFollowUps/${patientID}`;

    const requestOptions = {
      method: 'POST',
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
            const doctorFname = appointment.doctorDetails.doctorFirstName;
            const doctorLname = appointment.doctorDetails.doctorLastName;
            const doctorName = `${doctorFname}  ${doctorLname}`;
            const followupDate = appointment.followUpDay;
            const data = createData(
              id,
              date,
              opdType,
              doctorName,
              followupDate
            );
            appointmentRows.push(data);
          });
          setrows(appointmentRows);
        });
      })
      .catch(error => console.log('error', error));
  }

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
                      // onClick={async (e) => await downloadPrescription(e, row.date)}
                    >
                      Get Appointment
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Followup