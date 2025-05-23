import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchReservations } from "../../redux/actions/reservationActions";
import CreateReservationModal from "./modals/CreateReservationModal";
import UpdateReservationModal from "./modals/UpdateReservationsModal";
import PhotoModal from "../../components/photo-modal/PhotoModal";
import Bread from "../../components/bread/Bread";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css";
import semFoto from "./../../assets/semFoto.png";

const Reservation = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservation
  );

  const location = useLocation();
  const { accommodationId, startDate, accommodation } = location.state || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const handleClosePhotoModal = () => setPhotoModalVisible(false);


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

    const handleOpenPhotoModal = (accommodation) => {
    if (accommodation.contentType && accommodation.base64Image) {
      const imageUrl = `data:${accommodation.contentType};base64,${accommodation.base64Image}`;
      console.log(imageUrl);
      setPhoto(imageUrl);
      setPhotoModalVisible(true);
    }
  };

  return (
    <div className="container user-select-none">
      <Bread current={"RESERVAS"} />

      <div className="d-flex justify-content-center my-4 mt-4 mb-2">
        <div
          className="card shadow d-flex flex-row"
          style={{ maxWidth: "900px", width: "100%" }}
          key={accommodation.id}
        >
          <img
            className={`${
              accommodation.contentType === null
                ? "cursor-none"
                : "cursor-pointer"
            }`}
            style={{
              width: "250px",
              height: "250px",
              objectFit: accommodation.base64Image ? "cover" : "contain",
              borderTopLeftRadius: "0.25rem",
              borderBottomLeftRadius: "0.25rem",
            }}
            alt="Imagem"
            src={
              accommodation.base64Image
                ? `data:${accommodation.contentType};base64,${accommodation.base64Image}`
                : semFoto
            }
            onClick={() => handleOpenPhotoModal(accommodation)}
          />

          <div className="d-flex flex-column flex-grow-1 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0 fw-bold text-uppercase">
                {accommodation.nome}
              </h5>
            </div>

            <div className="mb-2">
              <label>
                <strong>Descrição</strong>
              </label>
              <p className="mb-0">{accommodation.descricao}</p>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <div>
                <label>
                  <strong>Capacidade</strong>
                </label>
                <p className="mb-0">{accommodation.capacidade} pessoas</p>
              </div>
              <div>
                <label>
                  <strong>Preço</strong>
                </label>
                <p className="mb-0">
                  {accommodation.preco?.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }) || "Preço não disponível"}
                </p>
              </div>
            </div>

            {accommodation.amenidades && accommodation.amenidades.length > 0 ? (
              <div className="mb-2">
                <label>
                  <strong>Amenidades</strong>
                </label>
                <div className="flex-wrap d-flex">
                  {accommodation.amenidades.map((amenidade) => (
                    <span
                      key={amenidade.id}
                      className="badge bg-info me-2 mb-1"
                    >
                      {amenidade.nome}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="alert alert-primary p-1" role="alert">
                Acomodação sem amenidades.
              </div>
            )}
          </div>
        </div>
      </div>

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

      {photoModalVisible && (
        <PhotoModal
          image={photo}
          isVisible={photoModalVisible}
          onClose={handleClosePhotoModal}
        />

      )}
      {loading && photo && (
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
      {!loading && reservations.length > 0 && (
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
                    Valor Total
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
                      <td>
                        {reservation.valorTotal?.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        }) || "Valor não disponível"}
                      </td>
                      <td>{statusTexto}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow"
                          onClick={() => handleEditClick(reservation.reservaId)}
                          disabled={
                            reservation.reservaStatus == "CONCLUIDO" ||
                            reservation.reservaStatus == "CANCELADO"
                          }
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
