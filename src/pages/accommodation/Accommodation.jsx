import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateAccommodationModal from "./modals/CreateAccommodationModal";
import EditAccommodationModal from "./modals/EditAccommodationModal";
import { fetchAccommodations } from "../../redux/actions/accommodationActions";
import "./Accommodation.css";

const Accommodation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [accommodationToEdit, setAccommodationToEdit] = useState(null);

  const { accommodations, loading, error } = useSelector(
    (state) => state.accommodations
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accommodations.length === 0) {
      dispatch(fetchAccommodations());
    }
  }, [dispatch, accommodations.length]);

  const handleEdit = (accommodation) => {
    setAccommodationToEdit(accommodation);
    setEditModalVisible(true);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19);
  };

  const handleNavigateToReservations = (accommodationId, dateStart, nameAccommodation) => {
    const startDate = dateStart ? dateStart : getCurrentDateTime();
    navigate("/painel/reservas", {
      state: { accommodationId, startDate, nameAccommodation },
    });
  };

  const handleCloseCreateModal = () => setModalVisible(false);
  const handleCloseEditModal = () => setEditModalVisible(false);

  return (
    <div className="container user-select-none">
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
      {accommodations.length > 0 && (
        <>
          <h2 className="text-uppercase text-center fw-bold mb-4">
            Acomodações Cadastradas
          </h2>
          <div className="d-flex mb-4">
            <button
              type="button"
              className="btn btn-primary fw-bold bg-gradient rounded shadow"
              onClick={() => setModalVisible(true)}
            >
              CADASTRAR
            </button>
            <CreateAccommodationModal
              isVisible={modalVisible}
              onClose={handleCloseCreateModal}
              fetchAccommodations={() => dispatch(fetchAccommodations())}
            />

            <EditAccommodationModal
              isVisible={editModalVisible}
              onClose={handleCloseEditModal}
              accommodationToEdit={accommodationToEdit}
              fetchAccommodations={() => dispatch(fetchAccommodations())}
            />
          </div>

          <div className="row g-4">
            {accommodations.map((accommodation) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={accommodation.id}
              >
                <div className="card shadow">
                  <div className="card-header bg-primary bg-gradient d-flex justify-content-between">
                    <h5 className="mb-0 text-light">{accommodation.nome}</h5>
                    <div className="d-flex align-items-center">
                      {accommodation.habilitado === true ? (
                        <span className="badge bg-secondary bg-gradient ms-3 badge-button shadow">
                          <i
                            className="fas fa-calendar"
                            onClick={() =>
                              handleNavigateToReservations(
                                accommodation.id,
                                accommodation.dataInicio,
                                accommodation.nome
                              )
                            }
                          ></i>
                        </span>
                      ) : (
                        <span></span>
                      )}
                      <span
                        className="badge bg-secondary bg-gradient ms-3 badge-button shadow"
                        onClick={() => handleEdit(accommodation)}
                      >
                        <i className="fas fa-edit"></i>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label>
                        <strong>Descrição</strong>
                      </label>
                      <p>{accommodation.descricao}</p>
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                      <div className="capacidade-preco">
                        <label>
                          <strong>Capacidade</strong>
                        </label>
                        <p>{accommodation.capacidade} pessoas</p>
                      </div>
                      <div className="capacidade-preco">
                        <label>
                          <strong>Preço</strong>
                        </label>
                        <p>
                          {accommodation.preco?.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }) || "Preço não disponível"}
                        </p>
                      </div>
                    </div>
                    {accommodation.amenidades &&
                    accommodation.amenidades.length > 0 ? (
                      <div>
                        <label>
                          <strong>Amenidades</strong>
                        </label>
                        <div>
                          {accommodation.amenidades.map((amenidade) => (
                            <span
                              key={amenidade.id}
                              className="badge bg-info me-2"
                            >
                              {amenidade.nome}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div class="alert alert-primary" role="alert">
                        Acomodação sem amenidades.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {!loading && accommodations.length === 0 && !error && (
        <div className="alert alert-warning mt-3" role="alert">
          Não há acomodações cadastradas.
        </div>
      )}
    </div>
  );
};

export default Accommodation;
