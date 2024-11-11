import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccommodationAction } from "../../../redux/actions/accommodationActions";
import { fetchAmenities } from "../../../redux/actions/amenityActions";


const CreateAccommodationModal = ({ isVisible, onClose, fetchAccommodations }) => {
  const [newAccommodation, setNewAccommodation] = useState({
    nome: "",
    descricao: "",
    capacidade: "",
    preco: "",
    habilitado: true,   
    amenidades: []
  });

  const [availableAmenities, setAvailableAmenities] = useState([]);

  const dispatch = useDispatch();

  const { amenities } = useSelector((state) => state.amenity);

 
  useEffect(() => {
    if (isVisible) {
      dispatch(fetchAmenities());
    }
  }, [isVisible, dispatch]);

  useEffect(() => {
    if (amenities) {
      setAvailableAmenities(amenities);
    }
  }, [amenities]);

  const handleAmenityChange = (id) => {
    const selectedAmenity = availableAmenities.find((amenity) => amenity.id === id);
    let updatedAmenities = [...newAccommodation.amenidades];

    if (updatedAmenities.some((amenity) => amenity.id === id)) {
      
      updatedAmenities = updatedAmenities.filter((amenity) => amenity.id !== id);
    } else {
      
      updatedAmenities.push(selectedAmenity);
    }

    setNewAccommodation({
      ...newAccommodation,
      amenidades: updatedAmenities
    });
  };

  const handleHabilitadoChange = () => {
    setNewAccommodation({
      ...newAccommodation,
      habilitado: !newAccommodation.habilitado
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAccommodationAction(newAccommodation)).then(() => {
      fetchAccommodations(); 
      onClose(); 
      setNewAccommodation({
        nome: "",
        descricao: "",
        capacidade: "",
        preco: "",
        habilitado: true, 
        amenidades: [] 
      });
    });
  };

  return (
    isVisible && (
      <div className={`modal fade ${isVisible ? "show" : ""}`} style={{ display: isVisible ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">CADASTRAR</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formNome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formNome"
                    placeholder="Nome"
                    value={newAccommodation.nome}
                    onChange={(e) =>
                      setNewAccommodation({ ...newAccommodation, nome: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formDescricao">Descrição</label>
                  <textarea
                    className="form-control"
                    id="formDescricao"
                    placeholder="Descrição"
                    value={newAccommodation.descricao}
                    onChange={(e) =>
                      setNewAccommodation({ ...newAccommodation, descricao: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formCapacidade">Capacidade</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formCapacidade"
                    placeholder="Capacidade"
                    value={newAccommodation.capacidade}
                    onChange={(e) =>
                      setNewAccommodation({ ...newAccommodation, capacidade: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formPreco">Preço</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formPreco"
                    placeholder="Preço"
                    value={newAccommodation.preco}
                    onChange={(e) =>
                      setNewAccommodation({ ...newAccommodation, preco: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formHabilitado" className="form-label">
                    Habilitado
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formHabilitado"
                      checked={newAccommodation.habilitado}
                      onChange={handleHabilitadoChange}
                    />
                    <label className="form-check-label" htmlFor="formHabilitado">
                      Marque para habilitar a acomodação
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <h6>Amenidades:</h6>
                  <div className="d-flex flex-wrap">
                    {availableAmenities.length > 0 ? (
                      availableAmenities.map((amenity) => (
                        <div key={amenity.id} className="form-check me-3 mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`amenity-${amenity.id}`}
                            checked={newAccommodation.amenidades.some(
                              (selectedAmenity) => selectedAmenity.id === amenity.id
                            )}
                            onChange={() => handleAmenityChange(amenity.id)}
                          />
                          <label className="form-check-label" htmlFor={`amenity-${amenity.id}`}>
                            {amenity.nome}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p>Carregando amenidades...</p>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary fw-bold bg-gradient rounded shadow" onClick={onClose}>
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

export default CreateAccommodationModal;
