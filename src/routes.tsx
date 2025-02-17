
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Physician from "./pages/roles/Physician";
import Nurse from "./pages/roles/Nurse";
import Admin from "./pages/roles/Admin";
import Patients from "./pages/metrics/Patients";
import Appointments from "./pages/metrics/Appointments";
import Labs from "./pages/metrics/Labs";
import Messages from "./pages/metrics/Messages";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/physician",
        element: <Physician />,
      },
      {
        path: "/nurse",
        element: <Nurse />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/labs",
        element: <Labs />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
