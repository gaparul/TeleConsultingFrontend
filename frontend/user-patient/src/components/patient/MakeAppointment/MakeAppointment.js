import {
  Button,
  Container,
  Typography,
  Divider,
  Box,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const MakeAppointment = () => {
  const [value, setValue] = React.useState("1");
  const [specialization, setSpecialization] = React.useState("MBBS");
  const [speciality, setSpeciality] = useState([""]);
  const [availableDoctors, setAvailableDoctors] = useState();

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelection = (e) => {
    setSpecialization(e.target.value);
  };

  const getSpecializationList = async () => {
    let specializationList = [];
    let api = "http://localhost:8083/api/patientDetails/getSpecialisation";
    const response = await fetch(api);
    await response.json().then(async (data) => {
      console.log(data);

      await data.forEach((element) => {
        specializationList.push(element);
      });

      setSpeciality(specializationList);
    });
  };

  const getAvailableDoctorWithSelectedSpecialisation = async (category) => {
    let api =
      "http://localhost:8083/api/patientDetails/AvailableDoctorsBySpecialisation";
    let doctors = [];
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      mode: "cors",
      body: category,
    };
    const response = await fetch(api, requestOptions);
    const data = await response.json();
    //This is a list of doctors in following format :
    // doctorAvailable: 1
    // doctorEmail : "docc1@email.com"
    // doctorFirstName : "doc1"
    // doctorID : 1
    // doctorLastName: "S"
    // doctorMobileNumber :"1234567"
    // doctorPassword: "doc1"
    // doctorQueueSize : 5
    // doctorSpecialisation : "MBBS"
    console.log("List of Available doctors of selected specialisation");
    console.log(data);
  };

  const createAppointment = async () => {
    let api = "http://localhost:8083/api/patientDetails/createAppointment";
    // patientDetails = patiendID, appointmentOPDType = selected specialisation category
    var appointmentData = {
      appointmentOpdType: "Dentist",
      patientDetails: 1,
      doctorID: 2023001,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(appointmentData),
    };
    const response = await fetch(api, requestOptions);
    const data = await response.json();

    console.log("Created appointment details  ");
    console.log(data);
  };

  React.useEffect(() => {
    getSpecializationList();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="General OPD" value="1" />
            <Tab label="Speciality" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Speciality...
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={specialization}
                label="Select Speciality"
                onChange={handleSelection}
              >
                {""}
                {speciality.map((specialityValue) => {
                  return (
                    <MenuItem key={specialityValue} value={specialityValue}>
                      {specialityValue}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MakeAppointment;