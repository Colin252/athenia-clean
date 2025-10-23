import api from "./api";

// 🧠 Obtener todas las citas
export const getAllAppointments = async () => {
    try {
        const response = await api.get("/appointments");
        return response.data;
    } catch (error) {
        console.error("Error al obtener citas:", error);
        throw error;
    }
};

// ➕ Crear nueva cita
export const createAppointment = async (appointment: any) => {
    try {
        const response = await api.post("/appointments", appointment);
        return response.data;
    } catch (error) {
        console.error("Error al crear cita:", error);
        throw error;
    }
};

// ✏️ Actualizar cita existente
export const updateAppointment = async (id: number, appointment: any) => {
    try {
        const response = await api.put(`/appointments/${id}`, appointment);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        throw error;
    }
};

// ❌ Eliminar cita por ID
export const deleteAppointment = async (id: number) => {
    try {
        const response = await api.delete(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        throw error;
    }
};
