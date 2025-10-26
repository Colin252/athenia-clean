import api from "./api";

// 🧠 Obtener todos los pacientes
export const getAllPatients = async () => {
    try {
        const response = await api.get("/patients");
        return response.data;
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
        throw error;
    }
};

// ➕ Crear nuevo paciente
export const createPatient = async (patient: any) => {
    try {
        const response = await api.post("/patients", patient);
        return response.data;
    } catch (error) {
        console.error("Error al crear paciente:", error);
        throw error;
    }
};

// ✏️ Actualizar paciente existente
export const updatePatient = async (id: number, patient: any) => {
    try {
        const response = await api.put(`/patients/${id}`, patient);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        throw error;
    }
};

// ❌ Eliminar paciente por ID
export const deletePatient = async (id: number) => {
    try {
        const response = await api.delete(`/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar paciente:", error);
        throw error;
    }
};
