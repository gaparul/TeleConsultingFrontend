import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navb from "../navbar/navbar";
import Logo from "../login/logo";
import "./regstyle.css";


const Register = ()=>{

    const[ fname,setFname] = useState('')
    const [ lname, setLname ] = useState('')
    const [ mobileno, setMobileno] = useState('')
    const[ dob,setDob] = useState('')
    const[ gender, setGender] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const handleRegister = async()=>{
        let registerApi = "http://localhost:8083/api/patientDetails/create/";
        var patientData = {
                patientFirstName : fname,
                patientLastName:lname,
                patientMobileNumber:mobileno,
                patientEmail:email,
                patientDOB:dob,
                patientGender:gender,
                patientPassword:password,
        }
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                mode: 'cors', 
                body: JSON.stringify(patientData)
            };
            const response = await fetch(registerApi, requestOptions);
            const data = await response.json();
            console.log(data);
    }


return(
    <>
        <Navb/>
        <div className="card-container">
            <div className="reg-card">
                <div className="login-type"><h5>Patient Register</h5></div>
                <div className="login-form">
                    <form>
                    <input type="text" id="patient-fname" name="ptfirstname" 
                    placeholder="First Name" className="form-ele" onChange={e=>setFname(e.target.value)}/><br/>

                    <input type="text" id="patient-lname" name="ptlastname" 
                    placeholder="Last Name" className="form-ele" onChange={e=>setLname(e.target.value)}/><br/>

                    <input type="email" id="patient-email" name="ptemail" 
                    placeholder="E-mail" onChange={e=>setEmail(e.target.value)} className="form-ele"/><br/>

                    <input type="password" id="patient-password" name="ptpassword" 
                    placeholder="Password" onChange={e=>setPassword(e.target.value)}className="form-ele"/><br/>

                    <input type="number" id="patient-number" name="ptnumber" 
                    placeholder="Mobile No." onChange={e=>setMobileno(e.target.value)} className="form-ele"/><br/>

                    <input type="date" id="patient-dob" name="ptdob" 
                    placeholder="DoB" onChange={e=>setDob(e.target.value)} className="form-ele"/><br/>

                    <input type="text" id="gender" name="ptgender" 
                    placeholder="Gender" onChange={e=>setGender(e.target.value)} className="form-ele"/>
                    </form>
                </div>
                <Button variant="success" className="submit" onClick={()=>handleRegister()}>Register</Button>
            </div>
        </div>
    </>
);
};
export default Register;