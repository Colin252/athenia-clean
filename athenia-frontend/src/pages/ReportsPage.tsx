import React, { useEffect, useState } from "react";
import api from "../services/api";
import * as XLSX from "xlsx";
import "./ReportsPage.css";
import bgLab from "../assets/botones.jpg"; // fondo hospital

interface Stats {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    totalMedicines: number;
}

const ReportsPage: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/reports/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Error al cargar reportes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const exportToExcel = () => {
        if (!stats) return;
        const data = [
            { Métrica: "Doctores", Valor: stats.totalDoctors },
            { Métrica: "Pacientes", Valor: stats.totalPatients },
            { Métrica: "Citas", Valor: stats.totalAppointments },
            { Métrica: "Medicinas", Valor: stats.totalMedicines },
        ];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Reportes");
        XLSX.writeFile(wb, "HospitalCare_Reporte.xlsx");
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className="reports-background" style={{ backgroundImage: `url(${bgLab})` }}>
            <div className="reports-card">
                <h1>📊 Reportes del Sistema</h1>
                <p className="subtitle">Exportá los datos hospitalarios en Excel</p>
                <button onClick={exportToExcel} className="export-btn">
                    📘 Exportar Excel
                </button>

                {stats ? (
                    <div className="stats-grid">
                        <div className="stat-card blue">
                            <h2>👨‍⚕️ Doctores</h2>
                            <p>{stats.totalDoctors}</p>
                        </div>
                        <div className="stat-card green">
                            <h2>🧑‍🤝‍🧑 Pacientes</h2>
                            <p>{stats.totalPatients}</p>
                        </div>
                        <div className="stat-card purple">
                            <h2>📅 Citas</h2>
                            <p>{stats.totalAppointments}</p>
                        </div>
                        <div className="stat-card pink">
                            <h2>💊 Medicinas</h2>
                            <p>{stats.totalMedicines}</p>
                        </div>
                    </div>
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ReportsPage;
