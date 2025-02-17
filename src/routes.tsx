
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PatientChart from "./pages/patients/PatientChart";
import PatientChartAlt from "./pages/patients/PatientChartAlt";
import ClinicalChart from "./pages/patients/ClinicalChart";
import Messages from "./pages/communication/Messages";
import Calendar from "./pages/scheduling/Calendar";
import Tasks from "./pages/tasks/Tasks";
import Physician from "./pages/roles/Physician";
import Nurse from "./pages/roles/Nurse";
import Admin from "./pages/roles/Admin";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/patients",
        element: <Dashboard />,
      },
      {
        path: "/patient/1",
        element: <PatientChart />,
      },
      {
        path: "/patient/2",
        element: <PatientChartAlt />,
      },
      {
        path: "/patient/:id/chart",
        element: <ClinicalChart />,
      },
      {
        path: "/chart",
        element: <PatientChart />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/appointments",
        element: <Calendar />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/roles/physician",
        element: <Physician />,
      },
      {
        path: "/roles/nurse",
        element: <Nurse />,
      },
      {
        path: "/roles/admin",
        element: <Admin />,
      },
    ]
  },
]);
