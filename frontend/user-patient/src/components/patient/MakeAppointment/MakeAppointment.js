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
import AvailableDoctors from "./AvailableDoctors";

const MakeAppointment = () => {
  const [value, setValue] = React.useState("1");
  const [specialization, setSpecialization] = React.useState("MBBS");
  const [speciality, setSpeciality] = useState([""]);
  const [availableDoctors, setAvailableDoctors] = useState();
  const [showSelection, setSelection] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelection = (e) => {
    setSelection(false);
    setSpecialization(e.target.value);
    setSelection(true);
  };

  const getSpecializationList = async () => {
    let specializationList = [];
    let api = "http://localhost:8083/api/patientDetails/getSpecialisation";

    const jwtToken = localStorage.getItem("token");

    let myHeaders = new Headers();

    myHeaders.set("Authorization", `Bearer ${jwtToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(api, requestOptions);
    await response.json().then(async (data) => {
      await data.forEach((element) => {
        specializationList.push(element);
      });

      setSpeciality(specializationList);
    });
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
        <TabPanel value="1">
          <AvailableDoctors category={"MBBS"} />
        </TabPanel>
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
          {showSelection && <AvailableDoctors category={specialization} />}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MakeAppointment;
