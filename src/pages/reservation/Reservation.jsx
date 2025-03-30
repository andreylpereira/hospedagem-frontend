import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchReservations } from "../../redux/actions/reservationActions";
import CreateReservationModal from "./modals/CreateReservationModal";
import UpdateReservationModal from "./modals/UpdateReservationsModal";
import Bread from "../../components/bread/Bread";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css";

const Reservation = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservation
  );

  const location = useLocation();
  const { accommodationId, startDate } = location.state || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const initialDate = startDate ? new Date(`${startDate}-01`) : new Date();

    return isNaN(initialDate.getTime()) ? new Date() : initialDate;
  });

  useEffect(() => {
    if (accommodationId && currentMonth) {
      const formattedDate = `${currentMonth.getFullYear()}-${(
        currentMonth.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-01T00:00:00`;
      dispatch(fetchReservations(accommodationId, formattedDate));
    }
  }, [dispatch, accommodationId, currentMonth]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const reservaStatusEnum = {
    EM_ANDAMENTO: "Em andamento",
    CONFIRMADO: "Confirmado",
    CANCELADO: "Cancelado",
    PENDENTE: "Pendente",
    CONCLUIDO: "Concluído",
  };

  const handleEditClick = (reservationId) => {
    setSelectedReservationId(reservationId);
    setEditModalVisible(true);
  };

  const handleReservationUpdated = () => {
    const formattedDate = `${currentMonth.getFullYear()}-${(
      currentMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-01T00:00:00`;
    dispatch(fetchReservations(accommodationId, formattedDate));
  };

  const handleCloseCreateModal = () => setModalVisible(false);
  const handleCloseEditModal = () => setEditModalVisible(false);

  const handleMonthChange = (date) => {
    if (date && !isNaN(date.getTime())) {
      setCurrentMonth(date);
    }
  };

  return (
    <div className="container user-select-none">
      <Bread current={"RESERVAS"} />
      <div className="d-flex justify-content-start mb-2">
        <button
          className="btn btn-primary fw-bold bg-gradient rounded shadow"
          onClick={() => setModalVisible(true)}
        >
          CADASTRAR
        </button>
      </div>
     
        <div className="container-fluid d-flex justify-content-center w-25">
  <DatePicker
    className="form-control bg-light fw-bold text-center text-capitalize mt-2 shadow"
    selected={currentMonth}
    onChange={handleMonthChange}
    dateFormat="MMMM yyyy"
    showMonthYearPicker
    locale={ptBR}
    showFullMonthYearPicker
  />
</div>

     

      <CreateReservationModal
        accommodationId={accommodationId}
        startDate={currentMonth}
        isVisible={modalVisible}
        onClose={handleCloseCreateModal}
      />
      <UpdateReservationModal
        accommodationId={accommodationId}
        startDate={currentMonth}
        reservationId={selectedReservationId}
        isVisible={editModalVisible}
        onClose={handleCloseEditModal}
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
      {error && !loading && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {reservations.length > 0 && (
        <div>
          <div className="table-responsive mt-1">
            <table className="table table-striped table-bordered shadow">
              <thead>
                <tr>
                  <th className="text-center table-primary text-light">
                    Data Início
                  </th>
                  <th className="text-center table-primary text-light">
                    Data Fim
                  </th>
                  <th className="text-center table-primary text-light">
                    Cliente
                  </th>
                  <th className="text-center table-primary text-light">
                    Telefone
                  </th>
                  <th className="text-center table-primary text-light">
                    Email
                  </th>
                  <th className="text-center table-primary text-light">
                    Status
                  </th>
                  <th className="text-center table-primary text-light">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const statusTexto =
                    reservaStatusEnum[reservation.reservaStatus] ||
                    "Status não carregado.";

                  return (
                    <tr key={reservation.reservaId}>
                      <td>{formatDate(reservation.dataInicio)}</td>
                      <td>{formatDate(reservation.dataFim)}</td>
                      <td>{reservation.clienteNome}</td>
                      <td>{reservation.clienteTelefone}</td>
                      <td>{reservation.clienteEmail}</td>
                      <td>{statusTexto}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow"
                          onClick={() => handleEditClick(reservation.reservaId)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && reservations.length === 0 && !error && (
        <div className="alert alert-warning mt-3" role="alert">
          Não há reservas para este período.
        </div>
      )}
    </div>
  );
};

export default Reservation;