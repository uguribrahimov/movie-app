import axios from "axios";

// .env faylındakı dəyişənləri import etmək
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, // Bütün sorğulara avtomatik olaraq API açarını əlavə edir
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // İstək göndərilməzdən əvvəl ediləcək dəyişikliklər
    console.log("Request sent:", config);
    // Məsələn, token əlavə etmək istəsəniz
    // config.headers.Authorization = `Bearer ${your_token}`;
    return config;
  },
  (error) => {
    // İstək göndərilərkən səhv baş verərsə
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Cavab gəldikdən sonra ediləcək dəyişikliklər
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    // Cavabda səhv baş verərsə
    console.error("Response error:", error);
    // Səhvləri işləyib yenidən atmaq olar
    return Promise.reject(error);
  }
);

export default axiosInstance;
