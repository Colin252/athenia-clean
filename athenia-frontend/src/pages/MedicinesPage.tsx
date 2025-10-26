import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./MedicinesPage.css";
import botonesBg from "../assets/botones.jpg"; // ✅ Fondo médico

interface Medicine {
    id?: number;
    name: string;
    description: string;
    manufacturer: string;
    quantity: number;
    price: number;
}

const MedicinesPage: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [form, setForm] = useState<Medicine>({
        name: "",
        description: "",
        manufacturer: "",
        quantity: 0,
        price: 0,
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchMedicines = async () => {
        try {
            const res = await api.get("/medicines");
            setMedicines(res.data);
        } catch (err) {
            console.error("Error cargando medicinas:", err);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/medicines/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/medicines", form);
            }
            setForm({ name: "", description: "", manufacturer: "", quantity: 0, price: 0 });
            fetchMedicines();
        } catch (err) {
            console.error("Error guardando medicina:", err);
        }
    };

    const handleEdit = (medicine: Medicine) => {
        setForm(medicine);
        setEditingId(medicine.id!);
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/medicines/${id}`);
            fetchMedicines();
        } catch (err) {
            console.error("Error eliminando medicina:", err);
        }
    };

    return (
        <div
            className="medicines-background"
            style={{ backgroundImage: `url(${botonesBg})` }}
        >
            <div className="medicines-card">
                <h1>💊Medicinas</h1>

                <form className="medicine-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="manufacturer"
                        placeholder="Fabricante"
                        value={form.manufacturer}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Cantidad"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="Precio"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Actualizar" : "Agregar"}
                    </button>
                </form>

                <div className="medicine-list">
                    {medicines.length === 0 ? (
                        <p>No hay medicinas registradas.</p>
                    ) : (
                        <ul>
                            {medicines.map((m) => (
                                <li key={m.id}>
                                    <div>
                                        <strong>{m.name}</strong> — {m.description}
                                        <br />
                                        🏭 {m.manufacturer} | 💰 ₡{m.price} | 📦 {m.quantity} unidades
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleEdit(m)}
                                            className="edit-btn"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(m.id!)}
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

export default MedicinesPage;
