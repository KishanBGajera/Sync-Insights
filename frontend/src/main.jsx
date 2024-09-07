import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from './Components/LoginPage.jsx';
import ManagerModule from './Components/Manager/ManagerModule.jsx';
import Calender from './Components/Employee/Calender.jsx';
import Analytics from './Components/CEO/Analytics.jsx';
import Calendar from './Components/Manager/Calendar.jsx';
import Schedule from './Components/Manager/Schedule.jsx';
import Task from './Components/Employee/Task.jsx';
import ScheduleEmp from './Components/Employee/ScheduleEmp.jsx';
import Dashboard from './Components/CEO/Dashboard.jsx';
import Invoice from './components/CEO/Invoice.jsx';
import ScheduleCEO from './components/CEO/ScheduleCEO.jsx';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [{
      path: '/insights/dashboard',
      element: <ManagerModule />,
    },
    {
      path: '/insights/calendar',
      element: <Calendar />
    },
    {
      path: '/insights/schedule',
      element: <Schedule />
    }, {
      path: '/employee/dashboard',
      element: <Task />
    }, {
      path: '/employee/calendar',
      element: <Calender />
    }, {
      path: '/employee/schedule',
      element: <ScheduleEmp />
    }, {
      path: '/ceo/dashboard',
      element: <Dashboard />
    }, {
      path: '/ceo/analytics',
      element: <Analytics />
    }, {
      path: '/ceo/invoice',
      element: <Invoice />
    },{
      path:'/ceo/schedule',
      element:<ScheduleCEO />
    },
    {
      path: '/',
      element: <LoginPage></LoginPage>
    },]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
