import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indigo } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: indigo[100],
  },
  '&:nth-of-type(even)': {
    backgroundColor: indigo[50],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(key, data) {
  return { key, data};
}

const PatientInformation = () => {
    const patientData = localStorage.getItem('patient')
    const patientInfo = JSON.parse(patientData);

    const rows = [
        createData('Patient Id', patientInfo.patientID),
        createData('Patient First-Name', patientInfo.patientFirstName),
        createData('Patient Last-Name', patientInfo.patientLastName),
        createData('Patient Mobile Number', patientInfo.patientMobileNumber),
        createData('Patient EmailID', patientInfo.patientEmail),
        createData('Patient Date of Birth', patientInfo.patientDOB),
        createData('Patient Gender', patientInfo.patientGender),
      ];

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.key}>
                  <StyledTableCell component="th" scope="row">
                    {row.key}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.data}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default PatientInformation;