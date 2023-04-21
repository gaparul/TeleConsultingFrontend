import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import Register from "./components/Home/Register/Register"
import DashboardApp from './components/Dashboard/DashboardApp';
import PhoneSignUp from './components/Home/Login/PhoneSignUp';
import RegisterPatient from './components/Dashboard/RegisterPatient/RegisterPatient';
import PatientDetails from './components/Dashboard/PatientDetails/PatientDetails';

import Dashboard from './components/Dashboard/Dashboard';
import DashboardLayout from './components/patient/Dashboard/DashBoardLayout'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { element: <Navigate to="/login" />, index: true },
        { path: 'app', element: <DashboardApp /> },
        { path: 'patientRegister', element: <RegisterPatient /> },
        { path: 'patientDetails', element: <PatientDetails /> }, 
      ],
    },

    {
      path: '/patient/dashboard',
      element: <DashboardLayout/>,
      children: [
        // { element: <Navigate to="/patient/dashboard" />, index: true },
        // { element: <Navigate to="/login" />, index: true }   ,
        // { path: 'app', element: <DashboardApp /> },
        // { path: 'patientRegister', element: <RegisterPatient /> },
        // { path: 'patientDetails', element: <PatientDetails /> }, 
      ],
    },
    
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'home',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'phonesignup',
        element: <PhoneSignUp />,
    },
    

  ]);

  return routes;
}