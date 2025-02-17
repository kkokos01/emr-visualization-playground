
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PatientChart from "./pages/patients/PatientChart";
import Messages from "./pages/communication/Messages";
import Calendar from "./pages/scheduling/Calendar";
import Tasks from "./pages/tasks/Tasks";

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
        element: <Dashboard />, // Temporary redirect to Dashboard until we have a PatientList component
      },
      {
        path: "/patient/:id",
        element: <PatientChart />,
      },
      {
        path: "/chart",
        element: <PatientChart />, // Redirect /chart to PatientChart
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/appointments",
        element: <Calendar />, // Match the URL in sidebar
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ]
  },
]);
