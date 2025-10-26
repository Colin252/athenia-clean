import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>📊 Panel General</li>
                <li>🧠 Estadísticas</li>
                <li>🩺 Citas del día</li>
                <li>👨‍⚕️ Doctores activos</li>
                <li>💊 Medicinas</li>
                <li>📋 Reportes</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
