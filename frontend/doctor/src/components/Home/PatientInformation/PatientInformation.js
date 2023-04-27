import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indigo } from '@mui/material/colors';
import TableHead from "@mui/material/TableHead";
import {Button} from "@mui/material";
import {useState} from "@types/react";

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
    const token = localStorage.getItem('token');
    const patientData = localStorage.getItem('patient')
    const [loading, setLoading] = useState(false);
    const [healthRecord, setHealthRecord] = useState([]);
    const patientInfo = JSON.parse(patientData);
    const patientID = patientInfo.patientID;
    const getHealthRecords = async ()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        fetch(
            `http://localhost:8083/doctor/getHealthRecordsByPatientId/${patientID}`,
            {
                headers: myHeaders,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    console.log("Not working");
                }
                return response.json();
            })
            .then((healthRecord) => setHealthRecord(healthRecord));
    }
    const handleDownload = async (healthRecordName, setLoading) => {
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        await fetch(
            `http://localhost:8083/doctor/healthrecord/${patientID}/${healthRecordName}`,
            {
                method: "GET",
                headers: myHeaders,
            }
        )
            .then((response) => response.blob())
            .then((response) => {
                const url = URL.createObjectURL(response);
                const link = document.createElement("a");
                link.href = url;
                link.download = "HealthRecord.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log("API response:", response.data);
                if (response.data === "success") {
                    alert("Download fail !");
                } else {
                    alert("health record downloaded !");
                }
            })
    };

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
       <>
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
           <TableContainer sx={{ marginTop: "20px" }} component={Paper}>
               <Table sx={{ minWidth: 500 }} aria-label="simple table">
                   <TableHead>
                       <TableRow>
                           <TableCell>Name</TableCell>
                           <TableCell align="right">Date of Upload</TableCell>
                           <TableCell align="right">View Medical History</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {healthRecord.length > 0 ? (
                           healthRecord.map((row, index) => (
                               <TableRow
                                   key={index}
                                   sx={{
                                       "&:last-child td, &:last-child th": { border: 0 },
                                   }}
                               >
                                   <TableCell align="right">
                                       {row.healthRecordName}
                                   </TableCell>
                                   <TableCell align="right">
                                       {row.healthRecordUploadDate}
                                   </TableCell>
                                   <TableCell align="right">
                                       <Button
                                           type="submit"
                                           variant="contained"
                                           size="small"
                                           textAlign="center"
                                           sx={{ mt: 1 }}
                                           onClick={() =>
                                               handleDownload(row.healthRecordName, setLoading)
                                           }
                                       >
                                           View
                                       </Button>
                                   </TableCell>
                               </TableRow>
                           ))
                       ) : (
                           <TableRow>
                               <TableCell colSpan={3} align="center">
                                   No medical records uploaded by patient.
                               </TableCell>
                           </TableRow>
                       )}
                   </TableBody>
               </Table>
           </TableContainer>
       </>
      );
}

export default PatientInformation;