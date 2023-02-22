import { Routes as Switch } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { auth } from './firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

import './App.css';
import Header from "./components/Bar/Header/Header"
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import  UserProfile from './components/Home/UserProfile/UserProfile';
import { createTheme, ThemeProvider } from '@mui/material'


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
  const [user] = useAuthState(auth)
  return (
    <>
    <ThemeProvider theme={theme}></ThemeProvider>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path='/login'> user ? <UserProfile/> : <Login/> </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
