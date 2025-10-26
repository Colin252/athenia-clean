import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import loginBg from "../assets/login.jpg"; // Imagen de fondo

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Sin autenticación, va directo al dashboard
        navigate("/dashboard");
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${loginBg})`,
            }}
        >
            <div className="login-card">
                <h1>🏥 HospitalCare System</h1>
                <p>Bienvenido. Haga clic en el botón para ingresar.</p>

                <button onClick={handleLogin} className="login-button">
                    Ingresar
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
