import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../redux/actions/ClientActions";
import CreateClientModal from "./modals/CreateClientModal";
import EditClientModal from "./modals/EditClientModal";
import "./Client.css";

const Client = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const dispatch = useDispatch();

  const { clients, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const cpfMask = (value) => {
    if (value) {
      const cpfStr = String(value).replace(/\D/g, "");

      if (cpfStr.length === 11) {
        return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.XXX-XX");
      }
    }

    return "";
  };

  const handleEdit = (client) => {
    setClientToEdit(client);
    setEditModalVisible(true);
  };

  const handleCloseCreateModal = () => setModalVisible(false);
  const handleCloseEditModal = () => setEditModalVisible(false);

  return (
    <div className="container d-flex justify-content-center min-vh-100">
      <div className="w-100">
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "calc(70vh - 50px)" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && !loading && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {clients.length > 0 && (
          <div>
            <button
              type="button"
              className="btn btn-primary fw-bold bg-gradient rounded shadow"
              onClick={() => setModalVisible(true)}
            >
              CADASTRAR
            </button>

            <CreateClientModal
              isVisible={modalVisible}
              onClose={handleCloseCreateModal}
              fetchClients={() => dispatch(fetchClients())}
            />

            <EditClientModal
              isVisible={editModalVisible}
              onClose={handleCloseEditModal}
              clientToEdit={clientToEdit}
              fetchClients={() => dispatch(fetchClients())}
            />
            <table className="table table-striped table-bordered shadow">
              <thead>
                <tr>
                  <th className="text-center table-primary text-light">CPF</th>
                  <th className="text-center table-primary text-light">Nome</th>
                  <th className="text-center table-primary text-light">
                    Email
                  </th>
                  <th className="text-center table-primary text-light">
                    Telefone
                  </th>
                  <th className="text-center table-primary text-light">
                    Endereço
                  </th>
                  <th className="text-center table-primary text-light">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{cpfMask(client.cpf)}</td>
                    <td>{client.nome}</td>
                    <td>{client.email || "Não informado"}</td>
                    <td>{client.telefone || "Não informado"}</td>
                    <td>{client.endereco || "Não informado"}</td>
                    <td>
                      <button
                        className="btn btn-primary fw-bold shadow bg-gradient rounded btn-sm me-2"
                        onClick={() => handleEdit(client)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && clients.length === 0 && !error && (
        <div className="alert alert-warning mt-3" role="alert">
          Não há clientes cadastrados.
        </div>
      )}
    </div>
  );
};

export default Client;
