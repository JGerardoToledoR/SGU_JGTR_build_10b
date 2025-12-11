import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}/users`;

  const getUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { fullname, email, phone };

    try {
      if (editingUser) {
        await fetch(`${API_URL}/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        setEditingUser(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }

      setFullname("");
      setEmail("");
      setPhone("");
      getUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEdit = (user) => {
    setFullname(user.fullname);
    setEmail(user.email);
    setPhone(user.phone);
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      getUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Administración de Usuarios</h1>
        <p>Administra, registra y controla todos los usuarios del sistema.</p>
      </header>

      <div className="content-grid">

        <div className="form-card">
          <h2>{editingUser ? "Editar Usuario" : "Registrar Usuario"}</h2>
          <form onSubmit={handleSubmit} className="modern-form">
            <label>
              <span>Nombre completo</span>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Correo electrónico</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Teléfono</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <button className="btn-save" type="submit">
              {editingUser ? "Actualizar" : "Registrar"}
            </button>
          </form>
        </div>

        <div className="table-card">
          <h2>Lista de Usuarios</h2>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-users">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.fullname}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td className="actions">
                        <button className="btn-edit" onClick={() => handleEdit(u)}>
                          Editar
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(u.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
