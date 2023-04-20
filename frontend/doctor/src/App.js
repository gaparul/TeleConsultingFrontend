import { Routes as Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createTheme, ThemeProvider } from '@mui/material'

import './App.css'

import Router from './routes/Router';
import LogIn from './components/Home/Login/Login'
import DashBoard from './components/Home/Dashboard/Dashboard'

import DashboardLayout from './components/Home/Dashboard/DashBoardLayout';

export const theme = createTheme({
   palette: {
    primary:{
      main: '#01579b',
    },
    secondary:{
      main: '#b3e5fc',
    },
    alternate:{
      main: '#81d4fa',
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
    {/* <ThemeProvider theme={theme}></ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' element={<LogIn/>}/>
          <Route exact path='/signin' element={<LogIn/>}/>
          <Route exact path='/dashboard' element={<DashBoard/>}/>
          <Route exact path='/dashboardlayout' element={<DashboardLayout/>}/>
        </Switch>
      </BrowserRouter>
    </> */}
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <ScrollToTop />
          <StyledChart /> */}
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </>

  );
}

export default App;
