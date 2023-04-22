import { Button } from '@mui/material';
import React, { useState } from 'react'

const MakeAppointment = () => {
  const [opdTypes,setOpdTypes] = useState();
  const [availableDoctors, setAvailableDoctors] = useState();
  const getSpecialisationsList = async () => {
    let api = "http://localhost:8083/api/patientDetails/getSpecialisation";
    const response = await fetch(api);
    const data = await response.json();
    setOpdTypes(data);
  }

  const getAvailableDoctorWithSelectedSpecialisation = async (category) => {
    let api = "http://localhost:8083/api/patientDetails/AvailableDoctorsBySpecialisation";
    let doctors = []
    //update this with selected specialisation
    var category = "Dentist";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      mode: 'cors',
      body: category
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
  }

  const createAppointment = async () => {
    let api = "http://localhost:8083/api/patientDetails/createAppointment";
    // patientDetails = patiendID, appointmentOPDType = selected specialisation category
    var appointmentData = {
      "appointmentOpdType": "Dentist",
      "patientDetails": 1,
      "doctorID": 2023001
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(appointmentData)
    };
    const response = await fetch(api, requestOptions);
    const data = await response.json();
    console.log("Created appointment details  ");
    console.log(data);
  }

  return (
    <div>MakeAppointment
    </div>
    
  )
}

export default MakeAppointment