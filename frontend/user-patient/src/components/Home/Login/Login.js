import React, { useState } from "react";

import {
  Avatar,
  Alert,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
    IconButton,
    Collapse,

} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';


import PortraitIcon from "@mui/icons-material/Portrait";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PhoneInput from "react-phone-number-input";

import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useUserAuth } from "../../../context/UserAuthContext";
import CustomPhoneNumber from "../Login/Hooks/PhoneNumber";
import Header from "../../Bar/Header/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [onError, setOnError] = useState(false);
  const [number, setNumber] = useState("");

  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();

  const[nullValueError,setNullValueError]  = useState(false);
  const [open, setOpen] = useState(true);


  const [checked, setchecked] = useState(false);
  const navigate = useNavigate();

  localStorage.removeItem('user');

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     try {
  //       await logIn(email, password);
  //       navigate("/home");
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  const handleLogin = async (event) => {
    event.preventDefault();
    setNullValueError(false);
    setOpen(true);
    setOnError(false)
    if(email==="" || password===""){
      setNullValueError(true);

      return;
    }
    const verifyLoginApi = "http://localhost:8083/api/user/userLogin";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      // redirect: "follow",
    };

    await fetch(verifyLoginApi, requestOptions)
      .then(async (response) => {
        console.log(response.status);
        
        if (response.status === 202) {
          console.log(response.headers.get("token"));
          await response.json().then(async (e) => {
            console.log(JSON.stringify(e));
            await localStorage.setItem('user', JSON.stringify(e));
            await localStorage.setItem('token',response.headers.get("token"));
          })
          navigate("/dashboard/app");
        }
          
        else {
          console.log(response)
          setOnError(true);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneSignup = (e) => {
    setchecked(e.target.checked);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home"); //TODO navigation check if  present in database then userprofile else register
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
    <Header></Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container id="login" maxWidth="xl">
          {
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Box
                sx={{
                  marginTop: 15,
                  marginBottom: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <PortraitIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                {onError && (
                  <Alert
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Register
                      </Button>
                    }
                  >
                    Seems like you are new! Please register with us.
                  </Alert>
                )}
                <Box component="div" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        onBlur={handleEmail}

                        onChange={(e) => {
                          if(e.target.value.length>=1) setNullValueError(false);
                        }}

                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onBlur={handlePassword}

                        onChange={(e) => {
                          if(e.target.value.length>=1) setNullValueError(false);
                        }}

                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      <Typography sx={{ p: 1 }} color="red">
                        {error}
                      </Typography>
                    </Grid>
                  </Grid>
                  {nullValueError && (

                      <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                          <Alert
                              severity="error"
                              // action={
                              //   <IconButton
                              //       aria-label="close"
                              //       color="inherit"
                              //       size="small"
                              //       onClick={() => {
                              //         setOpen(false);
                              //       }}
                              //   >
                              //     <CloseIcon fontSize="inherit" />
                              //   </IconButton>
                              // }
                              sx={{ mb: 2 }}
                          >
                            Please enter required field!!!
                          </Alert>
                        </Collapse>
                      </Box>
                  )}
                  <Button
                    onClick={handleLogin}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Box>
                <Grid container justifyContent="flex-start">
                  <Grid item>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checked}
                            onChange={handlePhoneSignup}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Login via OTP"
                      />
                      {checked && (
                        <Box component="div" noValidate sx={{ mt: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              {error && <Alert severity="error">{error}</Alert>}
                              {/* TODO: check on the error and show error accordingly*/}
                              <Form
                                onSubmit={getOtp}
                                style={{ display: !flag ? "block" : "none" }}
                              >
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <PhoneInput
                                    defaultCountry="IN"
                                    value={number}
                                    onChange={setNumber}
                                    inputComponent={CustomPhoneNumber}
                                  />
                                  <div id="recaptcha-container"></div>
                                </Form.Group>
                                <div className="button-right">
                                  <Link to="/">
                                    <Button variant="secondary">Cancel</Button>
                                  </Link>
                                  &nbsp;
                                  <Button type="submit" variant="primary">
                                    Send Otp
                                  </Button>
                                </div>
                              </Form>
                              <Form
                                onSubmit={verifyOtp}
                                style={{ display: flag ? "block" : "none" }}
                              >
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicOtp"
                                >
                                  <Form.Control
                                    type="otp"
                                    placeholder="Enter OTP"
                                    onChange={(e) => setOtp(e.target.value)}
                                  />
                                </Form.Group>
                                <div className="button-right">
                                  <Link to="/">
                                    <Button variant="secondary">Cancel</Button>
                                  </Link>
                                  &nbsp;
                                  <Button type="submit" variant="primary">
                                    Verify
                                  </Button>
                                </div>
                              </Form>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    {/* <Button onClick={toggleLogin(true)}> */}
                    <Link
                      className="body-link-text-style"
                      to="/register"
                      variant="body2"
                    >
                      New here? Register
                    </Link>
                    {/* </Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Container>
          }
        </Container>
      </Box>
    </>
  );
};

export default Login;
