
import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from  'axios';

import './doctorHomeStyle.css'

export default function SearchPatient(){
const [search,setSearch]=useState('')
const [data, setData] = useState();
const handleChange=(event)=>{
    setSearch(event)
}
const handleSubmit=async(event)=>{
  event.preventDefault();
await fetchData(search)
}
async function fetchData(id){
  await axios(`http://localhost:8083/api/patientDetails/patient/${id}`).then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  
}
useEffect(() => {
  fetchData()
}, [])
  return(
    <>
    <div className="user-data">
    <form>
    <TextField id="standard-basic" label="Enter Patient ID" variant="standard" name="search" value={search} onChange={(e)=>handleChange(e.target.value)} />
    <Button variant="contained" onClick={handleSubmit}>Search</Button>
    </form> 
    <div className='form-data'>
    {data ? (
      <>
    <table>
      <tr>
        <th>Patient ID</th>
        <th>Name</th>
        <th>DOB</th>
        <th>Email</th>
        <th>Mobile No</th>
        <th>Gender</th>
      </tr>
      <tr>
        <td>{data.patientID}</td>
        <td>{data.patientFirstName+" "+data.patientLastName}</td>
        <td>{data.patientDOB}</td>
        <td>{data.patientEmail}</td>
        <td>{data.patientMobileNumber}</td>
        <td>{data.patientGender}</td>
      </tr>
    </table>
  </>) : <h3>Enter patient's id to search</h3>}
    </div>
    </div>
    </>
  )
}