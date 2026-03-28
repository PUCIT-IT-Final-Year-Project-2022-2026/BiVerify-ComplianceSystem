import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const C = {
  primary:   "#2b9d4e",
  dark:      "#1f7a3b",
  light:     "#4fb96e",
  soft:      "#8fd6a3",
  pageBg:    "#F5F6FA",
  card:      "#FFFFFF",
  darkText:  "#1A1D23",
  muted:     "#6B7280",
  warning:   "#F59E0B",
  danger:    "#EF4444",
  border:    "rgba(43,157,78,0.12)",
  borderMed: "rgba(43,157,78,0.2)",
  bgLight:   "rgba(43,157,78,0.05)",
  bgMed:     "rgba(43,157,78,0.09)",
  bgIcon:    "rgba(43,157,78,0.1)",
  warnBg:    "rgba(245,158,11,0.1)",
  dangerBg:  "rgba(239,68,68,0.1)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${C.pageBg}; color: ${C.darkText}; }

  /* ── NAV ── */
  .topnav { background: ${C.primary}; height: 60px; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(31,122,59,0.18); }
  .nav-left  { display: flex; align-items: center; gap: 10px; }
  .nav-logobox { width: 30px; height: 30px; background: ${C.dark}; border-radius: 7px; display: flex; align-items: center; justify-content: center; }
  .nav-title { color: #fff; font-size: 16px; font-weight: 600; letter-spacing: -0.3px; }
  .nav-sub   { color: rgba(255,255,255,0.65); font-size: 10.5px; letter-spacing: 0.6px; text-transform: uppercase; }
  .nav-div   { width: 1px; height: 28px; background: rgba(255,255,255,0.2); margin: 0 14px; }
  .nav-pg    { color: rgba(255,255,255,0.9); font-size: 13.5px; font-weight: 500; }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .nav-site  { background: ${C.dark}; border-radius: 20px; padding: 4px 12px; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
  .pulse     { width: 6px; height: 6px; background: ${C.soft}; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
  .notif-btn { width: 34px; height: 34px; border-radius: 50%; background: ${C.dark}; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; }
  .notif-pip { position: absolute; top: 5px; right: 6px; width: 8px; height: 8px; background: ${C.warning}; border-radius: 50%; border: 2px solid ${C.primary}; }
  .nav-av    { width: 34px; height: 34px; border-radius: 50%; background: ${C.dark}; border: 2px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; }
  .nav-name  { color: #fff; font-size: 13px; font-weight: 500; }

  /* ── PAGE ── */
  .page { padding: 16px 24px; }
  .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: ${C.muted}; cursor: pointer; margin-bottom: 10px; transition: color 0.13s; font-weight: 500; }
  .back-link:hover { color: ${C.primary}; }

  /* ── HERO (top section, green) ── */
  .hero {
    background: ${C.primary};
    border-radius: 14px 14px 0 0;
    overflow: hidden;
  }

  /* top part: avatar + name + connected */
  .hero-top {
    padding: 22px 26px 18px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    position: relative;
  }

  .hero-av {
    width: 82px; height: 82px; border-radius: 20px;
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; font-weight: 700; color: #fff;
    flex-shrink: 0; font-family: 'DM Mono', monospace;
    letter-spacing: -1px;
    box-shadow: 0 0 0 6px rgba(255,255,255,0.08);
  }
  .hero-info { flex: 1; }
  .hero-name-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap; }
  .hero-name  { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.4px; }
  .hero-meta  { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 4px; }
  .hero-meta-item { display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,0.8); font-size: 12.5px; }
  .hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
  .conn-pill  { background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.32); border-radius: 20px; padding: 5px 13px; color: #fff; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
  .conn-dot   { width: 7px; height: 7px; border-radius: 50%; background: ${C.soft}; animation: pulse 2s infinite; }
  .hero-date  { color: rgba(255,255,255,0.65); font-size: 11.5px; }

  /* stats strip inside hero */
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(0,0,0,0.18);
    border-top: 1px solid rgba(0,0,0,0.15);
  }
  .hs-item {
    padding: 13px 20px;
    display: flex; flex-direction: column; gap: 3px;
  }
  .hs-item + .hs-item { border-left: 1px solid rgba(0,0,0,0.15); }
  .hs-val  { color: #fff; font-size: 22px; font-weight: 700; font-family: 'DM Mono', monospace; line-height: 1; letter-spacing: -0.5px; }
  .hs-lbl  { color: rgba(255,255,255,0.6); font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; }

  /* ── BODY ── */
  .body-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 0;
    background: ${C.card};
    border: 1px solid ${C.border};
    border-top: none;
    border-radius: 0 0 14px 14px;
    overflow: hidden;
  }

  /* left content */
  .body-left  { padding: 22px 24px; border-right: 1px solid ${C.border}; }
  /* right sidebar */
  .body-right { padding: 20px; display: flex; flex-direction: column; gap: 20px; }

  /* ── SECTION HEADERS ── */
  .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .sec-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: ${C.darkText}; }
  .sec-action { font-size: 12px; color: ${C.primary}; font-weight: 500; cursor: pointer; }
  .sec-action:hover { text-decoration: underline; }

  /* ── ORG DETAILS GRID ── */
  .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 24px; }
  .field { }
  .f-lbl { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${C.muted}; margin-bottom: 4px; }
  .f-val { font-size: 13px; color: ${C.darkText}; font-weight: 500; }
  .f-mono { font-family: 'DM Mono', monospace; font-size: 11.5px; color: ${C.muted}; word-break: break-all; }
  .status-active { display: inline-flex; align-items: center; gap: 5px; color: ${C.primary}; font-size: 13px; font-weight: 600; }
  .sdot { width: 7px; height: 7px; border-radius: 50%; background: ${C.primary}; }

  .divider { border: none; border-top: 1px solid ${C.border}; margin: 20px 0; }

  /* ── COMPLIANCE BARS ── */
  .comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
  .comp-row  { }
  .comp-top  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .comp-name { font-size: 12.5px; color: ${C.darkText}; }
  .cp        { font-size: 11.5px; font-weight: 600; font-family: 'DM Mono', monospace; }
  .cp-ok     { color: ${C.primary}; }
  .cp-w      { color: #92400e; }
  .cp-d      { color: ${C.danger}; }
  .track     { background: rgba(43,157,78,0.12); border-radius: 4px; height: 6px; overflow: hidden; }
  .fill      { height: 100%; border-radius: 4px; background: ${C.primary}; }
  .fill-w    { background: ${C.warning}; }
  .fill-d    { background: ${C.danger}; }

  /* ── VAULT DOCS ── */
  .doc-row   { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid ${C.border}; }
  .doc-row:last-child { border-bottom: none; }
  .doc-ico   { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .di-ok     { background: ${C.bgIcon}; }
  .di-w      { background: ${C.warnBg}; }
  .di-d      { background: ${C.dangerBg}; }
  .doc-name  { font-size: 13px; font-weight: 500; color: ${C.darkText}; }
  .doc-exp   { font-size: 11px; color: ${C.muted}; margin-top: 2px; }
  .doc-right { margin-left: auto; text-align: right; }
  .doc-days  { font-size: 12px; font-weight: 600; font-family: 'DM Mono', monospace; }
  .doc-days.ok { color: ${C.primary}; }
  .doc-days.w  { color: #92400e; }
  .doc-days.d  { color: ${C.danger}; }

  /* ── ACTIVITY ── */
  .act-row   { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid ${C.border}; }
  .act-row:last-child { border-bottom: none; }
  .adot      { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
  .adot-g    { background: ${C.primary}; }
  .adot-w    { background: ${C.warning}; }
  .adot-d    { background: ${C.danger}; }
  .a-t       { font-size: 12.5px; font-weight: 500; color: ${C.darkText}; }
  .a-s       { font-size: 11px; color: ${C.muted}; margin-top: 2px; }
  .a-ts      { margin-left: auto; font-size: 10.5px; color: ${C.muted}; white-space: nowrap; font-family: 'DM Mono', monospace; }

  /* ── BADGES ── */
  .badge     { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .b-prov    { background: rgba(255,255,255,0.18); color: #fff; border: 1px solid rgba(255,255,255,0.32); }
  .b-ok      { background: ${C.bgIcon}; color: ${C.dark}; border: 1px solid ${C.borderMed}; }
  .b-warn    { background: ${C.warnBg}; color: #92400e; border: 1px solid rgba(245,158,11,0.28); }
  .b-crit    { background: ${C.dangerBg}; color: #991b1b; border: 1px solid rgba(239,68,68,0.22); }

  /* ── ACTION CHIPS (Option B) ── */
  .chip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .chip { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 14px 10px; border-radius: 10px; background: rgba(43,157,78,0.06); border: 1px solid rgba(43,157,78,0.15); cursor: pointer; transition: all 0.13s; }
  .chip:hover { background: rgba(43,157,78,0.12); border-color: rgba(43,157,78,0.25); }
  .chip.danger { background: rgba(239,68,68,0.05); border-color: rgba(239,68,68,0.15); }
  .chip.danger:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.25); }
  .chip-lbl { font-size: 11.5px; font-weight: 500; color: #1f7a3b; text-align: center; line-height: 1.3; }
  .chip.danger .chip-lbl { color: #dc2626; }

  /* ── ACTION ROWS (Option A) ── */
  .action-row { display: flex; align-items: center; gap: 12px; padding: 10px 10px; border-radius: 9px; cursor: pointer; transition: background 0.13s; }
  .action-row:hover { background: rgba(43,157,78,0.06); }
  .action-row:hover .action-arrow { color: #2b9d4e; }
  .action-ico { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .action-ico.green  { background: rgba(43,157,78,0.1); }
  .action-ico.blue   { background: rgba(59,130,246,0.08); }
  .action-ico.gray   { background: rgba(107,114,128,0.08); }
  .action-ico.red    { background: rgba(239,68,68,0.08); }
  .action-label { font-size: 13px; font-weight: 500; color: #1A1D23; flex: 1; }
  .action-label.danger { color: #dc2626; }
  .action-sub   { font-size: 11px; color: #6B7280; margin-top: 1px; }
  .action-arrow { font-size: 16px; color: #9CA3AF; transition: color 0.13s; line-height: 1; }

  /* ── ACTION BUTTONS ── */
  .btn-primary { width: 100%; background: ${C.primary}; color: #fff; border: none; border-radius: 9px; padding: 10px 14px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: background 0.15s; font-family: 'DM Sans', sans-serif; }
  .btn-primary:hover { background: ${C.dark}; }
  .btn-ghost  { width: 100%; background: ${C.card}; color: ${C.darkText}; border: 1px solid ${C.border}; border-radius: 9px; padding: 10px 14px; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .btn-ghost:hover { border-color: ${C.primary}; color: ${C.primary}; background: ${C.bgLight}; }
  .btn-danger-txt { background: none; border: none; color: ${C.danger}; font-size: 13px; font-weight: 500; cursor: pointer; width: 100%; padding: 6px; text-align: center; font-family: 'DM Sans', sans-serif; transition: opacity 0.15s; }
  .btn-danger-txt:hover { opacity: 0.7; }

  /* ── SUMMARY ── */
  .sum-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid ${C.border}; }
  .sum-row:last-child { border-bottom: none; }
  .sum-lbl  { font-size: 12px; color: ${C.muted}; }
  .sum-val  { font-size: 12px; font-weight: 600; color: ${C.darkText}; font-family: 'DM Mono', monospace; }

  /* ── MODAL ── */
  .modal-ov  { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 200; }
  .modal-box { background: ${C.card}; border-radius: 14px; padding: 26px; max-width: 360px; width: 90%; border: 1px solid ${C.border}; }
  .modal-t   { font-size: 16px; font-weight: 700; color: ${C.darkText}; margin-bottom: 8px; }
  .modal-s   { font-size: 13px; color: ${C.muted}; line-height: 1.55; margin-bottom: 20px; }
  .modal-btns { display: flex; gap: 10px; }
  .m-cancel  { flex: 1; background: transparent; border: 1px solid ${C.border}; border-radius: 9px; padding: 10px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; color: ${C.darkText}; }
  .m-confirm { flex: 1; background: ${C.danger}; border: none; border-radius: 9px; padding: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; color: #fff; }

  /* ── TOAST ── */
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: ${C.dark}; color: #fff; padding: 11px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; z-index: 999; white-space: nowrap; animation: tUp 0.22s ease; }
  @keyframes tUp { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  /* ── RESPONSIVE ── */
  @media(max-width: 960px) {
    .body-grid  { grid-template-columns: 1fr; }
    .body-left  { border-right: none; border-bottom: 1px solid rgba(43,157,78,0.12); }
    .hero-stats { grid-template-columns: repeat(4, 1fr); }
  }
  @media(max-width: 600px) {
    .hero-top   { flex-wrap: wrap; }
    .hero-right { margin-left: 0; width: 100%; flex-direction: row; justify-content: space-between; align-items: center; }
    .details-grid { grid-template-columns: 1fr; }
    .comp-grid  { grid-template-columns: 1fr; }
    .hero-stats { grid-template-columns: repeat(4, 1fr); }
    .page       { padding: 14px 16px; }
    .nav-div,.nav-pg,.nav-site { display: none; }
  }

  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .fu  { animation: fadeUp 0.3s ease both; }
  .fu1 { animation-delay: 0.04s; }
  .fu2 { animation-delay: 0.1s; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: ${C.soft}; border-radius: 4px; }
`;

const Ico = ({ n, s = 15, c = "currentColor" }) => {
  const d = {
    qr:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="18" y="14" width="3" height="3" rx="0.5"/><rect x="14" y="18" width="3" height="3" rx="0.5"/><rect x="18" y="18" width="3" height="3" rx="0.5"/></svg>,
    bell:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    back:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    check:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    booking:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    email:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    shield:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    doc:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    globe:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    org:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    activity: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    industry: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
  };
  return d[n] || null;
};

/* ── DATA ── */
const partner = {
  initials: "GS", name: "GoodMe Solutions",
  email: "contact@goodme.complianceqr.com",
  domain: "goodme.complianceqr.com",
  type: "Provider", industry: "Facility Management",
  orgId: "69a68f23-9eb7-4fa5-7c33-e3a0",
  status: "Active", partnerType: "Provider Partner",
  connectedSince: "1 Jan 2024",
  totalJobs: 34, qrScans: 127, compliance: 87, validDocs: "3/5",
};

const compliance = [
  { label: "HVAC",         pct: 100, cls: "ok" },
  { label: "Facility",     pct: 92,  cls: "ok" },
  { label: "Safety Certs", pct: 68,  cls: "w"  },
  { label: "Licensing",    pct: 87,  cls: "ok" },
  { label: "Electrical",   pct: 33,  cls: "d"  },
  { label: "IT Systems",   pct: 75,  cls: "w"  },
];

const vaultDocs = [
  { name: "Liability Insurance",  sub: "Valid · expires in 45 days", cls: "ok", status: "Valid",    days: "45d" },
  { name: "ISO 9001 Certificate", sub: "Expires in 8 days",          cls: "w",  status: "Expiring", days: "8d"  },
  { name: "Business License",     sub: "Valid · expires in 90 days", cls: "ok", status: "Valid",    days: "90d" },
  { name: "Health & Safety Cert", sub: "Expires in 3 days",          cls: "d",  status: "Critical", days: "3d"  },
];

const activity = [
  { t: "QR scan verified",       s: "Site A – Lahore HQ",       ts: "2h ago",   dot: "g" },
  { t: "Document expiring soon", s: "ISO 9001 – 8 days left",   ts: "1d ago",   dot: "w" },
  { t: "Service completed",      s: "HVAC maintenance – Site B", ts: "3d ago",   dot: "g" },
  { t: "GPS mismatch detected",  s: "PowerSystems – 280m off",  ts: "5d ago",   dot: "d" },
  { t: "Partner connected",      s: "GoodMe Solutions joined",  ts: "Jan 2024", dot: "g" },
];

export default function ProviderPartnerProfile() {
    const navigate = useNavigate();
   const { state } = useLocation();
    console.log("STATE:", state);  // add this
  console.log("PARTNER:", state?.partner);
  const partner = state?.partner;

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]         = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
   if (!partner) return <div>No partner data found.</div>;

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="topnav">
        <div className="nav-left">
          <div className="nav-logobox"><Ico n="qr" s={15} c="#fff"/></div>
          <div><div className="nav-title">ComplianceQR</div><div className="nav-sub">Client Portal</div></div>
          <div className="nav-div"/>
          <span className="nav-pg">Partner Profile</span>
        </div>
        <div className="nav-right">
          <div className="nav-site"><span className="pulse"/>Site A – Lahore HQ</div>
          <button className="notif-btn"><Ico n="bell" s={15} c="rgba(255,255,255,0.85)"/><span className="notif-pip"/></button>
          <div className="nav-av">AC</div>
          <span className="nav-name">Acme Corp</span>
        </div>
      </nav>

      <div className="page">
        <div className="back-link fu fu1" onClick={() => navigate("/provider/network")}>
          <Ico n="back" s={14} c="currentColor"/> Back to B2B Network
        </div>

        {/* ── HERO ── */}
        <div className="hero fu fu1">

          {/* top: avatar + name + meta + connected */}
          <div className="hero-top">
            <div className="hero-av">{partner.initials}</div>
            <div className="hero-info">
              <div className="hero-name-row">
                <span className="hero-name">{partner.name}</span>
                <span className="badge b-prov">{partner.type} Partner</span>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item">
                  <Ico n="industry" s={13} c="rgba(255,255,255,0.7)"/>
                  {partner.industry}
                </div>
                <div className="hero-meta-item">
                  <Ico n="email" s={13} c="rgba(255,255,255,0.7)"/>
                  {partner.email}
                </div>
                <div className="hero-meta-item">
                  <Ico n="calendar" s={13} c="rgba(255,255,255,0.7)"/>
                  Partner since {partner.connectedSince}
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="conn-pill"><span className="conn-dot"/>Connected</div>
              <div className="hero-date">{partner.connectedSince}</div>
            </div>
          </div>

          {/* bottom: stats strip */}
          <div className="hero-stats">
            {[
              { val: partner.totalJobs,  lbl: "Total jobs" },
              { val: partner.qrScans,    lbl: "QR scans"   },
              { val: `${partner.compliance}%`, lbl: "Compliance" },
              { val: partner.validDocs,  lbl: "Valid documents" },
            ].map((s, i) => (
              <div className="hs-item" key={i}>
                <div className="hs-val">{s.val}</div>
                <div className="hs-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="body-grid fu fu2">

          {/* LEFT */}
          <div className="body-left">

            {/* Org Details */}
            <div className="sec-hdr">
              <div className="sec-title"><Ico n="org" s={15} c={C.primary}/>Organization Details</div>
            </div>
            <div className="details-grid">
              <div className="field">
                <div className="f-lbl">Organization ID</div>
                <div className="f-val f-mono">{partner.orgId}</div>
              </div>
              <div className="field">
                <div className="f-lbl">Status</div>
                <div className="status-active"><span className="sdot"/>{partner.status}</div>
              </div>
              <div className="field">
                <div className="f-lbl">Industry</div>
                <div className="f-val">{partner.industry}</div>
              </div>
              <div className="field">
                <div className="f-lbl">Partner type</div>
                <div className="f-val">{partner.partnerType}</div>
              </div>
              <div className="field">
                <div className="f-lbl">Contact email</div>
                <div className="f-val" style={{ color: C.primary, fontSize:12.5 }}>{partner.email}</div>
              </div>
              <div className="field">
                <div className="f-lbl">Connected since</div>
                <div className="f-val">{partner.connectedSince}</div>
              </div>
            </div>

            <div className="divider"/>

            {/* Activity */}
            <div className="sec-hdr">
              <div className="sec-title"><Ico n="activity" s={15} c={C.primary}/>Activity Feed</div>
              <span className="sec-action">View all →</span>
            </div>
            {activity.map((a, i) => (
              <div className="act-row" key={i}>
                <span className={`adot adot-${a.dot}`}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="a-t">{a.t}</div>
                  <div className="a-s">{a.s}</div>
                </div>
                <span className="a-ts">{a.ts}</span>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="body-right">

            {/* Compliance Vault */}
            <div>
              <div className="sec-hdr">
                <div className="sec-title"><Ico n="doc" s={15} c={C.primary}/>Compliance Vault</div>
                <span className="sec-action">View all</span>
              </div>
              {vaultDocs.map((d, i) => (
                <div className="doc-row" key={i}>
                  <div className={`doc-ico di-${d.cls === "ok" ? "ok" : d.cls === "w" ? "w" : "d"}`}>
                    <Ico n="doc" s={14} c={d.cls === "ok" ? C.primary : d.cls === "w" ? C.warning : C.danger}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-exp">{d.sub}</div>
                  </div>
                  <div className="doc-right">
                    <span className={`badge ${d.cls === "ok" ? "b-ok" : d.cls === "w" ? "b-warn" : "b-crit"}`}>
                      {d.status}
                    </span>
                    <div className={`doc-days ${d.cls === "ok" ? "ok" : d.cls === "w" ? "w" : "d"}`}
                      style={{ marginTop:3 }}>
                      {d.days}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Network Actions */}
            <div>
              <div className="sec-hdr" style={{ marginBottom:10 }}>
                <div className="sec-title"><Ico n="org" s={15} c={C.primary}/>Network Actions</div>
              </div>
              <div className="chip-grid">
                <div className="chip" onClick={() => showToast("Opening service request…")}>
                  <Ico n="booking" s={20} c="#2b9d4e"/>
                  <span className="chip-lbl">Request Service</span>
                </div>
                <div className="chip" onClick={() => showToast("Opening contact form…")}>
                  <Ico n="email" s={20} c="#2b9d4e"/>
                  <span className="chip-lbl">Contact Partner</span>
                </div>
                <div className="chip danger" style={{gridColumn:"span 2"}} onClick={() => setShowModal(true)}>
                  <Ico n="trash" s={20} c="#dc2626"/>
                  <span className="chip-lbl">End Partnership</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="sec-hdr" style={{ marginBottom:10 }}>
                <div className="sec-title"><Ico n="activity" s={15} c={C.primary}/>Partnership Summary</div>
              </div>
              {[
                { l:"Partner since",  v: partner.connectedSince },
                { l:"Total jobs",     v: partner.totalJobs },
                { l:"Verified scans", v: partner.qrScans },
                { l:"Avg response",   v: "1.2h" },
              ].map((s, i, arr) => (
                <div className="sum-row" key={i}
                  style={{ borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : "none" }}>
                  <span className="sum-lbl">{s.l}</span>
                  <span className="sum-val">{s.v}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-ov" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-t">End partnership?</div>
            <div className="modal-s">
              This will remove <strong>GoodMe Solutions</strong> from your B2B network. Active service bookings won't be affected, but future requests will be unavailable.
            </div>
            <div className="modal-btns">
              <button className="m-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="m-confirm" onClick={() => { setShowModal(false); showToast("Partnership ended. Partner removed."); }}>
                End Partnership
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast"><Ico n="check" s={13} c="#fff"/>{toast}</div>}
    </>
  );
}