import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AppointmentsPage.css";
import botonesBg from "../assets/botones.jpg"; // ✅ Fondo profesional médico

interface Appointment {
    id?: number;
    doctorName: string;
    patientName: string;
    date: string;
    time: string;
    reason: string;
}

const AppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [form, setForm] = useState<Appointment>({
        doctorName: "",
        patientName: "",
        date: "",
        time: "",
        reason: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) {
            console.error("Error cargando citas:", err);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/appointments/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/appointments", form);
            }
            setForm({ doctorName: "", patientName: "", date: "", time: "", reason: "" });
            fetchAppointments();
        } catch (err) {
            console.error("Error guardando cita:", err);
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setForm(appointment);
        setEditingId(appointment.id!);
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/appointments/${id}`);
            fetchAppointments();
        } catch (err) {
            console.error("Error eliminando cita:", err);
        }
    };

    return (
        <div
            className="appointments-background"
            style={{ backgroundImage: `url(${botonesBg})` }}
        >
            <div className="appointments-card">
                <h1>📅Citas</h1>

                <form className="appointment-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="doctorName"
                        placeholder="Doctor"
                        value={form.doctorName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="patientName"
                        placeholder="Paciente"
                        value={form.patientName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="reason"
                        placeholder="Motivo"
                        value={form.reason}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Actualizar" : "Agregar"}
                    </button>
                </form>

                <div className="appointment-list">
                    {appointments.length === 0 ? (
                        <p>No hay citas registradas.</p>
                    ) : (
                        <ul>
                            {appointments.map((a) => (
                                <li key={a.id}>
                                    <div className="appointment-info">
                                        <strong>{a.date}</strong> — {a.time} <br />
                                        👨‍⚕️ {a.doctorName} con {a.patientName} <br />
                                        🩺 Motivo: {a.reason}
                                    </div>
                                    <div className="appointment-actions">
                                        <button
                                            onClick={() => handleEdit(a)}
                                            className="edit-btn"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a.id!)}
                                            className="delete-btn"
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
