import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navb from "../navbar/navbar";
import Logo from "../login/logo";
import regimg from "./temp.png";
import "./regstyle.css";
const Register = ()=>{
return(
    <>
        <Logo/>
        <Navb/>
        <img src={regimg} alt="optional" className="reg-img"/>
        <div className="card-container">
            <div className="reg-card">
                <div className="login-type"><h5>Patient Register</h5></div>
                <div className="login-form">
                    <form>
                    <input type="text" id="patient-fname" name="ptfname" placeholder="First Name" className="form-ele"/><br/>
                    <input type="text" id="patient-lname" name="ptlname" placeholder="Last Name" className="form-ele"/><br/>
                    <input type="email" id="patient-email" name="ptemail" placeholder="E-mail" className="form-ele"/><br/>
                    <input type="text" id="patient-password" name="ptpassword" placeholder="Create Password" className="form-ele"/><br/>
                    <input type="number" id="patient-number" name="ptnumber" placeholder="Mobile No." className="form-ele"/><br/>
                    <input type="date" id="patient-dob" name="ptdob" placeholder="DoB" className="form-ele"/><br/>
                    <input type="text" id="gender" name="ptgender" placeholder="Gender" className="form-ele"/>
                    </form>
                </div>
                <Button variant="success" className="submit">Register</Button>
            </div>
        </div>
    </>
);
};
export default Register;