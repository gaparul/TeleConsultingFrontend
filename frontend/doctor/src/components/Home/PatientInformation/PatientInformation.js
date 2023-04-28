import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { indigo } from '@mui/material/colors';
import { Divider, Typography } from '@mui/material';

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

function createHealthRecordData(name, date) {
    return {name, date}
}

const PatientInformation = () => {
    const patientData = localStorage.getItem('patient')
    const patientInfo = JSON.parse(patientData);
    const token = localStorage.getItem('token');

    const [loading, setLoading] = React.useState(false);
    const [healthRecord, setHealthRecord] = React.useState([]);

    const rows = [
        createData('Patient Id', patientInfo.patientID),
        createData('Patient First-Name', patientInfo.patientFirstName),
        createData('Patient Last-Name', patientInfo.patientLastName),
        createData('Patient Mobile Number', patientInfo.patientMobileNumber),
        createData('Patient EmailID', patientInfo.patientEmail),
        createData('Patient Date of Birth', patientInfo.patientDOB),
        createData('Patient Gender', patientInfo.patientGender),
      ];


      const getHealthRecords = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        let healthRecordRows = [];
        await fetch(
          `http://localhost:8083/doctor/getHealthRecordsByPatientId/${patientInfo.patientID}`,
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
          .then((healthRecord) => {
            healthRecord.forEach(element => {
                console.log(element.healthRecordName);
                const recordName = String(element.healthRecordName)
                const date = String(element.healthRecordUploadDate)
                const data = createHealthRecordData(recordName, date)
                healthRecordRows.push(data);
            });
            setHealthRecord(healthRecordRows)
        });
      };
    
      const handleDownload = async (healthRecordName, setLoading) => {
        setLoading(true);
    
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        await fetch(
          `http://localhost:8083/doctor/healthrecord/${patientInfo.patientID}/${healthRecordName}`,
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
          });
      };
    
      React.useEffect(() => {
        getHealthRecords()
      },[])

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
        <Divider/>
        <Typography variant='subtitle3' fontSize={25}>Health records</Typography>
        <Divider/>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
            <StyledTableRow>
              <StyledTableCell>Health Record</StyledTableCell>
              <StyledTableCell align="right">Date of Upload</StyledTableCell>
              <StyledTableCell align="right">View Medical History</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {healthRecord.length > 0 ? (
              healthRecord.map((row, index) => (
                <StyledTableRow
                  key={index}
                  align="right"
                >
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="right" >
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                    //   textAlign="center"
                      sx={{ mt: 1 }}
                      onClick={() =>
                        handleDownload(row.name, setLoading)
                      }
                    >
                      Download
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  No medical records uploaded by patient.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        </TableContainer>
        </>
      );
}

export default PatientInformation;