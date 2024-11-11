import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClientAction } from "../../../redux/actions/clientActions";
import IMask from "react-input-mask";

const CreateClientModal = ({ isVisible, onClose, fetchClients }) => {
  const [newClient, setNewClient] = useState({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClientAction(newClient)).then(() => {
      fetchClients();
      onClose();
      setNewClient({
        cpf: "",
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
      });
    });
  };

  return (
    isVisible && (
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        tabIndex="-1"
        aria-labelledby="createClientModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createClientModalLabel">
                Cadastrar Cliente
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Fechar"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-12 col-md-6">
                    <label htmlFor="formCpf" className="form-label">
                      CPF
                    </label>
                    <IMask
                      mask="999.999.999-99"
                      className="form-control"
                      id="formCpf"
                      placeholder="CPF"
                      value={newClient.cpf}
                      onChange={(e) =>
                        setNewClient({ ...newClient, cpf: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label htmlFor="formNome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formNome"
                      placeholder="Nome"
                      value={newClient.nome}
                      onChange={(e) =>
                        setNewClient({ ...newClient, nome: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="formEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="formTelefone" className="form-label">
                    Telefone
                  </label>
                  <IMask
                    mask="(99) 99999-9999"
                    type="text"
                    className="form-control"
                    id="formTelefone"
                    placeholder="Telefone"
                    value={newClient.telefone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, telefone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="formEndereco" className="form-label">
                    Endereço
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formEndereco"
                    placeholder="Endereço"
                    value={newClient.endereco}
                    onChange={(e) =>
                      setNewClient({ ...newClient, endereco: e.target.value })
                    }
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary fw-bold shadow"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary fw-bold bg-gradient rounded shadow">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateClientModal;
