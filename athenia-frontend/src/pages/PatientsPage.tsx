import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./PatientsPage.css";
import botonesBg from "../assets/botones.jpg"; // ✅ Fondo médico

interface Patient {
    id?: number;
    name: string;
    email: string;
    phone: string;
    age: number;
}

const PatientsPage: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [form, setForm] = useState<Patient>({
        name: "",
        email: "",
        phone: "",
        age: 0,
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    // 🔄 Obtener pacientes
    const fetchPatients = async () => {
        try {
            const res = await api.get("/patients");
            setPatients(res.data);
        } catch (err) {
            console.error("Error cargando pacientes:", err);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // 📝 Manejar cambios de formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 💾 Guardar o actualizar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/patients/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/patients", form);
            }
            setForm({ name: "", email: "", phone: "", age: 0 });
            fetchPatients();
        } catch (err) {
            console.error("Error guardando paciente:", err);
        }
    };

    // ✏️ Editar
    const handleEdit = (patient: Patient) => {
        setForm(patient);
        setEditingId(patient.id!);
    };

    // 🗑️ Eliminar
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/patients/${id}`);
            fetchPatients();
        } catch (err) {
            console.error("Error eliminando paciente:", err);
        }
    };

    return (
        <div className="patients-page" style={{ backgroundImage: `url(${botonesBg})` }}>
            <div className="patients-container">
                <h1>👨‍⚕️Pacientes</h1>

                <form className="patient-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Edad"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Actualizar" : "Agregar"}
                    </button>
                </form>

                <div className="patient-list">
                    {patients.length === 0 ? (
                        <p>No hay pacientes registrados aún.</p>
                    ) : (
                        <ul>
                            {patients.map((p) => (
                                <li key={p.id}>
                                    <div className="patient-info">
                                        <strong>{p.name}</strong> — {p.email} — {p.phone} — {p.age} años
                                    </div>
                                    <div className="patient-actions">
                                        <button onClick={() => handleEdit(p)} className="edit-btn">
                                            ✏️ Editar
                                        </button>
                                        <button onClick={() => handleDelete(p.id!)} className="delete-btn">
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

export default PatientsPage;
