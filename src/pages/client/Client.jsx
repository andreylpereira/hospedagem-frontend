import React, { useState, useEffect } from "react";
import { getClients } from "../../services/clientService";
import "./Client.css";

const phoneMask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const Client = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getClients();
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
    <div className="container d-flex justify-content-center min-vh-100">
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
                <th className="text-center">Email</th>
                <th className="text-center">Telefone</th>
                <th className="text-center">Endereço</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.email || "Não informado"}</td>
                  <td>{phoneMask(user.telefone) || "Não informado"}</td>
                  <td>{user.endereco || "Não informado"}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="fas fa-edit"></i> Editar
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

export default Client;
