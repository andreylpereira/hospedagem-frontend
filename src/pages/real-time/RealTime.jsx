import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "../../redux/actions/accommodationActions";
import { useNavigate } from "react-router-dom";
import { realTimeService } from "../../services/RealTimeService";
import "./RealTime.css";

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

  return (
    <div className="container user-select-none">
      <h2 className="text-uppercase fw-bold mb-4">
        Acomodações em Tempo Real : {formatDate(date)}
      </h2>
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

      {!loading && accommodations.length > 0 && (
        <div className="row g-4">
          {accommodations.map((accommodation) => {
            const isReserved = reservedAccommodations.includes(
              accommodation.id
            );

            return (
              <div
                className={`col-12 col-sm-6 col-md-4 col-lg-3 ${
                  isReserved ? "text-dark" : ""
                }`}
                key={accommodation.id}
              >
                <div className="card shadow">
                  <div
                    className={`card-header ${
                      isReserved ? "bg-danger" : "bg-success"
                    } bg-gradient d-flex justify-content-between`}
                  >
                    <h5 className="mb-0 text-light">{accommodation.nome}</h5>
                    <div className="d-flex align-items-center">
                      {isReserved ? (
                        <span className="badge bg-danger bg-gradient ms-3 badge-button pe-none">
                          <i className="fas fa-lock"></i>
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-gradient ms-3 badge-button shadow">
                          <i
                            className="fas fa-calendar"
                            onClick={() =>
                              handleNavigateToReservations(
                                accommodation.id,
                                accommodation.dataInicio
                              )
                            }
                          ></i>
                        </span>
                      )}
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
                      <div className="alert alert-primary" role="alert">
                        Acomodação sem amenidades.
                      </div>
                    )}
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
