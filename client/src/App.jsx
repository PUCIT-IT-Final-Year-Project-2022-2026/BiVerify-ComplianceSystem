import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import ClientSidebar   from "./components/ClientSidebar.jsx";
import ProviderSidebar from "./components/ProviderSidebar.jsx";
import LoginPage      from "./pages/Authentication/LoginPage";
import ForgotPassword  from "./pages/Authentication/ForgotPassword";

import ClientDashboard from "./pages/ClientSide/ClientDashboard.jsx";
import B2BNetwork      from "./pages/ClientSide/B2BNetwork.jsx";
import ServiceBookings from "./pages/ClientSide/ServiceBookings.jsx";
import ComplianceVault from "./pages/ClientSide/ComplianceVault.jsx";

import ProviderDashboard   from "./pages/ProviderSide/ServiceProviderDashboard.jsx";
import ProviderB2BNetwork  from "./pages/ProviderSide/ProviderB2BNetwork.jsx";

// Client Pages
import MyTeamClient             from "./pages/ClientSide/MyTeam.jsx";
import SystemAuditLogsClient    from "./pages/ClientSide/SystemAuditLogs.jsx";
import OrganizationSettingsClient from "./pages/ClientSide/OrganizationSettings.jsx";

// Provider Pages
import MyTeamProvider             from "./pages/ProviderSide/MyTeam.jsx";
import SystemAuditLogsProvider    from "./pages/ProviderSide/SystemAuditLogs.jsx";
import OrganizationSettingsProvider from "./pages/ProviderSide/OrganizationSettings.jsx";
import IncomingRequests from "./pages/ProviderSide/IncomingRequests.jsx";
import ComplianceDocuments from "./pages/ProviderSide/ComplianceDocuments.jsx";
import ServiceProviderDashboard from "./pages/ProviderSide/ServiceProviderDashboard.jsx";


// ── placeholder pages ──────────────────────────────────
const Soon = ({ label }) => (
  <div style={{ padding: 40, fontFamily: "'DM Sans', sans-serif" }}>
    <h2 style={{ color: "#1A1D23" }}>{label}</h2>
    <p  style={{ color: "#6B7280", marginTop: 8 }}>Coming soon</p>
  </div>
);

// ── layout wrapper ───────
function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const isProvider = pathname.startsWith("/provider");

  return (
    <>
      {isProvider ? <ProviderSidebar /> : <ClientSidebar />}
      <div style={{
        marginLeft: 240,
        minHeight: "100vh",
        background: "#F5F6FA",
        overflowX: "hidden",
        width: "calc(100% - 240px)",
      }}>
        {children}
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Auth Routes ── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* ── Client Dashboard Routes ── */}
        <Route path="/overview"                   element={<DashboardLayout><ClientDashboard /></DashboardLayout>} />
        <Route path="/network"                    element={<DashboardLayout><B2BNetwork /></DashboardLayout>} />
        <Route path="/Bookings"                   element={<DashboardLayout><ServiceBookings /></DashboardLayout>} />
        <Route path="/vault"                      element={<DashboardLayout><ComplianceVault /></DashboardLayout>} />
        <Route path="/team"                       element={<DashboardLayout><MyTeamClient /></DashboardLayout>} />
        <Route path="/audit"                      element={<DashboardLayout><SystemAuditLogsClient /></DashboardLayout>} />
        <Route path="/settings"                   element={<DashboardLayout><OrganizationSettingsClient /></DashboardLayout>} />

        {/* ── Provider Dashboard Routes ── */}
        <Route path="/provider/overview"          element={<DashboardLayout><ServiceProviderDashboard /></DashboardLayout>} />
        <Route path="/provider/network"           element={<DashboardLayout><ProviderB2BNetwork /></DashboardLayout>} />
        <Route path="/provider/incoming-requests" element={<DashboardLayout><IncomingRequests /></DashboardLayout>} />
        <Route path="/provider/certifications"    element={<DashboardLayout><ComplianceDocuments/></DashboardLayout>} />
        <Route path="/provider/team"              element={<DashboardLayout><MyTeamProvider /></DashboardLayout>} />
        <Route path="/provider/audit"             element={<DashboardLayout><SystemAuditLogsProvider /></DashboardLayout>} />
        <Route path="/provider/settings"          element={<DashboardLayout><OrganizationSettingsProvider /></DashboardLayout>} />

        {/* ── Global Catch-All ── */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
