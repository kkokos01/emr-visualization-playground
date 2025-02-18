import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PatientChart from "./pages/patients/PatientChart";
import PatientChartAlt from "./pages/patients/PatientChartAlt";
import ClinicalChart from "./pages/patients/ClinicalChart";
import PatientRegistration from "./pages/patients/PatientRegistration";
import Messages from "./pages/communication/Messages";
import Calendar from "./pages/scheduling/Calendar";
import Tasks from "./pages/tasks/Tasks";
import Physician from "./pages/roles/Physician";
import Nurse from "./pages/roles/Nurse";
import Admin from "./pages/roles/Admin";
import Patient from "./pages/roles/Patient";
import BillingDashboard from "./pages/billing/BillingDashboard";
import ClaimDetail from "./pages/billing/ClaimDetail";
import PaymentsAndInvoices from "./pages/billing/PaymentsAndInvoices";
import OrdersAndResults from "./pages/clinical/OrdersAndResults";
import LabResults from "./pages/patient/LabResults";

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
        path: "/patient/:id",
        element: <PatientChart />,
      },
      {
        path: "/patient/:id/chart",
        element: <ClinicalChart />,
      },
      {
        path: "/patient/register",
        element: <PatientRegistration />,
      },
      {
        path: "/patient/:id/edit",
        element: <PatientRegistration />,
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
        path: "/clinical/orders",
        element: <OrdersAndResults />,
      },
      {
        path: "/patient/:id/results",
        element: <LabResults />,
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
      {
        path: "/roles/patient",
        element: <Patient />,
      },
      {
        path: "/billing",
        element: <BillingDashboard />,
      },
      {
        path: "/billing/claim/:id",
        element: <ClaimDetail />,
      },
      {
        path: "/billing/payments",
        element: <PaymentsAndInvoices />,
      }
    ]
  },
]);
