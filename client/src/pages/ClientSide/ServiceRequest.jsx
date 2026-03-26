import { useState } from "react";

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
  borderMed: "rgba(43,157,78,0.22)",
  bgLight:   "rgba(43,157,78,0.05)",
  bgMed:     "rgba(43,157,78,0.09)",
  bgIcon:    "rgba(43,157,78,0.1)",
  warnBg:    "rgba(245,158,11,0.1)",
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
  .page { padding: 28px; min-height: calc(100vh - 60px); display: flex; flex-direction: column; align-items: center; }
  .back-link { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: ${C.muted}; cursor: pointer; margin-bottom: 20px; transition: color 0.13s; font-weight: 500; }
  .back-link:hover { color: ${C.primary}; }

  /* ── CARD ── */
  .wizard-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 16px; overflow: hidden; width: 100%; max-width: 660px; }

  /* ── STEPPER HEADER ── */
  .stepper { background: ${C.primary}; padding: 0 28px; display: flex; align-items: stretch; position: relative; }
  .step-item { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 16px 8px 14px; cursor: pointer; position: relative; transition: background 0.15s; }
  .step-item:hover { background: rgba(255,255,255,0.06); }
  .step-connector { position: absolute; top: 22px; left: calc(50% + 18px); right: calc(-50% + 18px); height: 1px; background: rgba(255,255,255,0.25); z-index: 0; }
  .step-num { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 700; z-index: 1; margin-bottom: 6px; transition: all 0.2s; }
  .step-num.active   { background: #fff; color: ${C.primary}; }
  .step-num.done     { background: ${C.dark}; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
  .step-num.inactive { background: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }
  .step-lbl { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
  .step-lbl.active   { color: #fff; }
  .step-lbl.done     { color: rgba(255,255,255,0.85); }
  .step-lbl.inactive { color: rgba(255,255,255,0.5); }

  /* progress bar under stepper */
  .progress-bar-wrap { height: 3px; background: rgba(43,157,78,0.15); }
  .progress-bar-fill { height: 100%; background: ${C.primary}; transition: width 0.4s ease; }

  /* ── BODY ── */
  .wizard-body { padding: 28px; }
  .step-title { font-size: 17px; font-weight: 700; color: ${C.darkText}; margin-bottom: 4px; }
  .step-sub   { font-size: 13px; color: ${C.muted}; margin-bottom: 22px; }

  /* ── FIELDS ── */
  .field      { margin-bottom: 16px; }
  .field:last-of-type { margin-bottom: 0; }
  .f-lbl      { font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${C.muted}; margin-bottom: 6px; display: flex; align-items: center; gap: 5px; }
  .f-lbl .opt { font-size: 10px; font-weight: 400; text-transform: none; letter-spacing: 0; color: #9CA3AF; }
  .f-inp      { width: 100%; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 9px; padding: 10px 14px; font-size: 13px; color: ${C.darkText}; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.15s, background 0.15s; }
  .f-inp:focus { border-color: ${C.primary}; background: #fff; }
  .f-inp::placeholder { color: #9CA3AF; }
  .f-inp.has-val { background: #fff; border-color: ${C.borderMed}; }
  .f-select   { width: 100%; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 9px; padding: 10px 14px; font-size: 13px; color: ${C.darkText}; font-family: 'DM Sans', sans-serif; outline: none; appearance: none; cursor: pointer; transition: border-color 0.15s; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }
  .f-select:focus { border-color: ${C.primary}; }
  .f-hint     { font-size: 11px; color: #9CA3AF; margin-top: 5px; }
  .f-row2     { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ── PARTNER CARD (step 1) ── */
  .partner-display { display: flex; align-items: center; gap: 14px; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 10px; padding: 14px 16px; }
  .partner-av { width: 44px; height: 44px; border-radius: 10px; background: ${C.primary}; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: #fff; font-family: 'DM Mono', monospace; flex-shrink: 0; }
  .partner-name { font-size: 14px; font-weight: 600; color: ${C.darkText}; }
  .partner-type { font-size: 11.5px; color: ${C.muted}; margin-top: 2px; }
  .partner-badge { margin-left: auto; background: ${C.bgIcon}; color: ${C.dark}; border: 1px solid ${C.borderMed}; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 600; }

  /* ── LOCATION TAB TOGGLE ── */
  .loc-toggle { display: flex; background: ${C.bgLight}; border: 1px solid ${C.border}; border-radius: 9px; padding: 3px; margin-bottom: 14px; }
  .loc-tab { flex: 1; padding: 8px 12px; text-align: center; border-radius: 7px; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: all 0.15s; color: ${C.muted}; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .loc-tab.active { background: #fff; color: ${C.primary}; box-shadow: 0 1px 4px rgba(43,157,78,0.12); }

  /* ── MAP PLACEHOLDER ── */
  .map-wrap { border-radius: 10px; overflow: hidden; border: 1.5px solid ${C.border}; position: relative; height: 200px; background: #e8f4f0; margin-bottom: 12px; }
  .map-grid { position: absolute; inset: 0; }
  .map-pin  { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); }
  .map-pin-dot { width: 14px; height: 14px; background: ${C.primary}; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(43,157,78,0.4); }
  .map-pin-tail { width: 2px; height: 10px; background: ${C.primary}; margin: 0 auto; }
  .map-controls { position: absolute; top: 10px; right: 10px; display: flex; flex-direction: column; gap: 4px; }
  .map-btn { width: 28px; height: 28px; background: #fff; border: 1px solid ${C.border}; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; font-weight: 600; color: ${C.darkText}; }
  .map-search { position: absolute; top: 10px; left: 10px; right: 48px; background: #fff; border: 1px solid ${C.border}; border-radius: 8px; padding: 7px 12px; font-size: 12px; display: flex; align-items: center; gap: 6px; color: ${C.muted}; }
  .map-sites { display: flex; gap: 8px; flex-wrap: wrap; }
  .map-site-chip { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1.5px solid ${C.border}; background: ${C.bgLight}; color: ${C.muted}; transition: all 0.13s; }
  .map-site-chip.selected { background: ${C.primary}; color: #fff; border-color: ${C.primary}; }
  .map-site-chip:hover:not(.selected) { border-color: ${C.primary}; color: ${C.primary}; }

  /* ── VERIFIER CARD ── */
  .verifier-option { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border: 1.5px solid ${C.border}; border-radius: 9px; cursor: pointer; margin-bottom: 8px; transition: all 0.13s; background: ${C.bgLight}; }
  .verifier-option:last-child { margin-bottom: 0; }
  .verifier-option.selected { border-color: ${C.primary}; background: #fff; }
  .verifier-option:hover:not(.selected) { border-color: ${C.borderMed}; }
  .v-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid ${C.border}; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .v-radio.checked { border-color: ${C.primary}; background: ${C.primary}; }
  .v-radio.checked::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff; }
  .v-name { font-size: 13px; font-weight: 500; color: ${C.darkText}; }
  .v-role { font-size: 11px; color: ${C.muted}; }
  .v-av   { width: 30px; height: 30px; border-radius: 8px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: ${C.dark}; font-family: 'DM Mono', monospace; flex-shrink: 0; }

  /* ── REVIEW SECTION ── */
  .review-section { background: ${C.bgLight}; border: 1px solid ${C.border}; border-radius: 10px; padding: 14px 16px; margin-bottom: 12px; }
  .review-section:last-child { margin-bottom: 0; }
  .review-sec-title { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${C.muted}; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .review-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 5px 0; border-bottom: 1px solid ${C.border}; }
  .review-row:last-child { border-bottom: none; }
  .review-lbl { font-size: 12px; color: ${C.muted}; }
  .review-val { font-size: 12.5px; font-weight: 500; color: ${C.darkText}; text-align: right; max-width: 60%; }
  .review-edit { font-size: 11px; color: ${C.primary}; cursor: pointer; font-weight: 500; }
  .compliance-notice { background: rgba(43,157,78,0.06); border: 1px solid rgba(43,157,78,0.2); border-radius: 10px; padding: 12px 14px; display: flex; gap: 10px; align-items: flex-start; margin-top: 14px; }
  .cn-icon { width: 28px; height: 28px; border-radius: 7px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cn-title { font-size: 12.5px; font-weight: 600; color: ${C.dark}; }
  .cn-sub   { font-size: 11.5px; color: ${C.muted}; margin-top: 2px; line-height: 1.4; }

  /* ── FOOTER BUTTONS ── */
  .wizard-foot { display: flex; align-items: center; gap: 12px; padding: 18px 28px; border-top: 1px solid ${C.border}; background: ${C.pageBg}; }
  .btn-back  { background: transparent; border: 1px solid ${C.border}; border-radius: 9px; padding: 10px 20px; font-size: 13px; font-weight: 500; cursor: pointer; color: ${C.muted}; font-family: 'DM Sans', sans-serif; transition: all 0.13s; display: flex; align-items: center; gap: 6px; }
  .btn-back:hover { border-color: ${C.primary}; color: ${C.primary}; }
  .progress-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .progress-track { width: 100%; height: 4px; background: rgba(43,157,78,0.12); border-radius: 2px; overflow: hidden; }
  .progress-fill  { height: 100%; background: ${C.primary}; border-radius: 2px; transition: width 0.4s ease; }
  .progress-lbl   { font-size: 10.5px; color: ${C.muted}; }
  .btn-next  { background: ${C.primary}; border: none; border-radius: 9px; padding: 10px 24px; font-size: 13px; font-weight: 600; cursor: pointer; color: #fff; font-family: 'DM Sans', sans-serif; transition: background 0.15s; display: flex; align-items: center; gap: 6px; }
  .btn-next:hover { background: ${C.dark}; }
  .btn-submit { background: ${C.primary}; border: none; border-radius: 9px; padding: 10px 24px; font-size: 13px; font-weight: 600; cursor: pointer; color: #fff; font-family: 'DM Sans', sans-serif; transition: background 0.15s; display: flex; align-items: center; gap: 6px; }
  .btn-submit:hover { background: ${C.dark}; }

  /* ── SUCCESS ── */
  .success-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px 28px; }
  .success-ico  { width: 64px; height: 64px; border-radius: 50%; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .success-title { font-size: 20px; font-weight: 700; color: ${C.darkText}; margin-bottom: 8px; }
  .success-sub   { font-size: 13.5px; color: ${C.muted}; line-height: 1.5; margin-bottom: 24px; max-width: 380px; }
  .success-ref   { background: ${C.bgLight}; border: 1px solid ${C.border}; border-radius: 10px; padding: 12px 20px; margin-bottom: 20px; font-size: 13px; color: ${C.darkText}; }
  .success-ref b { font-family: 'DM Mono', monospace; color: ${C.primary}; }
  .btn-done { background: ${C.primary}; color: #fff; border: none; border-radius: 9px; padding: 11px 28px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  /* toast */
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: ${C.dark}; color: #fff; padding: 11px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; z-index: 999; animation: tUp 0.22s ease; }
  @keyframes tUp { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .fu { animation: fadeUp 0.25s ease both; }

  @media(max-width:600px) {
    .page { padding: 14px 16px; }
    .wizard-body { padding: 20px 16px; }
    .wizard-foot { padding: 14px 16px; }
    .f-row2 { grid-template-columns: 1fr; }
    .nav-div,.nav-pg,.nav-site { display: none; }
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: ${C.soft}; border-radius: 4px; }
`;

const Ico = ({ n, s = 15, c = "currentColor" }) => {
  const d = {
    qr:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="18" y="14" width="3" height="3" rx="0.5"/><rect x="14" y="18" width="3" height="3" rx="0.5"/><rect x="18" y="18" width="3" height="3" rx="0.5"/></svg>,
    bell:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    back:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    next:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    check:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    map:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    pin:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    edit:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    send:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    shield:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    user:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    calendar:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    cash:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    org:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
  };
  return d[n] || null;
};

const STEPS = ["Partner", "Location", "Schedule", "Review"];

const SITES = ["Site A – Lahore HQ", "Site B – DHA Warehouse", "Site C – Gulberg Office", "Site D – Model Town"];

const VERIFIERS = [
  { id: "any",   initials: "★", name: "Any staff member", role: "Allow any client staff to verify" },
  { id: "u1",    initials: "ZS", name: "Zaina Salman",    role: "Team Lead – IT-NC" },
  { id: "u2",    initials: "TK", name: "Tuba Khalil",     role: "Member – IT-NC" },
  { id: "u3",    initials: "FH", name: "Fizzah Hassan",   role: "Member – IT-NC" },
];

// Fake map grid SVG
const MapSVG = ({ selectedSite }) => (
  <svg width="100%" height="200" viewBox="0 0 620 200" style={{ display:"block" }}>
    {/* road grid */}
    <rect width="620" height="200" fill="#e8f5ee"/>
    {[0,60,120,180].map(y => <line key={y} x1="0" y1={y} x2="620" y2={y} stroke="#d1ead8" strokeWidth="0.5"/>)}
    {[0,80,160,240,320,400,480,560,620].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#d1ead8" strokeWidth="0.5"/>)}
    {/* roads */}
    <rect x="0" y="88" width="620" height="14" fill="#f0f9f3" opacity="0.9"/>
    <rect x="155" y="0" width="14" height="200" fill="#f0f9f3" opacity="0.9"/>
    <rect x="380" y="0" width="14" height="200" fill="#f0f9f3" opacity="0.9"/>
    {/* blocks */}
    {[[20,20,120,60],[185,20,180,60],[410,20,180,60],[20,115,120,70],[185,115,180,70],[410,115,180,70]].map(([x,y,w,h],i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#c8e6d0" opacity="0.7"/>
    ))}
    {/* pin */}
    <circle cx="310" cy="95" r="10" fill="#2b9d4e" opacity="0.2"/>
    <circle cx="310" cy="95" r="6" fill="#2b9d4e"/>
    <circle cx="310" cy="95" r="3" fill="#fff"/>
    {/* label */}
    {selectedSite && (
      <g>
        <rect x="220" y="108" width="180" height="22" rx="4" fill="#1f7a3b" opacity="0.9"/>
        <text x="310" y="123" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="DM Sans">{selectedSite.split("–")[0].trim()}</text>
      </g>
    )}
  </svg>
);

export default function ServiceRequest() {
  const [step, setStep]               = useState(0);
  const [locTab, setLocTab]           = useState("map");
  const [selectedSite, setSelectedSite] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [budget, setBudget]           = useState("");
  const [notes, setNotes]             = useState("");
  const [verifier, setVerifier]       = useState("any");
  const [submitted, setSubmitted]     = useState(false);
  const [toast, setToast]             = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const locationDisplay = manualAddress.trim()
    ? manualAddress + (selectedSite ? ` (${selectedSite})` : "")
    : selectedSite || "—";

  const verifierDisplay = VERIFIERS.find(v => v.id === verifier)?.name || "Any staff member";
  const progressPct = ((step + 1) / STEPS.length) * 100;

  const canNext = () => {
    if (step === 0) return true;
    if (step === 1) return !!manualAddress.trim();
    if (step === 2) return !!serviceDate;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) { showToast("Please fill in the required fields."); return; }
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{css}</style>
        <nav className="topnav">
          <div className="nav-left">
            <div className="nav-logobox"><Ico n="qr" s={15} c="#fff"/></div>
            <div><div className="nav-title">ComplianceQR</div><div className="nav-sub">Client Portal</div></div>
            <div className="nav-div"/><span className="nav-pg">Service Request</span>
          </div>
          <div className="nav-right">
            <div className="nav-site"><span className="pulse"/>Site A – Lahore HQ</div>
            <button className="notif-btn"><Ico n="bell" s={15} c="rgba(255,255,255,0.85)"/><span className="notif-pip"/></button>
            <div className="nav-av">AC</div>
            <span className="nav-name">Acme Corp</span>
          </div>
        </nav>
        <div className="page">
          <div className="wizard-card" style={{ maxWidth:520 }}>
            <div className="success-wrap fu">
              <div className="success-ico">
                <Ico n="check" s={28} c={C.primary}/>
              </div>
              <div className="success-title">Request Sent!</div>
              <div className="success-sub">
                Your service request has been sent to <strong>GoodMe Solutions</strong>. They will confirm the booking and you'll receive a notification once accepted.
              </div>
              <div className="success-ref">
                Reference: <b>SR-{Date.now().toString().slice(-6)}</b>
              </div>
              <button className="btn-done" onClick={() => { setSubmitted(false); setStep(0); }}>
                Back to Partner Profile
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <nav className="topnav">
        <div className="nav-left">
          <div className="nav-logobox"><Ico n="qr" s={15} c="#fff"/></div>
          <div><div className="nav-title">ComplianceQR</div><div className="nav-sub">Client Portal</div></div>
          <div className="nav-div"/><span className="nav-pg">New Service Request</span>
        </div>
        <div className="nav-right">
          <div className="nav-site"><span className="pulse"/>Site A – Lahore HQ</div>
          <button className="notif-btn"><Ico n="bell" s={15} c="rgba(255,255,255,0.85)"/><span className="notif-pip"/></button>
          <div className="nav-av">AC</div>
          <span className="nav-name">Acme Corp</span>
        </div>
      </nav>

      <div className="page">
        <div className="back-link" onClick={() => showToast("Back to Partner Profile")}>
          <Ico n="back" s={14} c="currentColor"/> Back to Partner Profile
        </div>

        <div className="wizard-card fu">
          {/* STEPPER */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <div className="step-item" key={i} onClick={() => i < step && setStep(i)}>
                {i < STEPS.length - 1 && <div className="step-connector"/>}
                <div className={`step-num ${i === step ? "active" : i < step ? "done" : "inactive"}`}>
                  {i < step ? <Ico n="check" s={11} c="#fff"/> : i + 1}
                </div>
                <div className={`step-lbl ${i === step ? "active" : i < step ? "done" : "inactive"}`}>{s}</div>
              </div>
            ))}
          </div>

          {/* STEP CONTENT */}
          <div className="wizard-body fu" key={step}>

            {/* ── STEP 0: PARTNER ── */}
            {step === 0 && (
              <>
                <div className="step-title">Confirm Service Partner</div>
                <div className="step-sub">Review the partner you're requesting service from.</div>
                <div className="partner-display">
                  <div className="partner-av">GS</div>
                  <div>
                    <div className="partner-name">GoodMe Solutions</div>
                    <div className="partner-type">Facility Management · Provider Partner</div>
                  </div>
                  <div className="partner-badge">Connected</div>
                </div>
                <div style={{ marginTop:20 }} className="field">
                  <div className="f-lbl">Service Type</div>
                  <select className="f-select" value={serviceType} onChange={e => setServiceType(e.target.value)}>
                    <option value="">Select a service type…</option>
                    <option value="HVAC Maintenance">HVAC Maintenance</option>
                    <option value="Facility Cleaning">Facility Cleaning</option>
                    <option value="Security Audit">Security Audit</option>
                    <option value="Electrical Inspection">Electrical Inspection</option>
                    <option value="Plumbing Service">Plumbing Service</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <div className="f-lbl">Description <span className="opt">(optional)</span></div>
                  <textarea className="f-inp" rows={3} placeholder="Describe what service you need…"
                    value={notes} onChange={e => setNotes(e.target.value)}
                    style={{ resize:"none", lineHeight:1.5 }}/>
                </div>
              </>
            )}

            {/* ── STEP 1: LOCATION ── */}
            {step === 1 && (
              <>
                <div className="step-title">Service Location</div>
                <div className="step-sub">Pick a site from the map or enter an address manually.</div>

                {/* MAP */}
                <div className="f-lbl" style={{ marginBottom:8 }}>
                  <Ico n="map" s={12} c={C.muted}/>
                  Pin on map <span className="opt">(optional)</span>
                </div>
                <div className="map-wrap">
                  <MapSVG selectedSite={selectedSite}/>
                </div>
                <div className="map-sites" style={{ marginBottom:16 }}>
                  {SITES.map(site => (
                    <div key={site}
                      className={`map-site-chip ${selectedSite === site ? "selected" : ""}`}
                      onClick={() => setSelectedSite(site === selectedSite ? "" : site)}>
                      {site}
                    </div>
                  ))}
                </div>

                {/* ADDRESS */}
                <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
                  <div className="field">
                    <div className="f-lbl"><Ico n="pin" s={12} c={C.muted}/>Street Address</div>
                    <input className={`f-inp ${manualAddress ? "has-val" : ""}`}
                      placeholder="e.g. 12-B, Main Boulevard, Gulberg III"
                      value={manualAddress} onChange={e => setManualAddress(e.target.value)}/>
                  </div>
                  <div className="f-row2">
                    <div className="field">
                      <div className="f-lbl">City</div>
                      <input className="f-inp" placeholder="Lahore" defaultValue="Lahore"/>
                    </div>
                    <div className="field">
                      <div className="f-lbl">Area / Sector</div>
                      <input className="f-inp" placeholder="DHA Phase 5"/>
                    </div>
                  </div>
                  <div className="field" style={{ marginBottom:0 }}>
                    <div className="f-lbl">Floor / Unit <span className="opt">(optional)</span></div>
                    <input className="f-inp" placeholder="e.g. 3rd Floor, West Wing"/>
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 2: SCHEDULE ── */}
            {step === 2 && (
              <>
                <div className="step-title">Schedule & Budget</div>
                <div className="step-sub">Set the service date, budget, and assign a verifier.</div>

                <div className="f-row2" style={{ marginBottom:16 }}>
                  <div className="field" style={{ marginBottom:0 }}>
                    <div className="f-lbl"><Ico n="calendar" s={12} c={C.muted}/>Service Date</div>
                    <input type="date" className={`f-inp ${serviceDate ? "has-val" : ""}`}
                      value={serviceDate} onChange={e => setServiceDate(e.target.value)}/>
                  </div>
                  <div className="field" style={{ marginBottom:0 }}>
                    <div className="f-lbl"><Ico n="cash" s={12} c={C.muted}/>Budget (PKR)</div>
                    <input type="number" className={`f-inp ${budget ? "has-val" : ""}`} placeholder="0.00"
                      value={budget} onChange={e => setBudget(e.target.value)}/>
                  </div>
                </div>

                <div className="field">
                  <div className="f-lbl"><Ico n="user" s={12} c={C.muted}/>Assign Verifier <span className="opt">(optional)</span></div>
                  {VERIFIERS.map(v => (
                    <div key={v.id} className={`verifier-option ${verifier === v.id ? "selected" : ""}`}
                      onClick={() => setVerifier(v.id)}>
                      <div className={`v-radio ${verifier === v.id ? "checked" : ""}`}/>
                      <div className="v-av">{v.initials}</div>
                      <div>
                        <div className="v-name">{v.name}</div>
                        <div className="v-role">{v.role}</div>
                      </div>
                    </div>
                  ))}
                  <div className="f-hint">The verifier will scan the QR code on the service date to confirm completion.</div>
                </div>
              </>
            )}

            {/* ── STEP 3: REVIEW ── */}
            {step === 3 && (
              <>
                <div className="step-title">Review & Submit</div>
                <div className="step-sub">Check all details before sending the request.</div>

                <div className="review-section">
                  <div className="review-sec-title"><Ico n="org" s={12} c={C.muted}/>Partner & Service</div>
                  <div className="review-row"><span className="review-lbl">Partner</span><span className="review-val">GoodMe Solutions</span></div>
                  <div className="review-row"><span className="review-lbl">Service type</span><span className="review-val">{serviceType || "—"}</span></div>
                  {notes && <div className="review-row"><span className="review-lbl">Description</span><span className="review-val">{notes}</span></div>}
                  <div className="review-row"><span className="review-lbl"></span><span className="review-edit" onClick={() => setStep(0)}>Edit →</span></div>
                </div>

                <div className="review-section">
                  <div className="review-sec-title"><Ico n="pin" s={12} c={C.muted}/>Location</div>
                  {selectedSite && <div className="review-row"><span className="review-lbl">Site</span><span className="review-val">{selectedSite}</span></div>}
                  <div className="review-row"><span className="review-lbl">Address</span><span className="review-val">{manualAddress || "—"}</span></div>
                  <div className="review-row"><span className="review-lbl"></span><span className="review-edit" onClick={() => setStep(1)}>Edit →</span></div>
                </div>

                <div className="review-section">
                  <div className="review-sec-title"><Ico n="calendar" s={12} c={C.muted}/>Schedule & Budget</div>
                  <div className="review-row"><span className="review-lbl">Service date</span><span className="review-val">{serviceDate || "—"}</span></div>
                  <div className="review-row"><span className="review-lbl">Budget</span><span className="review-val">{budget ? `PKR ${Number(budget).toLocaleString()}` : "—"}</span></div>
                  <div className="review-row"><span className="review-lbl">Verifier</span><span className="review-val">{verifierDisplay}</span></div>
                  <div className="review-row"><span className="review-lbl"></span><span className="review-edit" onClick={() => setStep(2)}>Edit →</span></div>
                </div>

                <div className="compliance-notice">
                  <div className="cn-icon"><Ico n="shield" s={14} c={C.primary}/></div>
                  <div>
                    <div className="cn-title">Compliance auto-check</div>
                    <div className="cn-sub">GoodMe Solutions' compliance documents will be verified automatically before the service date. You'll be notified of any issues.</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="wizard-foot">
            {step > 0 ? (
              <button className="btn-back" onClick={() => setStep(s => s - 1)}>
                <Ico n="back" s={13} c="currentColor"/> Back
              </button>
            ) : (
              <div style={{ width:80 }}/>
            )}

            <div className="progress-wrap">
              <div className="progress-track">
                <div className="progress-fill" style={{ width:`${progressPct}%` }}/>
              </div>
              <div className="progress-lbl">Step {step + 1} of {STEPS.length}</div>
            </div>

            {step < STEPS.length - 1 ? (
              <button className="btn-next" onClick={handleNext}>
                Next <Ico n="next" s={13} c="#fff"/>
              </button>
            ) : (
              <button className="btn-submit" onClick={handleSubmit}>
                <Ico n="send" s={13} c="#fff"/> Send Request
              </button>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast"><Ico n="check" s={13} c="#fff"/>{toast}</div>}
    </>
  );
}