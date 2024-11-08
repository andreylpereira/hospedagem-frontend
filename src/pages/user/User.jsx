import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/userService";
import "./User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        throw new Error("Formato de resposta inesperado.");
      }
    } catch (error) {
      setError("Erro ao carregar usuários. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  return (
    <div className="container d-flex justify-content-center min-vh-100 ">
      <div className="w-100">
        <button type="button" className="btn btn-primary shadow">
          CADASTRAR
        </button>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "calc(70vh - 50px)" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div class="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped table-bordered shadow">
            <thead>
              <tr>
                <th className="text-center">Nome</th>
                <th className="text-center">Perfil</th>
                <th className="text-center">Email</th>
                <th className="text-center">Habilitado</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.perfil}</td>
                  <td>{user.email || "Não informado"}</td>
                  <td>{user.habilitado ? "Sim" : "Não"}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <i className="fas fa-user-shield"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default User;
