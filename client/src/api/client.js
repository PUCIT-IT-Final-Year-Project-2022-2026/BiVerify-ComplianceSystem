/**
 * BiVerify API client — client/src/api/client.js
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
  searchOrgs: (params = {}) =>
    api.get("/api/b2b/orgs/search", { params }).then((r) => r.data),
  listPartners: (params = {}) =>
    api.get("/api/b2b/partners", { params }).then((r) => r.data),
  getPartner: (connectionId) =>
    api.get(`/api/b2b/partners/${connectionId}`).then((r) => r.data),
  receivedRequests: () =>
    api.get("/api/b2b/requests/received").then((r) => r.data),
  sentRequests: () =>
    api.get("/api/b2b/requests/sent").then((r) => r.data),
  sendRequest: (targetOrgId, notes = "") =>
    api.post("/api/b2b/requests", { targetOrgId, notes }).then((r) => r.data),
  acceptRequest: (connectionId) =>
    api.patch(`/api/b2b/requests/${connectionId}/accept`).then((r) => r.data),
  declineRequest: (connectionId) =>
    api.patch(`/api/b2b/requests/${connectionId}/decline`).then((r) => r.data),
  cancelRequest: (connectionId) =>
    api.patch(`/api/b2b/requests/${connectionId}/cancel`).then((r) => r.data),
  disconnect: (connectionId) =>
    api.delete(`/api/b2b/partners/${connectionId}`).then((r) => r.data),
};

// ── CLIENT DASHBOARD ─────────────────────────────────────────────────────────

export const clientDashboard = {
  stats: () =>
    api.get("/api/client/dashboard/stats").then((r) => r.data),
  scanChart: (period = "year") =>
    api.get("/api/client/dashboard/scan-chart", { params: { period } }).then((r) => r.data),
  providerRanking: (limit = 7) =>
    api.get("/api/client/dashboard/provider-ranking", { params: { limit } }).then((r) => r.data),
  recentScans: (limit = 12) =>
    api.get("/api/client/dashboard/recent-scans", { params: { limit } }).then((r) => r.data),
};

// ── CLIENT COMPLIANCE VAULT ───────────────────────────────────────────────────

export const complianceVault = {
  stats:       ()            => api.get("/api/compliance-vault/stats").then((r) => r.data),
  list:        (params = {}) => api.get("/api/compliance-vault/documents", { params }).then((r) => r.data),
  get:         (id)          => api.get(`/api/compliance-vault/documents/${id}`).then((r) => r.data),
  downloadUrl: (id)          => api.get(`/api/compliance-vault/documents/${id}/download`).then((r) => r.data),
};

// ── PROVIDER COMPLIANCE DOCUMENTS ────────────────────────────────────────────
// Used by ComplianceDocuments.jsx (ProviderSide)

export const providerCompliance = {
  /**
   * 4 KPI stat counters for the provider's own compliance docs.
   * @returns {Promise<{ total, approved, pending, reviewing, rejected }>}
   */
  stats: () =>
    api.get("/api/provider/compliance/stats").then((r) => r.data),

  /**
   * List the provider's own compliance documents.
   * @param {Object} params  { search?, status?, limit?, skip? }
   * @returns {Promise<{ documents: Array, total: number }>}
   */
  list: (params = {}) =>
    api.get("/api/provider/compliance/documents", { params }).then((r) => r.data),

  /**
   * Get a single document's full details.
   * @param {string} id
   * @returns {Promise<{ document: Object }>}
   */
  get: (id) =>
    api.get(`/api/provider/compliance/documents/${id}`).then((r) => r.data),

  /**
   * Upload / create a new compliance document record.
   * @param {Object} payload  { label, type, fileName, fileUrl, fileSize, expiryDate? }
   * @returns {Promise<{ document: Object }>}
   */
  create: (payload) =>
    api.post("/api/provider/compliance/documents", payload).then((r) => r.data),

  /**
   * Update a document (re-upload or edit metadata).
   * @param {string} id
   * @param {Object} payload  { label?, type?, fileName?, fileUrl?, fileSize?, expiryDate? }
   * @returns {Promise<{ document: Object }>}
   */
  update: (id, payload) =>
    api.patch(`/api/provider/compliance/documents/${id}`, payload).then((r) => r.data),

  /**
   * Delete a compliance document.
   * @param {string} id
   * @returns {Promise<{ deleted: true, id: string }>}
   */
  remove: (id) =>
    api.delete(`/api/provider/compliance/documents/${id}`).then((r) => r.data),

  /**
   * Get download URL for a document file.
   * @param {string} id
   * @returns {Promise<{ url: string, fileName: string }>}
   */
  downloadUrl: (id) =>
    api.get(`/api/provider/compliance/documents/${id}/download`).then((r) => r.data),
};

// ── CLIENT SETTINGS ───────────────────────────────────────────────────────────
// Used by OrganizationSettings.jsx (ClientSide)

export const clientSettings = {
  /**
   * Load org profile + localization settings for the settings form.
   * @returns {Promise<{ profile: Object }>}
   */
  getProfile: () =>
    api.get("/api/client/settings/profile").then((r) => r.data),

  /**
   * Save changes from the settings form.
   * @param {Object} payload  { orgName?, email?, websiteUrl?, address?,
   *                            city?, country?, industry?, regNumber?,
   *                            timezone?, currency? }
   * @returns {Promise<{ message: string, profile: Object }>}
   */
  updateProfile: (payload) =>
    api.patch("/api/client/settings/profile", payload).then((r) => r.data),

  /**
   * Change the logged-in user's password.
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<{ message: string }>}
   */
  changePassword: (currentPassword, newPassword) =>
    api.patch("/api/client/settings/password", { currentPassword, newPassword }).then((r) => r.data),
};

// ── SESSION HELPERS ───────────────────────────────────────────────────────────

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
