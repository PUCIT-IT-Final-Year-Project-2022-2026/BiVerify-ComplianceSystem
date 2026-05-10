/**
 * BiVerify API client — client/src/api/client.js
 *
 * Add the `b2b` export below to the existing file.
 * Everything above the "── B2B ──" comment is unchanged from the original.
 */

import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5050";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("biverify_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("biverify_token");
      localStorage.removeItem("biverify_user");
    }
    return Promise.reject(err);
  }
);

export const auth = {
  login: (email, password) =>
    api.post("/api/auth/login", { email, password }).then((r) => r.data),
  me: () => api.get("/api/auth/me").then((r) => r.data),
};

export const scan = {
  site: (siteToken, requestId) =>
    api.post("/api/scan/site", { siteToken, requestId }).then((r) => r.data),
  booking: (bookingToken) =>
    api.post("/api/scan/booking", { bookingToken }).then((r) => r.data),
  jobs: () => api.get("/api/scan/jobs").then((r) => r.data),
};

export const team = {
  list: () => api.get("/api/team").then((r) => r.data),
  create: (payload) => api.post("/api/team", payload).then((r) => r.data),
  remove: (id) => api.delete(`/api/team/${id}`).then((r) => r.data),
};

export const bookings = {
  list: (params = {}) =>
    api.get("/api/bookings", { params }).then((r) => r.data),
  stats: () => api.get("/api/bookings/stats").then((r) => r.data),
  get: (id) => api.get(`/api/bookings/${id}`).then((r) => r.data),
  create: (payload) =>
    api.post("/api/bookings", payload).then((r) => r.data),
  cancel: (id) =>
    api.patch(`/api/bookings/${id}/cancel`).then((r) => r.data),
  qrPngBlob: (requestId) =>
    api
      .get(`/api/bookings/${requestId}/qr.png`, { responseType: "blob" })
      .then((r) => r.data),
};

// ── B2B ──────────────────────────────────────────────────────────────────────

export const b2b = {
  /**
   * Search platform orgs to connect with.
   * @param {Object} params  { q?, type?: "client"|"provider", limit?, skip? }
   * @returns {Promise<{ orgs: Array, total: number }>}
   */
  searchOrgs: (params = {}) =>
    api.get("/api/b2b/orgs/search", { params }).then((r) => r.data),

  /**
   * List your connected partners.
   * @param {Object} params  { search?, type?: "client"|"provider", limit?, skip? }
   * @returns {Promise<{ partners: Array, total: number }>}
   */
  listPartners: (params = {}) =>
    api.get("/api/b2b/partners", { params }).then((r) => r.data),

  /**
   * Full profile of one connected partner.
   * @param {string} connectionId
   * @returns {Promise<{ partner: Object }>}
   */
  getPartner: (connectionId) =>
    api.get(`/api/b2b/partners/${connectionId}`).then((r) => r.data),

  /**
   * Pending requests received by your org.
   * @returns {Promise<{ requests: Array, total: number }>}
   */
  receivedRequests: () =>
    api.get("/api/b2b/requests/received").then((r) => r.data),

  /**
   * Pending requests sent by your org.
   * @returns {Promise<{ requests: Array, total: number }>}
   */
  sentRequests: () =>
    api.get("/api/b2b/requests/sent").then((r) => r.data),

  /**
   * Send a connection request.
   * @param {string} targetOrgId
   * @param {string} [notes]
   * @returns {Promise<Object>}  the new connection doc
   */
  sendRequest: (targetOrgId, notes = "") =>
    api.post("/api/b2b/requests", { targetOrgId, notes }).then((r) => r.data),

  /**
   * Accept a received connection request.
   * @param {string} connectionId
   */
  acceptRequest: (connectionId) =>
    api
      .patch(`/api/b2b/requests/${connectionId}/accept`)
      .then((r) => r.data),

  /**
   * Decline a received connection request.
   * @param {string} connectionId
   */
  declineRequest: (connectionId) =>
    api
      .patch(`/api/b2b/requests/${connectionId}/decline`)
      .then((r) => r.data),

  /**
   * Cancel a sent (pending) connection request.
   * @param {string} connectionId
   */
  cancelRequest: (connectionId) =>
    api
      .patch(`/api/b2b/requests/${connectionId}/cancel`)
      .then((r) => r.data),

  /**
   * Disconnect from an existing partner.
   * @param {string} connectionId
   */
  disconnect: (connectionId) =>
    api.delete(`/api/b2b/partners/${connectionId}`).then((r) => r.data),
};

// ── CLIENT DASHBOARD ─────────────────────────────────────────────────────────

export const clientDashboard = {
  /**
   * 4 KPI stat cards.
   * @returns {Promise<{ activeProviders, complianceRate, qrScansToday, expiringDocs }>}
   */
  stats: () =>
    api.get("/api/client/dashboard/stats").then((r) => r.data),

  /**
   * Bar-chart data grouped by period.
   * @param {"year"|"month"|"week"|"day"} period
   * @returns {Promise<{ groups: Array<{label, qrVerified, manual}>, period }>}
   */
  scanChart: (period = "year") =>
    api.get("/api/client/dashboard/scan-chart", { params: { period } }).then((r) => r.data),

  /**
   * Provider ranking by verified/completed job count.
   * @param {number} limit
   * @returns {Promise<{ rankings: Array }>}
   */
  providerRanking: (limit = 7) =>
    api
      .get("/api/client/dashboard/provider-ranking", { params: { limit } })
      .then((r) => r.data),

  /**
   * Recent QR scan rows for the bottom table.
   * @param {number} limit
   * @returns {Promise<{ scans: Array }>}
   */
  recentScans: (limit = 12) =>
    api
      .get("/api/client/dashboard/recent-scans", { params: { limit } })
      .then((r) => r.data),
};



export function saveSession(token, user) {
  localStorage.setItem("biverify_token", token);
  localStorage.setItem("biverify_user", JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem("biverify_user");
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem("biverify_token");
  localStorage.removeItem("biverify_user");
}

export function apiErrorMessage(err) {
  return (
    err?.response?.data?.error?.message ||
    err?.message ||
    "Something went wrong"
  );
}

export default api;