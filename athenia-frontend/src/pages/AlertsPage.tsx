import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AlertsPage.css";

interface Alert {
    id: number;
    message: string;
    priority: string; // ALTA, MEDIA, BAJA
}

const AlertsPage: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        // Simulación o conexión real
        const fetchAlerts = async () => {
            try {
                const res = await api.get("/alerts");
                setAlerts(res.data);
            } catch {
                setAlerts([
                    { id: 1, message: "Paciente con fiebre alta en urgencias", priority: "ALTA" },
                    { id: 2, message: "Suministro bajo de insulina", priority: "MEDIA" },
                    { id: 3, message: "Cita pendiente sin confirmar", priority: "BAJA" },
                ]);
            }
        };
        fetchAlerts();
    }, []);

    const getClassByPriority = (priority: string) => {
        switch (priority) {
            case "ALTA":
                return "alert-high";
            case "MEDIA":
                return "alert-medium";
            default:
                return "alert-low";
        }
    };

    return (
        <div className="alerts-container">
            <h1>🚨 Panel de Alertas Médicas</h1>
            <p>Monitoreo de emergencias y advertencias activas</p>

            <div className="alerts-list">
                {alerts.map((a) => (
                    <div key={a.id} className={`alert-box ${getClassByPriority(a.priority)}`}>
                        <h3>{a.priority} PRIORIDAD</h3>
                        <p>{a.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsPage;
