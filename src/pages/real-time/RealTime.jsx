import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "../../redux/actions/accommodationActions";
import { useNavigate } from "react-router-dom";
import { realTimeService } from "../../services/RealTimeService";
import PhotoModal from "../../components/photo-modal/PhotoModal";
import "./RealTime.css";
import semFoto from "./../../assets/semFoto.png";
import Bread from "../../components/bread/Bread";

const RealTime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accommodations, loading, error } = useSelector(
    (state) => state.accommodations
  );

  const [reservedAccommodations, setReservedAccommodations] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 19));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    dispatch(fetchAccommodations());

    const intervalId = setInterval(() => {
      dispatch(fetchAccommodations());
    }, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const fetchReservedAccommodations = async () => {
      const reserved = await realTimeService(date);

      const reservedIds = reserved.map(
        (reservation) => reservation.acomodacaoId
      );
      setReservedAccommodations(reservedIds);
    };

    fetchReservedAccommodations();
  }, [date]);

  const handleNavigateToReservations = (accommodationId, dataInicio) => {
    const startDate = dataInicio
      ? dataInicio
      : new Date().toISOString().slice(0, 19);
    navigate("/painel/reservas", {
      state: { accommodationId, startDate },
    });
  };

  const [photo, setPhoto] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const handleClosePhotoModal = () => setPhotoModalVisible(false);
  const handleOpenPhotoModal = (accommodation) => {
    if (accommodation.contentType && accommodation.base64Image) {
      const imageUrl = `data:${accommodation.contentType};base64,${accommodation.base64Image}`;
      setPhoto(imageUrl);
      setPhotoModalVisible(true);
    }
  };

  return (
    <div className="container user-select-none">
      <Bread current={"TEMPO REAL"} />
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

      {!loading && accommodations.length === 0 && !error && (
        <div className="alert alert-danger mt-3" role="alert">
          Não há acomodações disponíveis.
        </div>
      )}

      <PhotoModal
        isVisible={photoModalVisible}
        onClose={handleClosePhotoModal}
        photo={photo}
      />
      {!loading && accommodations.length > 0 && (
        <div className="row g-4 justify-content-center mb-4 mt-2">
          {accommodations.map((accommodation) => {
            const isReserved = reservedAccommodations.includes(
              accommodation.id
            );

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                key={accommodation.id}
              >
                <div
                  className="card shadow d-flex flex-column"
                  style={{ width: "296px" }}
                >
                  <img
                    className={`card-img-top ${
                      accommodation.contentType === null
                        ? "cursor-none"
                        : "cursor-pointer"
                    }`}
                    style={{
                      width: "100%",
                      height: "230px",
                      objectFit: accommodation.base64Image
                        ? "cover"
                        : "contain",
                    }}
                    alt="Imagem"
                    src={
                      accommodation.base64Image
                        ? `data:${accommodation.contentType};base64,${accommodation.base64Image}`
                        : semFoto
                    }
                    onClick={() => handleOpenPhotoModal(accommodation)}
                  />
                  <div className="card-header bg-white d-flex justify-content-between border-0">
                    <h5 className="mb-0 fw-bold text-uppercase">
                      {accommodation.nome}
                    </h5>
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge ${
                          isReserved ? "bg-danger" : "bg-success"
                        } ms-3 cursor-none`}
                      >
                        {isReserved ? "Ocupado" : "Disponível"}
                      </span>
                    </div>
                  </div>

                  <div className="card-body pt-0 flex-grow-1">
                    <div className="mb-1">
                      <label>
                        <strong>Descrição</strong>
                      </label>
                      <p>{accommodation.descricao}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="capacidade-preco">
                        <label>
                          <strong>Capacidade</strong>
                        </label>
                        <p className="mb-1">
                          {accommodation.capacidade} pessoas
                        </p>
                      </div>
                      <div className="capacidade-preco">
                        <label>
                          <strong>Preço</strong>
                        </label>
                        <p className="mb-1">
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
                      <div className="alert alert-primary" role="alert">
                        Acomodação sem amenidades.
                      </div>
                    )}
                  </div>

                  <div className="card-footer bg-white d-flex justify-content-between border-0">
                    <button
                      className="btn btn-primary w-100 shadow"
                      onClick={() =>
                        isReserved
                          ? null
                          : handleNavigateToReservations(
                              accommodation.id,
                              accommodation.dataInicio
                            )
                      }
                      disabled={isReserved}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RealTime;
