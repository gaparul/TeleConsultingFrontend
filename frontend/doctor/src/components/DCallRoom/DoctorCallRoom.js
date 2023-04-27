import React, { useState, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PropTypes, func } from "prop-types";
import {
  Grid,
  Paper,
  Select,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { indigo } from "@mui/material/colors";

import CallRoomHeader from "./CallRoomHeader";

//Table2
function createData(name, dateofupload) {
  return { name, dateofupload };
}

const IndigoSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: indigo[900],
    "&:hover": {
      backgroundColor: alpha(indigo[900], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: indigo[900],
  },
}));

const rows = [createData("", "", "")];

//Table1
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e8eaf6",
    color: theme.palette.common.black,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

DoctorCallRoom.propTypes = {
  appointment: PropTypes.object,
};

export default function DoctorCallRoom() {
  const appointment = localStorage.getItem("appointment");
  const appointmentDetails = JSON.parse(appointment);
  // const { state } = useLocation();
  // const { appointment } = state;
  const [healthRecord, setHealthRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const doctor = localStorage.getItem("doctor");
  const doctorDetails = JSON.parse(doctor);
  const token = localStorage.getItem("token");

  const doctorName = `${doctorDetails.doctorFirstName} ${doctorDetails.doctorLastName}`;
  console.log(appointmentDetails, "appointment");
  const patient = appointmentDetails.patientDetails;
  const patientID = patient.patientID;
  const patientName = `${patient.patientFirstName} ${patient.patientLastName}`;
  const appointmentID = appointmentDetails.appointmentID;
  const SOCKET_URL = "http://localhost:8083/ws-message";

  useEffect(() => {
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
  }, []);

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

  //Call Room
  // const {roomId} = useParams();
  const navigate = useNavigate();
  const roomId = `${doctorDetails.doctorID}915${appointmentID}624${patientID}`;
  console.log(roomId, "room id");
  const myMeeting = async (element) => {
    const appID = 868852693;
    const serverSecret = "9bf3442d9f083ba5f04468215a647d27";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      doctorName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      layout: "Grid",
      maxUsers: 2,
      showRoomTimer: true,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showLeavingView: false,
      onLeaveRoom: async () => {
        let api = "http://localhost:8083/doctor/onCallDisconnect";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(appointmentDetails),
          redirect: "follow",
        };
        await fetch(api, requestOptions)
          .then((response) => {
            if (response.status === 200) {
              console.log("success of on call disconnect");
            }
          })
          .catch((error) => console.log("error", error));
        navigate("/doctor/dashboard");
        // window.location.reload("false");
      },
    });
  };

  //Prescription
  const [inputField, setInputFields] = useState([{ medicine: "", dosage: "" }]);

  const [symptoms, setSymptoms] = useState("");

  const [advice, setAdvice] = useState("");

  const [isFollowUp, setIsFollowUp] = useState(false);

  const [followUpDay, setFollowUpDay] = useState("");

  const [medicinesAndDosage, setMedicinesAndDosage] = useState("");

  const handleFormChange = (index, e) => {
    let data = [...inputField];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
    console.log(data);
  };

  const addFields = (e) => {
    e.preventDefault();
    let newField = { medicine: "", dosage: "" };
    setInputFields([...inputField, newField]);
  };

  const handleSelectChange = (e) => {
    setFollowUpDay(e.target.value);
  };

  const handleFollowUpChange = (e) => {
    setIsFollowUp(e.target.checked);
  };

  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleInputChangeAdvice = (e) => {
    setAdvice(e.target.value);
  };
  const string = inputField
    .map((item) => {
      return `${item.medicine}:${item.dosage}`;
    })
    .join("$");
  console.log(string);

  const uploadPrescription = async (e) => {
    e.preventDefault();
    console.log("Form data entered :", inputField);
    // let string = "";
    // for(let i=0; i<inputField.length; i++){
    //     string+=`${inputField[i].medicine}:${inputField[i].dosage}$`
    // }
    // string = string.slice(0, -1);

    setMedicinesAndDosage(string);
    console.log("medicine", medicinesAndDosage);

    const details1 = {
      symptoms: symptoms,
      medicinesAndDosage: string,
      advice: advice,
    };
    const details2 = {
      isFollowUp: isFollowUp,
      followUpDay: followUpDay,
    };
    const combine = {
      Prescription: details1,
      Appointment: details2,
    };

    console.log(symptoms, string, advice, followUpDay);
    console.log(patientID, appointmentID);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(combine);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const api = `http://localhost:8083/doctor/uploadPrescription/${appointmentID}/${patientID}`;

    await fetch(api, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Prescription Uploaded successfully") {
          alert("Upload Successful!");
          setInputFields([{ medicine: "", dosage: "" }]);
          setSymptoms("");
          setAdvice("");
          setFollowUpDay("");
          setIsFollowUp(false);
          setMedicinesAndDosage("");
        } else {
          alert("Upload Failed");
        }
      })
      .catch((error) => console.log("error", error));

    //   const response = await axios.post(
    //     `http://localhost:8083/doctor/uploadPrescription/${appointmentID}/${patientID}`,
    //     { headers: myHeaders },
    //     combine
    //   );
    //   console.log("API response:", response.data);
    //   if (response.data === "Prescription Uploaded successfully") {
    //     alert("Upload Successful!");
    //     setInputFields([{ medicine: "", dosage: "" }]);
    //     setSymptoms("");
    //     setAdvice("");
    //     setFollowUpDay("");
    //     setIsFollowUp(false);
    //     setMedicinesAndDosage("");
    //   } else {
    //     alert("Upload Failed");
    //   }
  };
  return (
    <>
      <CallRoomHeader />

      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          style={{ width: "84vw", height: "94vh" }}
          ref={myMeeting}
        ></Grid>

        <Grid item xs={4}>
          <Paper
            sx={{
              marginTop: "20px",
              marginRight: "20px",
              padding: "32px",
              justifyContent: "center",
            }}
            elevation={4}
          >
            <Typography>Patient Name: {patientName}</Typography>
            <Typography>Patient Id: {patientID}</Typography>

            <Typography
              sx={{ marginTop: "40px" }}
              variant="h4"
              textAlign={"center"}
            >
              Prescription
            </Typography>

            <Grid item xs={12} sm={6.1} sx={{ marginTop: "20px" }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Symptoms"
                name="Symptoms"
                value={symptoms}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Prescription Table */}
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 400, marginTop: "20px" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Medicine</StyledTableCell>
                    <StyledTableCell align="center">Dosage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inputField.map((input, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Medicine"
                          name="medicine"
                          value={input.medicine}
                          onChange={(e) => handleFormChange(index, e)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Dosage"
                          name="dosage"
                          value={input.dosage}
                          onChange={(e) => handleFormChange(index, e)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              sx={{ backgroundColor: "#e8eaf6", mt: 1, color: "#1a237e" }}
              type="submit"
              fullWidth
              variant="outline"
              // sx={{ mt: 1}}
              onClick={addFields}
            >
              Add more +
            </Button>
            <Grid item xs={12} sm={6.1} sx={{ marginTop: "20px" }}>
              <TextField
                variant="outlined"
                label="Advice"
                name="Advice"
                value={advice}
                onChange={handleInputChangeAdvice}
              />
            </Grid>

            <Grid item sx={{ marginTop: "20px" }}>
              <IndigoSwitch
                checked={isFollowUp}
                onChange={handleFollowUpChange}
                {...label}
              />
              <span sx={{ marginLeft: "2rem" }}>Follow Up</span>
            </Grid>

            <Grid item sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">After</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="days/months"
                  value={followUpDay}
                  onChange={handleSelectChange}
                  disabled={!isFollowUp}
                >
                  <MenuItem value={"3"}>3 days</MenuItem>
                  <MenuItem value={"5"}>5 days</MenuItem>
                  <MenuItem value={"7"}>7 days</MenuItem>
                  <MenuItem value={"15"}>15 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sx={{ marginTop: "20px" }}>
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ mt: 1, marginLeft: "10px", backgroundColor: "#1a237e" }}
                  onClick={(e) => uploadPrescription(e)}
                >
                  Upload Prescription
                </Button>
              </span>
            </Grid>

            {/* Health Record Table */}
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
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
