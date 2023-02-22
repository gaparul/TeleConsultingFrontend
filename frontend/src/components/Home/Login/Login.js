import './Login.css'
import React, { useState } from 'react';
import { firebase, auth } from '../../../firebaseConfig';
import { RecaptchaVerifier } from 'firebase/auth';
// import { Auth } from 'firebase/auth';

const Login = ()=>{
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [show, setShow] = useState(null);
    const [final, setfinal] = useState('');

    const signin = () => {
        if(number === "" || number.length < 10) return;
        new RecaptchaVerifier()
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(number, verify).then((result) => {
            setfinal(result);
            alert("code sent")
            setShow(true);
        })
        .catch((err) => {
            alert(err);
            window.location.reload()
        });
    }

    const validateOtp = () => {
        if(otp === null || final === null) return;

        final.confirm(otp).then((res) => {
            //success
        }).catch((err) => {
            alert("Invalid OTP")
        })
    }

    return (
        <div style={{ "marginTop": "200px" }}>
            <center>
                <div style={{ display: !show ? "block" : "none" }}>
                    <input value={number} onChange={(e) => { 
                       setNumber(e.target.value) }}
                        placeholder="phone number" />
                    <br /><br />
                    <div id="recaptcha-container"></div>
                    <button onClick={signin}>Send OTP</button>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                    <input type="text" placeholder={"Enter your OTP"}
                        onChange={(e) => { setOtp(e.target.value) }}></input>
                    <br /><br />
                    <button onClick={validateOtp}>Verify</button>
                </div>
            </center>
        </div>
    )
};

export default Login;