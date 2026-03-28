import { useState } from "react";

const G  = "#2b9d4e";
const BG = "#F0F2F5";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${BG}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
  input, button { font-family: 'Inter', sans-serif; }
  input:focus { outline: none; }
`;

const PATHS = {
  inbox:    ["M22 12h-6l-2 3H10l-2-3H2","M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"],
  bell:     ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
  search:   ["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18","M6 6l12 12"],
  clock:    ["M12 2a10 10 0 100 20A10 10 0 0012 2z","M12 6v6l4 2"],
  alert:    ["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4","M12 17h.01"],
  checkAll: ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
  building: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
  filter:   ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
  download: ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M7 10l5 5 5-5","M12 15V3"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 100 6 3 3 0 000-6z"],
  refresh:  ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"],
};

function Icon({ name, size = 16, color = "currentColor", sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {(PATHS[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function StatCard({ label, value, icon, iconBg, iconColor, accentColor, badge, badgeBg, badgeColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0",
      boxShadow: hov ? "0 8px 28px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
      transform: hov ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.2s", padding: "22px 20px 20px",
      display: "flex", flexDirection: "column", gap: 14,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: accentColor, borderRadius: "16px 0 0 16px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingLeft: 8 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={20} color={iconColor} sw={1.9} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: badgeBg, color: badgeColor }}>{badge}</span>
      </div>
      <div style={{ paddingLeft: 8 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#1a1f2e", letterSpacing: "-1.5px", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

// ── Initial requests data ──────────────────────────────────────────────────────
const INITIAL_REQUESTS = [
  { id: "#1051", company: "TechCorp Ltd",        service: "Background Verification", date: "26 Mar 2026", priority: "High",   status: "pending"   },
  { id: "#1050", company: "Horizon Industries",  service: "Document Authentication", date: "25 Mar 2026", priority: "Medium", status: "pending"   },
  { id: "#1049", company: "GreenLeaf Solutions", service: "Employment Verification", date: "24 Mar 2026", priority: "Low",    status: "accepted"  },
  { id: "#1048", company: "Pinnacle Corp",       service: "Criminal Record Check",   date: "23 Mar 2026", priority: "High",   status: "pending"   },
  { id: "#1047", company: "Orion Partners",      service: "Reference Verification",  date: "22 Mar 2026", priority: "Medium", status: "accepted"  },
  { id: "#1046", company: "Delta Systems",       service: "Education Verification",  date: "21 Mar 2026", priority: "Low",    status: "rejected"  },
  { id: "#1045", company: "Nova Enterprises",    service: "Background Verification", date: "20 Mar 2026", priority: "High",   status: "pending"   },
];

const PRIORITY = {
  High:   { color: "#dc2626", bg: "#fef2f2" },
  Medium: { color: "#d97706", bg: "#fffbeb" },
  Low:    { color: "#059669", bg: "#ecfdf5" },
};

const STATUS_MAP = {
  pending:  { label: "Pending",  color: "#d97706", bg: "#fffbeb" },
  accepted: { label: "Accepted", color: "#059669", bg: "#ecfdf5" },
  rejected: { label: "Rejected", color: "#dc2626", bg: "#fef2f2" },
};

export default function IncomingRequests() {
  const [requests, setRequests]   = useState(INITIAL_REQUESTS);
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);   // { msg, type }

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAccept = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "accepted" } : r));
    showToast(`Request ${id} accepted successfully`, "success");
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
    showToast(`Request ${id} rejected`, "error");
  };

  const filtered = requests.filter(r => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchSearch = r.company.toLowerCase().includes(search.toLowerCase()) ||
                        r.service.toLowerCase().includes(search.toLowerCase()) ||
                        r.id.includes(search);
    return matchFilter && matchSearch;
  });

  const counts = {
    all:      requests.length,
    pending:  requests.filter(r => r.status === "pending").length,
    accepted: requests.filter(r => r.status === "accepted").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const STATS = [
    { label: "Total Requests", value: counts.all,      icon: "inbox",    accentColor: "#3b82f6", iconBg: "#eff6ff", iconColor: "#3b82f6", badge: "All",      badgeBg: "#eff6ff", badgeColor: "#2563eb" },
    { label: "Pending Review", value: counts.pending,  icon: "clock",    accentColor: "#f59e0b", iconBg: "#fffbeb", iconColor: "#f59e0b", badge: "Action",   badgeBg: "#fffbeb", badgeColor: "#d97706" },
    { label: "Accepted",       value: counts.accepted, icon: "checkAll", accentColor: G,         iconBg: "#ecfdf5", iconColor: G,         badge: "Approved", badgeBg: "#ecfdf5", badgeColor: "#059669" },
    { label: "Rejected",       value: counts.rejected, icon: "x",        accentColor: "#ef4444", iconBg: "#fef2f2", iconColor: "#ef4444", badge: "Declined", badgeBg: "#fef2f2", badgeColor: "#dc2626" },
  ];

  const TABS = [
    { id: "all",      label: `All (${counts.all})`           },
    { id: "pending",  label: `Pending (${counts.pending})`   },
    { id: "accepted", label: `Accepted (${counts.accepted})` },
    { id: "rejected", label: `Rejected (${counts.rejected})` },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: BG }}>

        {/* TOAST */}
        {toast && (
          <div style={{
            position: "fixed", top: 20, right: 24, zIndex: 999,
            background: toast.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${toast.type === "success" ? "#6ee7b7" : "#fca5a5"}`,
            color: toast.type === "success" ? "#065f46" : "#991b1b",
            padding: "12px 20px", borderRadius: 12, fontSize: 13.5, fontWeight: 600,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", gap: 10,
            animation: "fadeIn 0.2s ease",
          }}>
            <Icon name={toast.type === "success" ? "check" : "x"} size={16} color={toast.type === "success" ? "#059669" : "#dc2626"} sw={2.5} />
            {toast.msg}
          </div>
        )}

        {/* TOP NAV */}
        <nav style={{ height: 62, background: G, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="inbox" size={17} color="#fff" sw={1.9} />
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>Incoming Requests</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase" }}>Service Operations</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                <Icon name="search" size={13} color="rgba(255,255,255,0.5)" sw={2} />
              </span>
              <input placeholder="Search…" style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px 7px 30px", color: "#fff", fontSize: 13, width: 185 }} />
            </div>
            <div style={{ position: "relative", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="bell" size={15} color="#fff" sw={1.8} />
              <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, background: "#f59e0b", borderRadius: "50%", border: `2px solid ${G}` }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>SP</div>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Service Provider</span>
          </div>
        </nav>

        {/* CONTENT */}
        <div style={{ padding: "28px 30px", maxWidth: 1300, margin: "0 auto" }}>

          {/* Page heading */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 26 }}>
            <div>
              <h1 style={{ fontSize: 23, fontWeight: 800, color: "#1a1f2e", letterSpacing: "-0.5px" }}>Incoming Requests</h1>
              <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Review and respond to all incoming service requests from B2B clients.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: `1.5px solid ${G}`, background: "#fff", color: G, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <Icon name="download" size={14} color={G} sw={2} /> Export
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: "none", background: G, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                <Icon name="refresh" size={14} color="#fff" sw={2} /> Refresh
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Table Card */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Toolbar */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f1f4", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative", minWidth: 260 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon name="search" size={14} color="#9ca3af" sw={2} />
                </span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by company, service or ID…" style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #e5e7eb", borderRadius: 9, fontSize: 13, color: "#374151", background: "#f9fafb" }} />
              </div>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setFilter(t.id)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 500, background: filter === t.id ? G : "#f3f4f6", color: filter === t.id ? "#fff" : "#6b7280", transition: "all 0.15s" }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f0f1f4" }}>
                    {["Request ID", "Company", "Service Type", "Date", "Priority", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "52px 20px", textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="inbox" size={20} color="#d1d5db" sw={1.6} />
                          </div>
                          <span style={{ fontSize: 14, color: "#9ca3af" }}>No requests found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r, i) => {
                      const st = STATUS_MAP[r.status];
                      const pr = PRIORITY[r.priority];
                      const isPending = r.status === "pending";
                      return (
                        <tr key={r.id}
                          style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", transition: "background 0.12s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          {/* ID */}
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: G }}>{r.id}</span>
                          </td>
                          {/* Company */}
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon name="building" size={14} color={G} sw={1.9} />
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1f2e" }}>{r.company}</span>
                            </div>
                          </td>
                          {/* Service */}
                          <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280" }}>{r.service}</td>
                          {/* Date */}
                          <td style={{ padding: "14px 16px", fontSize: 12.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{r.date}</td>
                          {/* Priority */}
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: pr.color, background: pr.bg }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: pr.color, display: "inline-block" }} />
                              {r.priority}
                            </span>
                          </td>
                          {/* Status */}
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: st.color, background: st.bg }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.color, display: "inline-block" }} />
                              {st.label}
                            </span>
                          </td>
                          {/* Actions */}
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {/* View */}
                              <button title="View Details" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                <Icon name="eye" size={14} color="#6b7280" sw={1.8} />
                              </button>

                              {isPending ? (
                                <>
                                  {/* Accept */}
                                  <button onClick={() => handleAccept(r.id)} title="Accept Request" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "none", background: "#ecfdf5", color: "#059669", fontSize: 12.5, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#ecfdf5"; e.currentTarget.style.color = "#059669"; }}>
                                    <Icon name="check" size={13} color="currentColor" sw={2.5} /> Accept
                                  </button>
                                  {/* Reject */}
                                  <button onClick={() => handleReject(r.id)} title="Reject Request" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "none", background: "#fef2f2", color: "#dc2626", fontSize: 12.5, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}>
                                    <Icon name="x" size={13} color="currentColor" sw={2.5} /> Reject
                                  </button>
                                </>
                              ) : (
                                <span style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>
                                  {r.status === "accepted" ? "✓ Accepted" : "✗ Rejected"}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ padding: "13px 20px", borderTop: "1px solid #f0f1f4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, color: "#9ca3af" }}>Showing {filtered.length} of {requests.length} requests</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["Prev", "1", "2", "Next"].map(p => (
                  <button key={p} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #e5e7eb", background: p === "1" ? G : "#fff", color: p === "1" ? "#fff" : "#6b7280", fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
