import { Routes as Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import './App.css'

import Header from "./components/Bar/Header/Header"
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import Register from "./components/Home/Register/Register"
import  UserProfile from './components/Home/UserProfile/UserProfile';
import  SearchPatient from './components/Doctor/doctorHomePage'
import { createTheme, ThemeProvider } from '@mui/material'
import PhoneSignUp from './components/Home/Login/PhoneSignUp';
import { UserAuthContextProvider } from './context/UserAuthContext';
import DoctorLogin from './components/Doctor/Login/Login'


export const theme = createTheme({
   palette: {
    primary:{
      main: '#ddae36',
    },
    secondary:{
      main: '#f3e4bc',
    },
    alternate:{
      main: '#fbf6e8',
    },
    text:{
      secondary: '#212121',
    }
   }, 
   typography: {
      fontFamily: "Brygada 1918",
      fontWeightLight: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      fontWeightRegular: 500
   }
}) 

function App() {
  return (
    <>
    <ThemeProvider theme={theme}></ThemeProvider>
      <BrowserRouter>
        <Header></Header>
        <UserAuthContextProvider>
        <Switch>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path='/login' element={ <Login/>} />
          <Route path='/doctorHome' element= {<SearchPatient/>} />
          <Route path="/phonesignup" element={<PhoneSignUp />} />
          <Route path="/register" element={<Register/>} />
          <Route path='/userprofile' element={<UserProfile/>} />
          <Route path='/doctor' element={<DoctorLogin/>} />
        </Switch>
        </UserAuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
