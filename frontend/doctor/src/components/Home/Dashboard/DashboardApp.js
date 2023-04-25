import React from 'react'
import { Container, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";

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

function createData(patientId, name, mobile, email, gender, dob) {
  return { patientId, name, mobile, email, gender, dob };
}

const DashboardApp = () => {

  const[rows, setrows] = React.useState([]);

  const getAppointments = async () => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);

    const api = `http://localhost:8083/api/patientDetails/getAllPatientOfGivenUserId/${userData.userID}`;

    const requestOptions = {
      method: "POST",
      body: "",
      redirect: "follow",
    };

    let patientRows = [];

    await fetch(api, requestOptions)
      .then(async (response) => {
        await response.json().then(async (e) => {
          await e.forEach((patient) => {
            console.log(patient.patientID);
            const id = JSON.stringify(patient.patientID);
            const name =
              patient.patientFirstName + " " + patient.patientLastName;
            const data = createData(
              id,
              name,
              patient.patientMobileNumber,
              patient.patientEmail,
              patient.patientGender,
              patient.patientDOB
            );
            patientRows.push(data);
          });
          setrows(patientRows);
        });
      })
      .catch((error) => console.log("error", error));
  };

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
            Today's Appointments
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Patient ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Mobile Number</StyledTableCell>
                <StyledTableCell align="left">Email ID</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Date Of Birth</StyledTableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.patientId} onClick={ e => handleClick(e, row)}>
                  <StyledTableCell component="th" scope="row">
                    {row.patientId}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.mobile}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>{row.dob}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Container>
    </>

  )
}

export default DashboardApp