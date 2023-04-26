
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createTheme, ThemeProvider } from '@mui/material'

import './App.css'

import Router from './routes/Router';

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
