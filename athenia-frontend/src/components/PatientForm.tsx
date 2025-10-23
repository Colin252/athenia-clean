import React, { useState } from "react";

interface PatientFormProps {
    onSubmit: (patient: any) => void;
    editingPatient?: any;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, editingPatient }) => {
    const [formData, setFormData] = useState(
        editingPatient || { name: "", email: "", phone: "", age: "" }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", email: "", phone: "", age: "" });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Edad" value={formData.age} onChange={handleChange} required />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default PatientForm;
