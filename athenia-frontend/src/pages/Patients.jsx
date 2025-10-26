import React, { useState, useEffect } from "react";
import api from "../services/api";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const fetchPatients = async () => {
    try {
      const res = await api.get("/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/patients", form);
      setForm({ name: "", email: "", phone: "", age: "" });
      fetchPatients();
    } catch (error) {
      console.error("Error guardando paciente:", error);
    }
  };

  return (
    <div className="container">
      <h1>👨‍⚕️ Pacientes</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Edad" />
        <button type="submit">Agregar</button>
      </form>

      {patients.length === 0 ? (
        <p>No hay pacientes registrados aún.</p>
      ) : (
        <ul>
          {patients.map((p) => (
            <li key={p.id}>
              {p.name} - {p.email} - {p.phone} - {p.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Patients;
