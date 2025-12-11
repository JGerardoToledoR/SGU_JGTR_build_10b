import React, { useEffect, useState } from "react";

function UserForm({ onSave, editingUser, cancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
    else setFormData({ name: "", email: "", phone: "" });
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone)
      return alert("Completa todos los campos");

    onSave(formData);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
      />
      <button type="submit">{editingUser ? "Actualizar" : "Registrar"}</button>
      {editingUser && <button onClick={cancelEdit}>Cancelar</button>}
    </form>
  );
}

export default UserForm;
