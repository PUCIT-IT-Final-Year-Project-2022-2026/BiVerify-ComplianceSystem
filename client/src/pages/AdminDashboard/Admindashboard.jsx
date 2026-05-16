import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/client";

const Ico = ({ n, s = 15, c = "#fff" }) => {
// ... keep existing Ico ...
  const icons = {
    shield:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    bell:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    org:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    active:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    pending:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    users:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    check:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };
  return icons[n] || null;
};

const G = "#2b9d4e", GD = "#1f7a3b";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([]);
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const [statsRes, providersRes] = await Promise.all([
        api.get("/api/admin/dashboard/stats"),
        api.get("/api/admin/dashboard/pending-providers")
      ]);

      const mappedStats = [
        { title: "Total Organizations",  value: statsRes.data.totalOrganizations, icon: "org",     accent: "" },
        { title: "Active Organizations", value: statsRes.data.activeOrganizations, icon: "active",  accent: "" },
        { title: "Pending Approvals",    value: statsRes.data.pendingApprovals,    icon: "pending", accent: "warn" },
        { title: "Total Users",          value: statsRes.data.totalUsers,           icon: "users",   accent: "" },
      ];

      setStatsData(mappedStats);
      setPendingProviders(providersRes.data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApprove = async (p) => {
    try {
      await api.post(`/api/admin/dashboard/approve-provider/${p.id}`);
      fetchDashboard();
    } catch (err) {
      alert("Failed to approve provider");
    }
  };

  const handleReject = async (p) => {
    if (!window.confirm("Are you sure you want to reject this application?")) return;
    try {
      await api.post(`/api/admin/dashboard/reject-provider/${p.id}`);
      fetchDashboard();
    } catch (err) {
      alert("Failed to reject provider");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F6FA", fontFamily: "'Inter', sans-serif" }}>

      {/* ── SIDEBAR — reusable component, no sidebar code here ── */}
      <AdminSidebar />

      {/* ── TOP NAV — full width, sits above sidebar via zIndex ── */}
      <nav style={{
        width: "100%", height: 60, background: G,
        padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        boxShadow: "0 2px 8px rgba(31,122,59,0.2)", boxSizing: "border-box",
      }}>

        {/* LEFT: BiVerify brand over sidebar zone */}
        <div style={{ width: 240, flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: GD, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ico n="shield" s={15} c="#fff" />
          </div>
          <span style={{ color: "#fff", fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>BiVerify</span>
        </div>

        {/* CENTER: calendar icon + title + subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div style={{ width: 36, height: 36, background: GD, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ico n="calendar" s={16} c="#fff" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.1px" }}>Admin Dashboard</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 10.5, letterSpacing: "0.2px" }}>Overview · Manage organizations</span>
          </div>
        </div>

        {/* RIGHT: New Request + bell + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ width: 34, height: 34, borderRadius: "50%", background: GD, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Ico n="bell" s={15} c="rgba(255,255,255,0.85)" />
            <span style={{ position: "absolute", top: 5, right: 6, width: 8, height: 8, background: "#F59E0B", borderRadius: "50%", border: `2px solid ${G}` }} />
          </button>

          <div style={{ width: 34, height: 34, borderRadius: "50%", background: GD, border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>AD</div>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Admin</span>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft: 240, marginTop: 60, padding: 24, background: "#F5F6FA", minHeight: "calc(100vh - 60px)", boxSizing: "border-box" }}>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {statsData.map((k, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(43,157,78,0.12)", padding: "18px 20px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: k.accent === "warn" ? "#F59E0B" : G, borderRadius: "12px 0 0 12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 11.5, fontWeight: 500, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.4px", flex: 1 }}>{k.title}</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: k.accent === "warn" ? "rgba(245,158,11,0.10)" : "rgba(43,157,78,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ico n={k.icon} s={14} c={k.accent === "warn" ? "#F59E0B" : G} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#1A1D23", letterSpacing: "-0.8px", lineHeight: 1, marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{k.value}</div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(43,157,78,0.12)", margin: "8px 0" }} />
              <span style={{ fontSize: 11, color: "#6B7280" }}>{k.title === "Pending Approvals" ? "Awaiting review" : "Current total"}</span>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D23", marginBottom: 12, letterSpacing: "-0.3px" }}>Pending Provider Applications</h2>

        {/* Approval Cards */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1.5px solid rgba(43,157,78,0.35)", boxShadow: "0 2px 12px rgba(43,157,78,0.08)", display: "flex", flexDirection: "column", gap: 14 }}>
          {pendingProviders.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(43,157,78,0.14)", background: "linear-gradient(135deg, rgba(43,157,78,0.03) 0%, #fff 100%)", gap: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "#F59E0B", borderRadius: "12px 0 0 12px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1D23" }}>{p.company}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 9px", borderRadius: 20, fontSize: 10.5, fontWeight: 700, background: "rgba(245,158,11,0.12)", color: "#92400e", border: "1px solid rgba(245,158,11,0.3)", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
                    Pending Review
                  </span>
                </div>
                <span style={{ fontSize: 12.5, color: "#6B7280", fontFamily: "'DM Mono', monospace" }}>{p.domain}</span>
                <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
                  {[["Admin", p.admin], ["Signed Up", p.date]].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
                      <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{val}</span>
                    </div>
                  ))}
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 5, padding: "3px 9px", borderRadius: 8, fontSize: 11.5, fontWeight: 600, background: "rgba(245,158,11,0.10)", color: "#92400e", border: "1px solid rgba(245,158,11,0.22)", width: "fit-content" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
                  {p.doc} &bull; Exp {p.expiry}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0, minWidth: 155 }}>
                <button onClick={() => handleApprove(p)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: G, color: "#fff", cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 2px 10px rgba(43,157,78,0.3)", width: "100%" }}>
                  <Ico n="check" s={13} c="#fff" /> Approve &amp; Activate
                </button>
                <button onClick={() => handleReject(p)} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.04)", color: "#EF4444", cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%" }}>
                  <Ico n="x" s={13} c="#EF4444" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}