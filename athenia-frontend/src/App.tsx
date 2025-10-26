import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧩 Páginas principales
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

// 🏥 Módulos del sistema
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import MedicinesPage from "./pages/MedicinesPage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";

function App(): React.ReactElement {
    return (
        <Router>
            <Routes>
                {/* 🔓 Rutas públicas */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* 🏠 Panel principal (sin autenticación) */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/medicines" element={<MedicinesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
