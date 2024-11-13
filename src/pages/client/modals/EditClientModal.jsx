import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateClientAction } from "../../../redux/actions/ClientActions";
import IMask from "react-input-mask";

const EditClientModal = ({
  isVisible,
  onClose,
  clientToEdit,
  fetchClients,
}) => {
  const [form, setForm] = useState({
    id: "",
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientToEdit) {
      setForm(clientToEdit);
    }
  }, [clientToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateClientAction(form.id, form))
      .then(() => {
        fetchClients();
        onClose();
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        //onClose();
      });
  };

  return (
    isVisible && (
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        tabIndex="-1"
        aria-labelledby="editClientModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editClientModalLabel">
                Editar Cliente
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
                <div className="mb-3">
                  <label htmlFor="formCpf" className="form-label">
                    CPF
                  </label>
                  <IMask
                    mask="999.999.999-99"
                    className="form-control"
                    id="formCpf"
                    value={form.cpf}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formNome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formNome"
                    value={form.nome}
                    onChange={(e) =>
                      setForm({ ...form, nome: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formTelefone" className="form-label">
                    Telefone
                  </label>
                  <IMask
                    mask="(99) 99999-9999"
                    className="form-control"
                    id="formTelefone"
                    value={form.telefone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        telefone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formEndereco" className="form-label">
                    Endereço
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formEndereco"
                    value={form.endereco}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        endereco: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary fw-bold bg-gradient rounded shadow"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary bg-gradient rounded fw-bold shadow">
                    Salvar alterações
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

export default EditClientModal;
