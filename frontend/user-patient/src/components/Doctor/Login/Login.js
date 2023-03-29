import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import MedicalConsultant from "./LoginImages/medicalConsultant.jpg";
import { useNavigate } from "react-router";

const theme = createTheme();
const DoctorLogin = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = React.useState(false);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(true);

  // React.useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginApi = "http://localhost:8083/doctor/doctorLogin";

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    // const data = new FormData(event.currentTarget);
    const loginData = {
      email: email,
      password: password,
    };

    let requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginData),
      redirect: "follow",
    };

    fetch(loginApi, requestOptions)
      .then((response) => {
        if (response.status === 202) navigate("/");
        if (response.status === 404) {
          response.json().then((e) => {
            if (e.message === "Doctor not Found") {
              setNotFound(true);
            }
            if (e.message === "Invalid Credentials") {
              setInvalidCredentials(true);
            }

            console.log(e);
            event.target.reset();
          });
        }
      })
      .catch((error) => console.log("error", error));

    
  };

  const reset = (e) => {
    console.log("closing");
    setEmail('');
    setPassword('');
    console.log('email password reset')
    setOpen(true);
    setNotFound(false);
    setInvalidCredentials(false);
    console.log('resetting flags')
    window.location.reload(true)
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${MedicalConsultant})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Doctor Login
            </Typography>
            {notFound && (
              <Collapse in={open}>
                <Alert
                  onClose={reset}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        reset()
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Seems like you are new! Please contact admin and get yourself
                  registered or check if you have entered a correct email id.
                </Alert>
                
              </Collapse>
              
            )}
            {invalidCredentials && (
              <Collapse in={open}>
                <Alert
                  onClose={reset}
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        reset()
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Invalid Credentials</AlertTitle>
                  Password — <strong>Is it entered correctly?</strong>
                </Alert>
              </Collapse>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onBlur={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default DoctorLogin;
