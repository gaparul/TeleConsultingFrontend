import React, { useState } from "react";
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import PortraitIcon from '@mui/icons-material/Portrait';

import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import GoogleButton from "react-google-button";
import { useUserAuth } from "../../../context/UserAuthContext";
import { blue } from "@mui/material/colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

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

//   const handleGoogleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await googleSignIn();
//       navigate("/home");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

const handleLogin = () => {}

  return (
    <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Container id='login' maxWidth="x1">
                <Container component="main" maxWidth = "xs">
                    <CssBaseline/>
                    <Box sx = {{
                        marginTop: 15,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'cloumn',
                        alignItems: 'center'

                    }}>
                        <Avatar sx={{m:1, bgcolor: blue[800] }}>
                            <PortraitIcon/>
                        </Avatar>
                        <Typography component='h1' variant="h5">
                            Login
                        </Typography>
                        <Box component="div" noValidate sx = {{mt:3}}>
                            <Grid item xs={12}>
                                <TextField onBlur={handleLogin}
                                required
                                fullWidth
                                id = "mobile"
                                label="Mobile Number"
                                name = "mobile"
                                autoComplete="mobile"/>
                            </Grid>
                            <Typography sx = {{p:1}} color="red"></Typography>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </Box>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {/* <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group> */}

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group> */}

          {/* <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div> */}
        {/* </Form> */}
        <hr />
        <Link to="/phonesignup">
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="Submit">
              Sign in with Phone
            </Button>
          </div>
        </Link>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;