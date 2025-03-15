import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAmenityAction } from "../../../redux/actions/amenityActions";
import { toast } from "sonner";

const EditAmenityModal = ({
  isVisible,
  onClose,
  amenityToEdit,
  fetchAmenities,
}) => {
  const [form, setForm] = useState({
    id: "",
    nome: "",
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (amenityToEdit) {
      setForm(amenityToEdit);
    }
  }, [amenityToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateAmenityAction(form.id, form))
      .then(() => {
        fetchAmenities();
        toast.success("Amenidade atualizada com sucesso.");
        onClose();
      })
      .catch((error) => {
        toast.error(error.message);
        setError(error.response.data);
      });
  };

  return (
    isVisible && (
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        tabIndex="-1"
        aria-labelledby="editAmenityModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editAmenityModalLabel">
              EDITAR
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
                        setForm({
                          ...form,
                          nome: e.target.value,
                        })
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

export default EditAmenityModal;
