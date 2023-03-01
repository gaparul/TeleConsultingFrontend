import { Routes as Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import './App.css'

import Header from "./components/Bar/Header/Header"
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import Register from "./components/register/register"
import  UserProfile from './components/Home/UserProfile/UserProfile';
import { createTheme, ThemeProvider } from '@mui/material'
import Signup from './components/Home/Login/SignUp';
import PhoneSignUp from './components/Home/Login/PhoneSignUp';
import { UserAuthContextProvider } from './context/UserAuthContext';


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
          <Route path='/signup' element={ <Signup/>} />
          <Route path="/phonesignup" element={<PhoneSignUp />} />
          <Route path="/register" element={<Register/>} />
        </Switch>
        </UserAuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
