//react is used to run JSX: which is HTML in js
import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

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
  await axios.get(`http://localhost:8083/doctor/${id}`).then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  
}
useEffect(() => {
  fetchData()
}, [])
console.log(data)
  return(
    <>
    <form>
    <TextField id="standard-basic" label="Enter Patient ID" variant="standard" name="search" value={search} onChange={(e)=>handleChange(e.target.value)} />
    <Button variant="contained" onClick={handleSubmit}>Search</Button>
    {data ? (
      <>
    <h3>Patient ID : {data.patientID}</h3>
    <h3>Patient's First Name : {data.first_name}</h3>
    <h3>Patient's Last Name : {data.last_name}</h3>
    <h3>Patient's Date of Birth : {data.dateofBirth}</h3>
    <h3>Patient's Email ID : {data.emailID}</h3>
    <h3>Patient's Contact Number : {data.phoneNum}</h3>
  <h3>Patient's Gender : {data.gender}</h3>
  </>) : <h3>Nothing to display</h3>}
   
    </form> 
    </>
  )
}