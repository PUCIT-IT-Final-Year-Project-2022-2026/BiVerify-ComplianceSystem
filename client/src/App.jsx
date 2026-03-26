import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import ClientSidebar   from "./components/ClientSidebar.jsx";
import ProviderSidebar from "./components/ProviderSidebar.jsx";

import ClientDashboard from "./pages/ClientSide/ClientDashboard.jsx";
import B2BNetwork      from "./pages/ClientSide/B2BNetwork.jsx";
import ServiceBookings from "./pages/ClientSide/ServiceBookings.jsx";
import ComplianceVault from "./pages/ClientSide/ComplianceVault.jsx";
import ProviderDashboard from "./pages/ProviderSide/ProviderDashboard.jsx";
import ProviderB2BNetwork      from "./pages/ProviderSide/ProviderB2BNetwork.jsx";

// ── placeholder pages ──────────────────────────────────
const Soon = ({ label }) => (
  <div style={{ padding: 40, fontFamily: "'DM Sans', sans-serif" }}>
    <h2 style={{ color: "#1A1D23" }}>{label}</h2>
    <p  style={{ color: "#6B7280", marginTop: 8 }}>Coming soon</p>
  </div>
);

// ── layout wrapper — picks sidebar based on path ───────
function Layout() {
  const { pathname } = useLocation();
  const isProvider = pathname.startsWith("/provider");

  return (
    <>
      {/* Sidebar — never remounts, just swaps */}
      {isProvider ? <ProviderSidebar /> : <ClientSidebar />}

      {/* Page content */}
      <div style={{
        marginLeft: 240,
        minHeight: "100vh",
        background: "#F5F6FA",
        overflowX: "hidden",
        width: "calc(100% - 240px)",
      }}>
        <Routes>

          {/* ── ROOT ── */}
          <Route path="/" element={<Navigate to="/overview" replace />} />

          {/* ── CLIENT ROUTES ── */}
          <Route path="/overview"  element={<ClientDashboard />} />
          <Route path="/network"   element={<B2BNetwork />} />
          <Route path="/Bookings"  element={<ServiceBookings />} />
          <Route path="/vault"     element={<ComplianceVault />} />
          <Route path="/team"      element={<Soon label="My Team" />} />
          <Route path="/audit"     element={<Soon label="Audit Logs" />} />
          <Route path="/settings"  element={<Soon label="Settings" />} />

          {/* ── PROVIDER ROUTES ── */}
          <Route path="/provider"                   element={<Navigate to="/provider/overview" replace />} />
          <Route path="/provider/overview"          element={<ProviderDashboard />} />
          <Route path="/provider/network"           element={<ProviderB2BNetwork />} />
          <Route path="/provider/incoming-requests" element={<Soon label="Incoming Requests" />} />
          <Route path="/provider/certifications"    element={<Soon label="Certifications" />} />
          <Route path="/provider/company-staff"     element={<Soon label="Company Staff" />} />
          <Route path="/provider/audit"             element={<Soon label="Audit History" />} />
          <Route path="/provider/settings"          element={<Soon label="Provider Settings" />} />

          {/* ── CATCH-ALL ── */}
          <Route path="*" element={<Navigate to="/overview" replace />} />

        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
