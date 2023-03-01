import React from "react";
import "./loginstyle.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navb from "../navbar/navbar";
import Logo from "./logo";
const Login = ()=>{
return(
    <>
        <Logo/>
        <Navb/>
        <div className="card-container">
            <div className="login-card">
                <div className="login-type"><h5>Patient Login</h5></div>
                <div className="login-form">
                    <form>
                    <input type="text" id="patientid" name="patientid" placeholder="Patient Id" className="form-ele"/><br/>
                    <input type="text" id="otp" name="otp" placeholder="OTP" className="form-ele"/>
                    </form>
                </div>
                <Button variant="success" className="submit">Submit</Button>
            </div>
        </div>
    </>
);
};
export default Login;