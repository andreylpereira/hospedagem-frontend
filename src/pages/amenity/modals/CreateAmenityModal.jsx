import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAmenityAction } from "../../../redux/actions/amenityActions";
import { toast } from "sonner";

const CreateAmenityModal = ({ isVisible, onClose, fetchAmenities }) => {
  const [form, setForm] = useState({
    nome: "",
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createAmenityAction(form))
      .then(() => {
        fetchAmenities();
        toast.success("Amenidade cadastrada com sucesso.");
        onClose();
        setForm({
          nome: "",
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
        aria-labelledby="createAmenityModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createAmenityModalLabel">
                CADASTRAR
              </h5>
              <button
                type="button"
                className="btn-close"
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
                  <div className="mb-3 col-12 col-md-6 w-100">
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-danger fw-bold bg-gradient rounded shadow"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold bg-gradient rounded shadow"
                  >
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

export default CreateAmenityModal;
