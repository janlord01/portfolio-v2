import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import axios from "axios";

// Base URL configuration
// Local
// const api = axios.create({
//   baseURL: process.env.API_BASE_URL || "http://127.0.0.1:8003", // Use environment variable or fallback to local
// });

// Live
// const api = axios.create({
//   baseURL: process.env.API_BASE_URL || "https://janlordluga.com/v1", // Use environment variable or fallback to local
// });

// Live
const api = axios.create({
  baseURL: process.env.API_BASE_URL || "https://janlordluga.com/v1", // Use environment variable or fallback to local
});

// Frontend URL
const appUrl = "https://janlordluga.com";
// const appUrl = "https://jluga.com/";

export default boot(({ app }) => {
  // Set up Axios for Vue (Options API)
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // Fetch JWT token from LocalStorage
  const token = LocalStorage.getItem("jwt");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Set common headers
  api.defaults.headers.common["Accept"] = "application/vnd.api+json";
  api.defaults.headers.common["Content-Type"] = "application/vnd.api+json";
  api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  // Optional: Set CSRF token if available
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
  if (csrfToken) {
    api.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content;
  }

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        LocalStorage.remove("jwt");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
});

export { api, appUrl };
