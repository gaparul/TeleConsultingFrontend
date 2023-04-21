import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Header from "../../Bar/Header/Header";
import {useState} from "react";
import {Alert, Collapse} from "@mui/material";


const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const[nullValueError,setNullValueError]  = useState(false);
  const [open, setOpen] = useState(true);
  const [errormessage,setErrorMessage] = useState("");

  React.useEffect(() => {}, []);

  const validateInformation = (event) => {

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNullValueError(false);

    if(firstName==="" || lastName==="" || mobile==="" || email==="" ||password===""){
      setErrorMessage("Please enter all required fields !!!")
      setNullValueError(true);
      return;
    }

    const emailCheck = /\S+@\S+\.\S+/;
    if (!emailCheck.test(email)) {
      setErrorMessage("Email is invalid");
      setNullValueError(true);
      return;
    }

    const AlphaCheck = /^[A-Za-z]+$/;
    if (!AlphaCheck.test(firstName)) {
      setErrorMessage("Enter valid FirstName");
      setNullValueError(true);
      return;
    }

    if (!AlphaCheck.test(lastName)) {
      setErrorMessage("Enter valid LastName");
      setNullValueError(true);
      return;
    }




    if(mobile.length!==10){
      setErrorMessage("Mobile number is invalid !!!");
      setNullValueError(true);
      return;
    }


    const registerApi = "http://localhost:8083/api/user/registerUser";

    let userDetails = JSON.stringify({
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userMobileNumber: mobile,
      userPassword: password,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: userDetails,
    };

    const response = await fetch(registerApi, requestOptions);

    if (response.status === 201) navigate("/login");

    console.log(response.status);
  };
  return (
    <>
    <Header></Header>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onBlur={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onBlur={(e) => setLastName(e.target.value)}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required

                    onBlur={(e) => {
                      if(e.target.value.length===10) {
                        setMobile(e.target.value)
                      }
                    }}

                    onChange={(e)=>{
                      const re = /^[0-9\b]+$/;

                      // if value is not blank, then test the regex

                      if (re.test(e.target.value)) {
                        setMobile(e.target.value);
                        setNullValueError(false)
                        if(e.target.value.length>10){
                          setErrorMessage("More than 10 digits in Mobile Number!!!");
                          setNullValueError(true);

                        }

                      }else{
                        setErrorMessage("Use Numbers only!!!");
                        setNullValueError(true);
                        console.log("rir");

                      }}
                    }

                    fullWidth
                    id="mobileNumber"
                    label="Mobile Number"
                    name="mobileNumber"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={(e) => {

                        const re = /\S+@\S+\.\S+/;

                        // if value is not blank, then test the regex
                      setNullValueError(false);
                      if (!re.test(e.target.value)) {
                        setErrorMessage("Email is invalid");
                        setNullValueError(true);
                        console.log("rir");
                      }

                      setEmail(e.target.value);

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
                    onBlur={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
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
                          //       // onClick={() => {
                          //       //   setOpen(false);
                          //       // }}
                          //   >
                          //     <CloseIcon fontSize="inherit" />
                          //   </IconButton>
                          // }
                          sx={{ mb: 2 }}
                      >
                        {errormessage}
                      </Alert>
                    </Collapse>
                  </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
