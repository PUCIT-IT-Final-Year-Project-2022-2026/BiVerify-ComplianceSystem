import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5050";

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
  forgotPassword: (email) =>
    api.post("/api/auth/forgot-password", { email }).then((r) => r.data),
  verifyOtp: (email, otp) =>
    api.post("/api/auth/verify-otp", { email, otp }).then((r) => r.data),
  resetPassword: (resetKey, password) =>
    api.post("/api/auth/reset-password", { resetKey, password }).then((r) => r.data),
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
  qrPngBlob: (requestId) =>
    api.get(`/api/bookings/${requestId}/qr.png`, { responseType: "blob" }).then((r) => r.data),
};

export const locations = {
  list: () => api.get("/api/locations").then((r) => r.data),
  create: (label, address) => api.post("/api/locations", { label, address }).then((r) => r.data),
};

export const compliance = {
  getStats: () => api.get("/api/compliance/stats").then((r) => r.data),
  listVerifications: () => api.get("/api/compliance/verifications").then((r) => r.data),
  listOrders: () => api.get("/api/compliance/orders").then((r) => r.data),
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
