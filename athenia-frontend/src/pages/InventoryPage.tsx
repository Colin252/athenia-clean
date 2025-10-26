import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./InventoryPage.css";
import bgLab from "../assets/botones.jpg"; // ✅ mismo fondo profesional

interface Inventory {
    id?: number;
    medicineName: string;
    currentStock: number;
    minRequired: number;
    status: string;
}

const InventoryPage: React.FC = () => {
    const [items, setItems] = useState<Inventory[]>([]);
    const [form, setForm] = useState<Inventory>({
        medicineName: "",
        currentStock: 0,
        minRequired: 0,
        status: "OK",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchInventory = async () => {
        try {
            const res = await api.get("/inventory");
            setItems(res.data);
        } catch (err) {
            console.error("Error cargando inventario:", err);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/inventory/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/inventory", form);
            }
            setForm({ medicineName: "", currentStock: 0, minRequired: 0, status: "OK" });
            fetchInventory();
        } catch (err) {
            console.error("Error guardando inventario:", err);
        }
    };

    const handleEdit = (item: Inventory) => {
        setForm(item);
        setEditingId(item.id!);
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/inventory/${id}`);
            fetchInventory();
        } catch (err) {
            console.error("Error eliminando registro:", err);
        }
    };

    return (
        <div className="inventory-background" style={{ backgroundImage: `url(${bgLab})` }}>
            <div className="inventory-card">
                <h1>📦Inventario</h1>

                <form className="inventory-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="medicineName"
                        placeholder="Nombre de Medicina"
                        value={form.medicineName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="currentStock"
                        placeholder="Stock Actual"
                        value={form.currentStock}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="minRequired"
                        placeholder="Stock Mínimo"
                        value={form.minRequired}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editingId ? "Actualizar" : "Agregar"}
                    </button>
                </form>

                <div className="inventory-list">
                    {items.length === 0 ? (
                        <p>No hay registros en inventario.</p>
                    ) : (
                        <ul>
                            {items.map((i) => (
                                <li
                                    key={i.id}
                                    className={
                                        i.status === "BAJO STOCK"
                                            ? "low"
                                            : i.status === "SIN STOCK"
                                                ? "out"
                                                : ""
                                    }
                                >
                                    <div>
                                        <strong>{i.medicineName}</strong> — Stock: {i.currentStock} / Mínimo: {i.minRequired}
                                        <br />
                                        Estado: <b>{i.status}</b>
                                    </div>
                                    <div>
                                        <button className="edit-btn" onClick={() => handleEdit(i)}>
                                            ✏️ Editar
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(i.id!)}>
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

export default InventoryPage;
