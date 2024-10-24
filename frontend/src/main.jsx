import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext.jsx"; // Import AuthProvider
import ProtectedRoute from "./utils/ProtectedRoute.jsx"; // Import ProtectedRoute

import LoginPage from "./Components/LoginPage.jsx";
import ManagerModule from "./components/Manager/ManagerModule.jsx";
import Calendar from "./Components/Manager/Calendar.jsx";
import Schedule from "./Components/Manager/Schedule.jsx";
import Task from "./Components/Employee/Task.jsx";
import Calender from "./Components/Employee/Calender.jsx";
import ScheduleEmp from "./Components/Employee/ScheduleEmp.jsx";
import Dashboard from "./Components/CEO/Dashboard.jsx";
import Analytics from "./Components/CEO/Analytics.jsx";
import Invoice from "./components/CEO/Invoice.jsx";
import ScheduleCEO from "./components/CEO/ScheduleCEO.jsx";
import CreateDepartment from "./components/CEO/CreateDepartment.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import AssignedTasks from "./components/Manager/AssignedTasks.jsx";
import Insights from "./components/Employee/Insights.jsx";

// Setup routes with role-based protection using roleIds
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/insights/dashboard",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706715e74f0afc0bcfead3a",
              "670853628c3d2e258a60836b",
            ]}
          >
            <ManagerModule />
          </ProtectedRoute>
        ),
      },
      {
        path: "/insights/calendar",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706715e74f0afc0bcfead3a",
              "670853628c3d2e258a60836b",
            ]}
          >
            <Calendar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/insights/tasks",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706715e74f0afc0bcfead3a",
              "670853628c3d2e258a60836b",
            ]}
          >
            <AssignedTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/insights/schedule",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706715e74f0afc0bcfead3a",
              "670853628c3d2e258a60836b",
            ]}
          >
            <Schedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee/dashboard",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706716874f0afc0bcfead3c",
              "6706716f74f0afc0bcfead3e",
              "6706717574f0afc0bcfead40",
              "6706717b74f0afc0bcfead42",
              "6706718a74f0afc0bcfead46",
              "6706719074f0afc0bcfead48",
              "67085906fec7e7b4edb0f7d4",
              "6708590dfec7e7b4edb0f7d6",
            ]}
          >
            <Task />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee/calendar",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706716874f0afc0bcfead3c",
              "6706716f74f0afc0bcfead3e",
              "6706717574f0afc0bcfead40",
              "6706717b74f0afc0bcfead42",
              "6706718a74f0afc0bcfead46",
              "6706719074f0afc0bcfead48",
              "67085906fec7e7b4edb0f7d4",
              "6708590dfec7e7b4edb0f7d6",
            ]}
          >
            <Calender />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee/insight",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706716874f0afc0bcfead3c",
              "6706716f74f0afc0bcfead3e",
              "6706717574f0afc0bcfead40",
              "6706717b74f0afc0bcfead42",
              "6706718a74f0afc0bcfead46",
              "6706719074f0afc0bcfead48",
              "67085906fec7e7b4edb0f7d4",
              "6708590dfec7e7b4edb0f7d6",
            ]}
          >
            <Insights />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee/schedule",
        element: (
          <ProtectedRoute
            allowedRoleIds={[
              "6706716874f0afc0bcfead3c",
              "6706716f74f0afc0bcfead3e",
              "6706717574f0afc0bcfead40",
              "6706717b74f0afc0bcfead42",
              "6706718a74f0afc0bcfead46",
              "6706719074f0afc0bcfead48",
              "67085906fec7e7b4edb0f7d4",
              "6708590dfec7e7b4edb0f7d6",
            ]}
          >
            <ScheduleEmp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ceo/dashboard",
        element: (
          <ProtectedRoute allowedRoleIds={["6706718274f0afc0bcfead44"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ceo/analytics",
        element: (
          <ProtectedRoute allowedRoleIds={["6706718274f0afc0bcfead44"]}>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ceo/department",
        element: (
          <ProtectedRoute allowedRoleIds={["6706718274f0afc0bcfead44"]}>
            <CreateDepartment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ceo/schedule",
        element: (
          <ProtectedRoute allowedRoleIds={["6706718274f0afc0bcfead44"]}>
            <ScheduleCEO />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
