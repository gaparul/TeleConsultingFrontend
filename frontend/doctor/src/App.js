import { Routes as Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material'

import './App.css'

import LogIn from './components/Home/Login/Login'
import DashBoard from './components/Home/Dashboard/Dashboard'

import DashboardLayout from './components/Home/Dashboard/DashBoardLayout';

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
        <Switch>
          <Route exact path='/' element={<LogIn/>}/>
          <Route exact path='/signin' element={<LogIn/>}/>
          <Route exact path='/dashboard' element={<DashBoard/>}/>
          <Route exact path='/dashboardlayout' element={<DashboardLayout/>}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
