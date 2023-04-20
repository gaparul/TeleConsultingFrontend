import * as React from "react";
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
import { Dayjs } from "dayjs";
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
          //   onSubmit={handleSubmit}
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
                required
                sx = {{minWidth: 700 }}
                label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => setDOB(newValue)}
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
                  onChange={val => setGender(val)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
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
