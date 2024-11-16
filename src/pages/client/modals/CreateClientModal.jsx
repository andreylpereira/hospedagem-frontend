import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClientAction } from "../../../redux/actions/ClientActions";
import IMask from "react-input-mask";
import { toast } from "sonner";

const CreateClientModal = ({ isVisible, onClose, fetchClients }) => {
  const [form, setForm] = useState({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClientAction(form)).then(() => {
      fetchClients();
      toast.success("Cliente cadastrado com sucesso.");
      onClose();
      setForm({
        cpf: "",
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
      });
    })
    .catch((error) => {
      toast.error(error.response.data);
      setError(error.response.data);
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
            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
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
                      value={form.cpf}
                      onChange={(e) =>
                        setForm({ ...form, cpf: e.target.value })
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
                      value={form.nome}
                      onChange={(e) =>
                        setForm({ ...form, nome: e.target.value })
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
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
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
                    value={form.telefone}
                    onChange={(e) =>
                      setForm({ ...form, telefone: e.target.value })
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
                    value={form.endereco}
                    onChange={(e) =>
                      setForm({ ...form, endereco: e.target.value })
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
