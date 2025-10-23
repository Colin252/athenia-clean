import api from "./api";

// 🧠 Obtener todos los doctores
export const getAllDoctors = async () => {
    try {
        const response = await api.get("/doctors");
        return response.data;
    } catch (error) {
        console.error("Error al obtener doctores:", error);
        throw error;
    }
};

// ➕ Crear nuevo doctor
export const createDoctor = async (doctor: any) => {
    try {
        const response = await api.post("/doctors", doctor);
        return response.data;
    } catch (error) {
        console.error("Error al crear doctor:", error);
        throw error;
    }
};

// ✏️ Actualizar doctor existente
export const updateDoctor = async (id: number, doctor: any) => {
    try {
        const response = await api.put(`/doctors/${id}`, doctor);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar doctor:", error);
        throw error;
    }
};

// ❌ Eliminar doctor por ID
export const deleteDoctor = async (id: number) => {
    try {
        const response = await api.delete(`/doctors/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar doctor:", error);
        throw error;
    }
};
