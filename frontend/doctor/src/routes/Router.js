import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//

import Login from '../components/Home/Login/Login';
import DashboardLayout from '../components/Home/Dashboard/DashBoardLayout';
import PatientInformation from '../components/Home/PatientInformation/PatientInformation';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        // { element: <Navigate to="/login" />, index: true },
        // { path: 'app', element: <DashboardAppPage /> },
        // { path: 'appointments', element: <Appointments /> },
        { path: 'patientinfo', element: <PatientInformation /> }
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
        path: '/',
        element: <Login />,
    }
  ]);

  return routes;
}