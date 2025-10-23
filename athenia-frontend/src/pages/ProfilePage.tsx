import React, { useState } from "react";
import api from "../services/api";
import "./ProfilePage.css";
import bgLab from "../assets/botones.jpg";

const ProfilePage: React.FC = () => {
    const [name, setName] = useState("");
    const [data, setData] = useState({
        patients: [],
        doctors: [],
        appointments: [],
        medicines: [],
        inventory: [],
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!name.trim()) return setMessage("⚠️ Ingrese un nombre para buscar.");

        setLoading(true);
        setMessage("🔍 Buscando información...");
        try {
            const [patients, doctors, appointments, medicines, inventory] =
                await Promise.all([
                    api.get(`/patients?name=${encodeURIComponent(name)}`).then((r) => r.data),
                    api.get(`/doctors?name=${encodeURIComponent(name)}`).then((r) => r.data),
                    api
                        .get(`/appointments?patientName=${encodeURIComponent(name)}`)
                        .then((r) => r.data),
                    api.get(`/medicines?name=${encodeURIComponent(name)}`).then((r) => r.data),
                    api
                        .get(`/inventory?medicineName=${encodeURIComponent(name)}`)
                        .then((r) => r.data),
                ]);

            setData({ patients, doctors, appointments, medicines, inventory });

            if (
                patients.length === 0 &&
                doctors.length === 0 &&
                appointments.length === 0 &&
                medicines.length === 0 &&
                inventory.length === 0
            ) {
                setMessage("⚠️ No se encontró información para ese nombre.");
            } else {
                setMessage("✅ Información cargada correctamente.");
            }
        } catch (err) {
            console.error("Error al buscar datos:", err);
            setMessage("❌ Error al buscar información del usuario.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="profile-background"
            style={{ backgroundImage: `url(${bgLab})` }}
        >
            <div className="profile-card">
                <h1>👤 Perfil Global del Usuario</h1>
                <p className="subtitle">Consulta unificada de toda la información.</p>

                {/* 🔹 Campo de búsqueda */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Ingrese el nombre del usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleSearch} disabled={loading}>
                        {loading ? "Buscando..." : "🔎 Buscar"}
                    </button>
                </div>

                {message && <p className="status-text">{message}</p>}

                {/* 🔹 Resultados */}
                <div className="results-container">
                    {/* Pacientes */}
                    {data.patients.length > 0 && (
                        <div className="section">
                            <h2>🧑‍⚕️ Pacientes</h2>
                            <ul>
                                {data.patients.map((p: any) => (
                                    <li key={p.id}>
                                        <strong>{p.name}</strong> — {p.email} — {p.phone} — {p.age} años
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Doctores */}
                    {data.doctors.length > 0 && (
                        <div className="section">
                            <h2>🩺 Doctores</h2>
                            <ul>
                                {data.doctors.map((d: any) => (
                                    <li key={d.id}>
                                        <strong>{d.name}</strong> — {d.specialty} — {d.phone} —{" "}
                                        {d.yearsExperience} años de experiencia
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Citas */}
                    {data.appointments.length > 0 && (
                        <div className="section">
                            <h2>📅 Citas Médicas</h2>
                            <ul>
                                {data.appointments.map((a: any) => (
                                    <li key={a.id}>
                                        {a.date} — {a.time} <br />
                                        👨‍⚕️ {a.doctorName} con {a.patientName} <br />
                                        Motivo: {a.reason}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Medicinas */}
                    {data.medicines.length > 0 && (
                        <div className="section">
                            <h2>💊 Medicinas</h2>
                            <ul>
                                {data.medicines.map((m: any) => (
                                    <li key={m.id}>
                                        <strong>{m.name}</strong> — {m.description} — {m.manufacturer} —
                                        ₡{m.price} ({m.quantity} unidades)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Inventario */}
                    {data.inventory.length > 0 && (
                        <div className="section">
                            <h2>📦 Inventario</h2>
                            <ul>
                                {data.inventory.map((i: any) => (
                                    <li key={i.id}>
                                        <strong>{i.medicineName}</strong> — Stock: {i.currentStock}/
                                        {i.minRequired} — Estado: {i.status}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
