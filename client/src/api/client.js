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
  /**
   * List bookings for the logged-in client org.
   * @param {Object} params  – { status?, search?, limit?, skip? }
   * @returns {Promise<{ bookings: Array, total: number }>}
   */
  list: (params = {}) =>
    api.get("/api/bookings", { params }).then((r) => r.data),
 
  /**
   * KPI stats for the 4 dashboard cards.
   * @returns {Promise<{ total: number, kpis: Array }>}
   */
  stats: () => api.get("/api/bookings/stats").then((r) => r.data),
 
  /**
   * Full detail for a single booking.
   * @param {string} id – service_request _id
   * @returns {Promise<{ booking: Object }>}
   */
  get: (id) => api.get(`/api/bookings/${id}`).then((r) => r.data),
 
  /**
   * Create a new booking.
   * @param {Object} payload – { providerOrgId, serviceType, siteLocationId,
   *                            assignedStaffId, amount, description?,
   *                            scheduledDate?, taxRate?, priority? }
   * @returns {Promise<{ requestId, poId, poNumber, bookingToken, bookingQrPng }>}
   */
  create: (payload) =>
    api.post("/api/bookings", payload).then((r) => r.data),
 
  /**
   * Cancel a pending booking.
   * @param {string} id – service_request _id
   * @returns {Promise<{ ok: boolean, message: string }>}
   */
  cancel: (id) =>
    api.patch(`/api/bookings/${id}/cancel`).then((r) => r.data),
 
  /**
   * Download the booking QR as a Blob (for <img src={URL.createObjectURL(...)}> ).
   * @param {string} requestId – service_request _id
   * @returns {Promise<Blob>}
   */
  qrPngBlob: (requestId) =>
    api
      .get(`/api/bookings/${requestId}/qr.png`, { responseType: "blob" })
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
