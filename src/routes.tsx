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
import TestResults from "./pages/patient/TestResults";
import PatientAppointments from "./pages/patient/Appointments";
import DeepAnalysis from "./pages/clinical/DeepAnalysis";
import PatientAnalysis from "./pages/patient/PatientAnalysis";
import SecondOpinion from "./pages/patient/SecondOpinion";
import HealthAvatar from "./pages/gamified/HealthAvatar";
import FlowBoard from "./pages/clinical/FlowBoard";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Roles from "./pages/admin/Roles";
import PracticeSettings from "./pages/admin/PracticeSettings";
import SystemActivity from "./pages/admin/SystemActivity";
import EmailTemplates from "./pages/admin/EmailTemplates";
import ApiKeys from "./pages/admin/ApiKeys";
import BackupRestore from "./pages/admin/BackupRestore";
import SystemSettings from "./pages/admin/SystemSettings";

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
        element: <PatientAppointments />,
      },
      {
        path: "/admin/appointments",
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
        path: "/clinical/analysis",
        element: <DeepAnalysis />,
      },
      {
        path: "/patient/results",
        element: <TestResults />,
      },
      {
        path: "/patient/:id/results",
        element: <LabResults />,
      },
      {
        path: "/patient/:id/records",
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
      },
      {
        path: "/patient/analysis/:id",
        element: <PatientAnalysis />,
      },
      {
        path: "/patient/:id/analysis",
        element: <PatientAnalysis />,
      },
      {
        path: "/patient/:id/second-opinion",
        element: <SecondOpinion />,
      },
      {
        path: "/health-avatar",
        element: <HealthAvatar />,
      },
      {
        path: "/clinical/flow-board",
        element: <FlowBoard />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/roles",
        element: <Roles />,
      },
      {
        path: "/admin/settings",
        element: <PracticeSettings />,
      },
      {
        path: "/admin/activity",
        element: <SystemActivity />,
      },
      {
        path: "/admin/email-templates",
        element: <EmailTemplates />,
      },
      {
        path: "/admin/api-keys",
        element: <ApiKeys />,
      },
      {
        path: "/admin/backup",
        element: <BackupRestore />,
      },
      {
        path: "/admin/system",
        element: <SystemSettings />,
      }
    ]
  },
]);
