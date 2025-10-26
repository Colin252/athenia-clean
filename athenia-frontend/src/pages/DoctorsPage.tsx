import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./DoctorsPage.css";
import botonesBg from "../assets/botones.jpg"; // ✅ Fondo médico completo

interface Doctor {
    id?: number;
    name: string;
    email: string;
    phone: string;
    specialty: string;
    yearsExperience: number;
}

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [form, setForm] = useState<Doctor>({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        yearsExperience: 0,
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    // 🔄 Cargar doctores
    const fetchDoctors = async () => {
        try {
            const res = await api.get("/doctors");
            setDoctors(res.data);
        } catch (err) {
            console.error("Error cargando doctores:", err);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // 📝 Manejar cambios
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 💾 Guardar o actualizar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/doctors/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/doctors", form);
            }
            setForm({
                name: "",
                email: "",
                phone: "",
                specialty: "",
                yearsExperience: 0,
            });
            fetchDoctors();
        } catch (err) {
            console.error("Error guardando doctor:", err);
        }
    };

    // ✏️ Editar
    const handleEdit = (doctor: Doctor) => {
        setForm(doctor);
        setEditingId(doctor.id!);
    };

    // 🗑️ Eliminar
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/doctors/${id}`);
            fetchDoctors();
        } catch (err) {
            console.error("Error eliminando doctor:", err);
        }
    };

    return (
        <div
            className="doctors-background"
            style={{ backgroundImage: `url(${botonesBg})` }}
        >
            <div className="doctors-card">
                <h1>🩺Doctores</h1>

                <form className="doctor-form" onSubmit={handleSubmit}>
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
                        type="text"
                        name="specialty"
                        placeholder="Especialidad"
                        value={form.specialty}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="yearsExperience"
                        placeholder="Años de experiencia"
                        value={form.yearsExperience}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Actualizar" : "Agregar"}
                    </button>
                </form>

                <div className="doctor-list">
                    {doctors.length === 0 ? (
                        <p>No hay doctores registrados aún.</p>
                    ) : (
                        <ul>
                            {doctors.map((d) => (
                                <li key={d.id}>
                                    <div className="doctor-info">
                                        <strong>{d.name}</strong> — {d.specialty} — {d.email} —{" "}
                                        {d.phone} — {d.yearsExperience} años
                                    </div>
                                    <div className="doctor-actions">
                                        <button onClick={() => handleEdit(d)} className="edit-btn">
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(d.id!)}
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

export default DoctorsPage;
