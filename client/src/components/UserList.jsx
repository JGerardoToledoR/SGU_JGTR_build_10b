import React from "react";

function UserList({ users, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <button onClick={() => onEdit(u)}>Editar</button>
                <button onClick={() => onDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No hay usuarios registrados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserList;
