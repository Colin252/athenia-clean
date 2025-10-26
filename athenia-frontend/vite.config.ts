import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Cargar variables del archivo .env
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Inyectar la variable VITE_API_URL dentro del bundle final
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  },
});

