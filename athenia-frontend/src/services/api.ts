import axios from "axios";

// 🔧 Forzamos la URL de la API directamente
const API_URL = "http://34.72.170.106:8080";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
