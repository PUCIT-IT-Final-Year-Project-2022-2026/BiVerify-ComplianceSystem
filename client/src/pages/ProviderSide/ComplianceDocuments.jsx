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
  @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
`;

const PATHS = {
  badge:    ["M9 12l2 2 4-4","M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"],
  bell:     ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
  search:   ["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"],
  file:     ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6"],
  upload:   ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  download: ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M7 10l5 5 5-5","M12 15V3"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 100 6 3 3 0 000-6z"],
  clock:    ["M12 2a10 10 0 100 20A10 10 0 0012 2z","M12 6v6l4 2"],
  check:    ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
  alert:    ["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4","M12 17h.01"],
  x:        ["M18 6L6 18","M6 6l12 12"],
  plus:     ["M12 5v14","M5 12h14"],
  trash:    ["M3 6h18","M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6","M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"],
  refresh:  ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"],
  scroll:   ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
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

// ── Documents data ─────────────────────────────────────────────────────────────
const INITIAL_DOCS = [
  { id: "DOC-001", name: "Business Registration Certificate", category: "Legal",      uploaded: "01 Jan 2026", expiry: "01 Jan 2028", size: "2.4 MB", status: "approved",  type: "pdf"  },
  { id: "DOC-002", name: "ISO 9001:2015 Certificate",         category: "Quality",    uploaded: "15 Feb 2026", expiry: "15 Feb 2027", size: "1.1 MB", status: "approved",  type: "pdf"  },
  { id: "DOC-003", name: "Tax Compliance Certificate",         category: "Financial", uploaded: "10 Mar 2026", expiry: "10 Mar 2027", size: "0.8 MB", status: "pending",   type: "pdf"  },
  { id: "DOC-004", name: "Health & Safety Policy",             category: "Safety",    uploaded: "05 Mar 2026", expiry: "05 Mar 2027", size: "3.2 MB", status: "reviewing", type: "docx" },
  { id: "DOC-005", name: "Professional Indemnity Insurance",   category: "Insurance", uploaded: "20 Feb 2026", expiry: "20 Feb 2027", size: "1.5 MB", status: "approved",  type: "pdf"  },
  { id: "DOC-006", name: "Data Protection Agreement",          category: "Legal",     uploaded: "12 Jan 2026", expiry: "12 Jan 2027", size: "0.6 MB", status: "rejected",  type: "docx" },
  { id: "DOC-007", name: "Company Bank Statement",             category: "Financial", uploaded: "01 Mar 2026", expiry: "N/A",         size: "4.1 MB", status: "pending",   type: "pdf"  },
  { id: "DOC-008", name: "Staff Credentials Summary",          category: "HR",        uploaded: "25 Feb 2026", expiry: "N/A",         size: "2.0 MB", status: "reviewing", type: "xlsx" },
];

const STATUS_MAP = {
  approved:  { label: "Approved",  color: "#059669", bg: "#ecfdf5" },
  pending:   { label: "Pending",   color: "#d97706", bg: "#fffbeb" },
  reviewing: { label: "Reviewing", color: "#2563eb", bg: "#eff6ff" },
  rejected:  { label: "Rejected",  color: "#dc2626", bg: "#fef2f2" },
};

const CAT_COLORS = {
  Legal:     { color: "#7c3aed", bg: "#f5f3ff" },
  Quality:   { color: "#059669", bg: "#ecfdf5" },
  Financial: { color: "#2563eb", bg: "#eff6ff" },
  Safety:    { color: "#d97706", bg: "#fffbeb" },
  Insurance: { color: "#0891b2", bg: "#ecfeff" },
  HR:        { color: "#db2777", bg: "#fdf2f8" },
};

const FILE_COLORS = {
  pdf:  { color: "#dc2626", bg: "#fef2f2", label: "PDF"  },
  docx: { color: "#2563eb", bg: "#eff6ff", label: "DOCX" },
  xlsx: { color: "#059669", bg: "#ecfdf5", label: "XLSX" },
};

export default function ComplianceDocuments() {
  const [docs, setDocs]       = useState(INITIAL_DOCS);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [toast, setToast]     = useState(null);
  const [showModal, setShowModal] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    showToast("Document removed successfully", "success");
  };

  const filtered = docs.filter(d => {
    const matchFilter = filter === "all" || d.status === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                        d.category.toLowerCase().includes(search.toLowerCase()) ||
                        d.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all:       docs.length,
    approved:  docs.filter(d => d.status === "approved").length,
    pending:   docs.filter(d => d.status === "pending").length,
    reviewing: docs.filter(d => d.status === "reviewing").length,
    rejected:  docs.filter(d => d.status === "rejected").length,
  };

  const STATS = [
    { label: "Total Documents",   value: counts.all,       icon: "file",    accentColor: "#3b82f6", iconBg: "#eff6ff", iconColor: "#3b82f6", badge: "All",      badgeBg: "#eff6ff", badgeColor: "#2563eb" },
    { label: "Approved",          value: counts.approved,  icon: "check",   accentColor: G,         iconBg: "#ecfdf5", iconColor: G,         badge: "Valid",    badgeBg: "#ecfdf5", badgeColor: "#059669" },
    { label: "Pending / Review",  value: counts.pending + counts.reviewing, icon: "clock", accentColor: "#f59e0b", iconBg: "#fffbeb", iconColor: "#f59e0b", badge: "Action",   badgeBg: "#fffbeb", badgeColor: "#d97706" },
    { label: "Rejected",          value: counts.rejected,  icon: "alert",   accentColor: "#ef4444", iconBg: "#fef2f2", iconColor: "#ef4444", badge: "Reupload", badgeBg: "#fef2f2", badgeColor: "#dc2626" },
  ];

  const TABS = [
    { id: "all",       label: `All (${counts.all})`             },
    { id: "approved",  label: `Approved (${counts.approved})`   },
    { id: "pending",   label: `Pending (${counts.pending})`     },
    { id: "reviewing", label: `Reviewing (${counts.reviewing})` },
    { id: "rejected",  label: `Rejected (${counts.rejected})`   },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: BG }}>

        {/* TOAST */}
        {toast && (
          <div style={{ position: "fixed", top: 20, right: 24, zIndex: 999, background: toast.type === "success" ? "#ecfdf5" : "#fef2f2", border: `1px solid ${toast.type === "success" ? "#6ee7b7" : "#fca5a5"}`, color: toast.type === "success" ? "#065f46" : "#991b1b", padding: "12px 20px", borderRadius: 12, fontSize: 13.5, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 10, animation: "fadeIn 0.2s ease" }}>
            <Icon name={toast.type === "success" ? "check" : "x"} size={16} color={toast.type === "success" ? "#059669" : "#dc2626"} sw={2.5} />
            {toast.msg}
          </div>
        )}

        {/* UPLOAD MODAL */}
        {showModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px", width: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "fadeIn 0.2s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1f2e" }}>Upload Document</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>Add a new compliance document</div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="x" size={15} color="#6b7280" sw={2} />
                </button>
              </div>
              {/* Drop zone */}
              <div style={{ border: "2px dashed #d1fae5", borderRadius: 14, padding: "36px 20px", textAlign: "center", background: "#f0fdf4", marginBottom: 20, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = G}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#d1fae5"}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon name="upload" size={22} color={G} sw={1.9} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1f2e", marginBottom: 4 }}>Drop your file here</div>
                <div style={{ fontSize: 12.5, color: "#9ca3af" }}>Supports PDF, DOCX, XLSX — max 10MB</div>
              </div>
              {/* Fields */}
              {["Document Name", "Category"].map(f => (
                <div key={f} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{f}</label>
                  {f === "Category" ? (
                    <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 9, fontSize: 13, color: "#374151", background: "#f9fafb", fontFamily: "inherit", outline: "none" }}>
                      {Object.keys(CAT_COLORS).map(c => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input placeholder={`Enter ${f.toLowerCase()}…`} style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 9, fontSize: 13, color: "#374151", background: "#f9fafb" }} />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => { setShowModal(false); showToast("Document uploaded successfully"); }} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: G, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Upload</button>
              </div>
            </div>
          </div>
        )}

        {/* TOP NAV */}
        <nav style={{ height: 62, background: G, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="badge" size={17} color="#fff" sw={1.9} />
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>Compliance Documents</div>
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
              <h1 style={{ fontSize: 23, fontWeight: 800, color: "#1a1f2e", letterSpacing: "-0.5px" }}>Compliance Documents</h1>
              <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Manage and track all your company compliance and certification documents.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: `1.5px solid ${G}`, background: "#fff", color: G, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <Icon name="download" size={14} color={G} sw={2} /> Export All
              </button>
              <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: "none", background: G, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                <Icon name="plus" size={14} color="#fff" sw={2.5} /> Upload Document
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Rejected warning banner */}
          {counts.rejected > 0 && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <Icon name="alert" size={18} color="#dc2626" sw={2} />
              <span style={{ flex: 1, fontSize: 13.5, color: "#991b1b", fontWeight: 500 }}>
                You have <strong>{counts.rejected}</strong> rejected document(s). Please re-upload them to maintain compliance.
              </span>
              <button onClick={() => setFilter("rejected")} style={{ fontSize: 12.5, fontWeight: 600, color: "#dc2626", border: "1px solid #fca5a5", padding: "7px 16px", borderRadius: 8, background: "#fff", cursor: "pointer" }}>
                View Rejected
              </button>
            </div>
          )}

          {/* Document Table */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Toolbar */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f1f4", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: 260 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon name="search" size={14} color="#9ca3af" sw={2} />
                </span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, category or ID…" style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #e5e7eb", borderRadius: 9, fontSize: 13, color: "#374151", background: "#f9fafb" }} />
              </div>
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setFilter(t.id)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: filter === t.id ? G : "#f3f4f6", color: filter === t.id ? "#fff" : "#6b7280", transition: "all 0.15s" }}>
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
                    {["Doc ID", "Document Name", "Category", "Type", "Uploaded", "Expiry", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: "52px 20px", textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="file" size={20} color="#d1d5db" sw={1.6} />
                          </div>
                          <span style={{ fontSize: 14, color: "#9ca3af" }}>No documents found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((doc, i) => {
                      const st  = STATUS_MAP[doc.status];
                      const cat = CAT_COLORS[doc.category] || { color: "#6b7280", bg: "#f3f4f6" };
                      const ft  = FILE_COLORS[doc.type] || { color: "#6b7280", bg: "#f3f4f6", label: doc.type.toUpperCase() };
                      const isRejected = doc.status === "rejected";
                      return (
                        <tr key={doc.id}
                          style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", transition: "background 0.12s", background: isRejected ? "#fffafa" : "transparent" }}
                          onMouseEnter={e => e.currentTarget.style.background = isRejected ? "#fff5f5" : "#fafafa"}
                          onMouseLeave={e => e.currentTarget.style.background = isRejected ? "#fffafa" : "transparent"}
                        >
                          {/* ID */}
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: G }}>{doc.id}</span>
                          </td>
                          {/* Name */}
                          <td style={{ padding: "13px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon name="file" size={14} color={G} sw={1.9} />
                              </div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1f2e" }}>{doc.name}</div>
                                <div style={{ fontSize: 11.5, color: "#9ca3af" }}>{doc.size}</div>
                              </div>
                            </div>
                          </td>
                          {/* Category */}
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 600, color: cat.color, background: cat.bg }}>{doc.category}</span>
                          </td>
                          {/* Type */}
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, color: ft.color, background: ft.bg, letterSpacing: "0.5px" }}>{ft.label}</span>
                          </td>
                          {/* Uploaded */}
                          <td style={{ padding: "13px 16px", fontSize: 12.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{doc.uploaded}</td>
                          {/* Expiry */}
                          <td style={{ padding: "13px 16px", fontSize: 12.5, whiteSpace: "nowrap", color: doc.expiry === "N/A" ? "#9ca3af" : "#374151" }}>{doc.expiry}</td>
                          {/* Status */}
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: st.color, background: st.bg }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.color, display: "inline-block" }} />
                              {st.label}
                            </span>
                          </td>
                          {/* Actions */}
                          <td style={{ padding: "13px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <button title="View" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                <Icon name="eye" size={13} color="#6b7280" sw={1.8} />
                              </button>
                              <button title="Download" style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "#ecfdf5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.querySelector("svg").style.stroke = "#fff"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "#ecfdf5"; e.currentTarget.querySelector("svg").style.stroke = G; }}>
                                <Icon name="download" size={13} color={G} sw={2} />
                              </button>
                              {isRejected && (
                                <button title="Re-upload" onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: "none", background: "#fef2f2", color: "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                  onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}>
                                  <Icon name="upload" size={12} color="currentColor" sw={2} /> Re-upload
                                </button>
                              )}
                              <button title="Delete" onClick={() => handleDelete(doc.id)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}>
                                <Icon name="trash" size={13} color="#ef4444" sw={1.9} />
                              </button>
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
              <span style={{ fontSize: 12.5, color: "#9ca3af" }}>Showing {filtered.length} of {docs.length} documents</span>
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
