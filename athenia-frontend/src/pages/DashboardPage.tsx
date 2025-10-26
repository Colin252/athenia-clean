import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./DashboardPage.css";
import dashBg from "../assets/dash.jpg";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        okStock: 0,
        lowStock: 0,
        outStock: 0,
    });

    // 🔄 Cargar estadísticas
    const fetchStats = async () => {
        try {
            const res = await api.get("/dashboard/stats");
            setStats(res.data);
        } catch (err) {
            console.error("Error cargando estadísticas:", err);
        }
    };

    // 🧠 Cargar datos iniciales (sin verificar token)
    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 7000);
        return () => clearInterval(interval);
    }, []);

    // 🚪 Cerrar sesión (solo regresa al login)
    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="dashboard-container" style={{ backgroundImage: `url(${dashBg})` }}>
            <div className="dashboard-overlay"></div>

            <div className="dashboard-content">
                {/* 🔹 Barra monitor animada */}
                <div className="monitor-bar">
                    <div className="pulse-line"></div>
                    <span className="monitor-text">🟢 Sistema Activo - Online</span>
                </div>

                {/* 🔹 Encabezado */}
                <header className="dashboard-header">
                    <h1>🏥 HOSPITALCARE SYSTEM</h1>
                    <p>Advanced Medical System · Powered by Spring + React</p>
                </header>

                {/* 🔹 Menú principal */}
                <nav className="dashboard-menu">
                    {[
                        ["Dashboard", "/dashboard"],
                        ["Pacientes", "/patients"],
                        ["Doctores", "/doctors"],
                        ["Citas", "/appointments"],
                        ["Medicinas", "/medicines"],
                        ["Inventario", "/inventory"],
                        ["Reportes", "/reports"],
                        ["Perfil", "/profile"],
                    ].map(([label, path]) => (
                        <button key={path} onClick={() => navigate(path)}>
                            {label}
                        </button>
                    ))}
                    <button className="logout-btn" onClick={handleLogout}>
                        🔒 Cerrar sesión
                    </button>
                </nav>

                {/* 🔹 Contenido principal */}
                <main className="dashboard-panel">
                    <section>
                        <h2>📊 Panel General</h2>
                        <ul>
                            <li>Total pacientes: {stats.totalPatients}</li>
                            <li>Doctores activos: {stats.totalDoctors}</li>
                            <li>Citas hoy: {stats.totalAppointments}</li>
                        </ul>
                    </section>

                    <section style={{ marginTop: "30px" }}>
                        <h2>📈 Visualización de Datos</h2>
                        <div className="charts-container">
                            {/* PieChart */}
                            <div className="chart-box">
                                <h3>Estado del Inventario</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "OK", value: stats.okStock },
                                                { name: "Bajo stock", value: stats.lowStock },
                                                { name: "Sin stock", value: stats.outStock },
                                            ]}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#facc15" />
                                            <Cell fill="#ef4444" />
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* BarChart */}
                            <div className="chart-box">
                                <h3>Actividad General</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart
                                        data={[
                                            { name: "Pacientes", value: stats.totalPatients },
                                            { name: "Doctores", value: stats.totalDoctors },
                                            { name: "Citas", value: stats.totalAppointments },
                                        ]}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
