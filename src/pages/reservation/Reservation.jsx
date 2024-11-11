import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchReservationsAction } from "../../redux/actions/reservationActions";
import CreateReservationModal from "./modals/CreateReservationModal";
import UpdateReservationModal from "./modals/UpdateReservationsModal";
import "./Reservation.css";

const Reservation = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservation
  );

  const location = useLocation();
  const { accommodationId, startDate } = location.state;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    if (accommodationId && startDate) {
      dispatch(fetchReservationsAction(accommodationId, startDate));
    }
  }, [dispatch, accommodationId, startDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleEditClick = (reservationId) => {
    setSelectedReservationId(reservationId);
    setIsEditModalVisible(true);
  };

  const handleReservationUpdated = () => {
    dispatch(fetchReservationsAction(accommodationId, startDate));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-start mb-3">
        <button
          className="btn btn-primary fw-bold bg-gradient rounded shadow"
          onClick={() => setIsModalVisible(true)}
        >
          CADASTRAR
        </button>
      </div>

      <CreateReservationModal
        accommodationId={accommodationId}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <UpdateReservationModal
        reservationId={selectedReservationId}
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onReservationUpdated={handleReservationUpdated}
      />

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

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {reservations.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow">
            <thead>
              <tr>
                <th className="text-center table-primary text-light">Data Início</th>
                <th className="text-center table-primary text-light">Data Fim</th>
                <th className="text-center table-primary text-light">Cliente</th>
                <th className="text-center table-primary text-light">Telefone</th>
                <th className="text-center table-primary text-light">Email</th>
                <th className="text-center table-primary text-light">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservaId}>
                  <td>{formatDate(reservation.dataInicio)}</td>
                  <td>{formatDate(reservation.dataFim)}</td>
                  <td>{reservation.clienteNome}</td>
                  <td>{reservation.clienteTelefone}</td>
                  <td>{reservation.clienteEmail}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow"
                      onClick={() => handleEditClick(reservation.reservaId)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Não há reservas para este período.</p>
      )}
    </div>
  );
};

export default Reservation;
