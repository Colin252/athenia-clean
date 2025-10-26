import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("❌ Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await api.post("/auth/register", { name, email, password, role });
            if (res.status === 200 || res.status === 201) {
                setSuccess("✅ Usuario registrado correctamente 🎉");
                setTimeout(() => navigate("/"), 1800);
            } else {
                setError("⚠️ No se pudo registrar el usuario");
            }
        } catch (err: any) {
            console.error("Error en registro:", err);
            if (err.response?.status === 409) {
                setError("⚠️ Ya existe un usuario con ese correo");
            } else {
                setError("❌ Error al registrar usuario");
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>🏥 HospitalCare System</h1>
                <p>Crea una cuenta para acceder al sistema</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="USER">Usuario</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="ADMIN">Administrador</option>
                    </select>

                    <button type="submit">Registrarse</button>
                </form>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}

                <p className="login-link">
                    ¿Ya tienes cuenta?{" "}
                    <span className="link" onClick={() => navigate("/")}>Inicia sesión</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
