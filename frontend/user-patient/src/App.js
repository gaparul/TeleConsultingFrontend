import { Routes as Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import './App.css'

import Router from './routes';
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import Register from "./components/Home/Register/Register"
import  UserProfile from './components/Home/UserProfile/UserProfile';
import { createTheme, ThemeProvider } from '@mui/material'
import PhoneSignUp from './components/Home/Login/PhoneSignUp';
import { UserAuthContextProvider } from './context/UserAuthContext';

import Dashboard from './components/Dashboard/Dashboard';


export const theme = createTheme({
   palette: {
    primary:{
      main: '#26c6da',
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
    <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {/* <ScrollToTop />
            <StyledChart /> */}
            <UserAuthContextProvider>
            <Router />
            </UserAuthContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    
  );
}

// {/* <ThemeProvider theme={theme}></ThemeProvider>

      
//       <BrowserRouter>
        
//         <UserAuthContextProvider>
//         <Switch>
//           <Route exact path='/' element={<Home/>}/>
//           <Route path='/home'element={<Home/>}/>
//           <Route path='/login' element={ <Login/>} />
//           <Route path="/phonesignup" element={<PhoneSignUp />} />
//           <Route path="/register" element={<Register/>} />
//           <Route path='/userprofile' element={<UserProfile/>} />
//           <Route path='/dashboard' element={<Dashboard/>} children/>
//         </Switch>
//         </UserAuthContextProvider>
//       </BrowserRouter>
//     </> */}

export default App;
