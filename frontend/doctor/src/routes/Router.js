import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//

import Login from '../components/Home/Login/Login';
import DashboardLayout from '../components/Home/Dashboard/DashBoardLayout';
import PatientInformation from '../components/Home/PatientInformation/PatientInformation';
import DashboardApp from '../components/Home/Dashboard/DashboardApp';
import AppointmentHistory from '../components/AppointmentHistory/AppointmentHistory';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/doctor/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/doctor/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardApp /> },
        { path: 'history', element: <AppointmentHistory /> },
        { path: 'patientinfo', element: <PatientInformation /> }
      ],
    },
    {
        path: '/',
        element: <Login />,
      },

    {
      path: 'login',
      element: <Login />,
    }

  ]);

  return routes;
}