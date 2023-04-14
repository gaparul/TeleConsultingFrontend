import * as React from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import BadgeIcon from "@mui/icons-material/Badge";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dob, setDOB] = React.useState(null);
  const format = 'MM-DD-YY';
    const nowDay = dayjs().format(format);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');

    const userDetails = JSON.parse(user);
    let formattedDOB = moment(dob.$d).format('DD/MM/YYYY');
    console.log(formattedDOB);

    console.log();

    console.log(userDetails);
    const patient = {
        "patientFirstName": firstName,
        "patientLastName": lastName,
        "patientMobileNumber": (mobile === "") ? userDetails.userMobileNumber : mobile,
        "patientEmail": (email === "") ? userDetails.userEmail : email,
        "patientDOB": formattedDOB,
        "patientGender": gender,
        "user":{
            "userID": userDetails.userID
        }
    }

    console.log(patient);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(patient),
        redirect: 'follow'
    };

    fetch("http://localhost:8083/api/patientDetails/registerPatient", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    // TODO: navigate
  }
  return (
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
          <BadgeIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Patient Registration
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
                onBlur={(e) => setMobile(e.target.value)}
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onBlur={(e) => setEmail(e.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
    
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                fullWidth
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => {
                    setDOB(newValue) 
                }}
                />
              </DemoContainer>
            </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" required>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio onChange={(e) => setGender(e.target.value)}/>}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio onChange={(e) => setGender(e.target.value)}/>}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio onChange={(e) => setGender(e.target.value)}/>}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Patient
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPatient;
