import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
});

// 🔐 Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("quantik_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
