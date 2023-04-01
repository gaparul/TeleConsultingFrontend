import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Home from "./components/Home/Home"
import Login from "./components/Home/Login/Login"
import Register from "./components/Home/Register/Register"
import DashboardApp from './components/Dashboard/DashboardApp';
import PhoneSignUp from './components/Home/Login/PhoneSignUp';

import Dashboard from './components/Dashboard/Dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // { element: <Navigate to="/login" />, index: true },
        { path: 'app', element: <DashboardApp /> },
        // { path: 'appointments', element: <Appointments /> },
        // { path: 'patientinfo', element: <PatientInformation /> }
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