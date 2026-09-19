import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Representatives from "../pages/Representatives";
import VisitPlans from "../pages/VisitPlans";
import Visits from "../pages/Visits";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Login from "../pages/Login";


export default function AppRoutes() {
  const { token } = useAuth();

  if (!token) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/customers"
        element={
          <MainLayout>
            <Customers />
          </MainLayout>
        }
      />

      <Route
        path="/representatives"
        element={
          <MainLayout>
            <Representatives />
          </MainLayout>
        }
      />
      
      <Route
       path="/visit-plans"
       element={
         <MainLayout>
           <VisitPlans />
         </MainLayout>
     }
   />

      <Route
        path="/visits"
        element={
          <MainLayout>
            <Visits />
          </MainLayout>
        }
      />


      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}