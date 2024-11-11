import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAmenityAction } from "../../../redux/actions/amenityActions";

const EditAmenityModal = ({
  isVisible,
  onClose,
  amenityToEdit,
  fetchAmenities,
}) => {
  const [editedAmenity, setEditAmenity] = useState({
    id: "",
    nome: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (amenityToEdit) {
      setEditAmenity(amenityToEdit);
    }
  }, [amenityToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateAmenityAction(editedAmenity.id, editedAmenity))
      .then(() => {
        fetchAmenities();
        onClose();
      })
      .catch((err) => {
        console.error("Erro ao atualizar cliente:", err);
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
                Editar Amenidade
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
                  <div className="mb-3 col-12 col-md-6 w-100">
                    <label htmlFor="formNome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formNome"
                      placeholder="Nome"
                      value={editedAmenity.nome}
                      onChange={(e) =>
                        setEditAmenity({
                          ...editedAmenity,
                          nome: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary fw-bold bg-gradient rounded shadow"
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
