import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                🏥 <span>HOSPITALCARE SYSTEM</span>
            </div>
            <nav className="navbar-links">
                <a href="#">Dashboard</a>
                <a href="#">Pacientes</a>
                <a href="#">Doctores</a>
                <a href="#">Citas</a>
                <a href="#">Medicinas</a>
                <a href="#">Reportes</a>
                <a href="#">Perfil</a>
            </nav>
            <button className="logout-btn">🔒 Cerrar sesión</button>
        </header>
    );
};

export default Navbar;
