import React, { useState, useEffect } from "react";
import Calendar from "../../../components/calendar/Calendar";
import { getClients } from "../../../services/clientService";
import { getReservationById } from "../../../services/reservationService";
import { updateReservation } from "../../../services/reservationService";

const UpdateReservationModal = ({
  reservationId,
  isVisible,
  onClose,
  onReservationUpdated,
}) => {
  const [formData, setFormData] = useState({
    clienteId: null,
    status: "Em andamento",
    dataInicio: "",
    dataFim: "",
    acomodacaoId: null,
    funcionarioId: null,
  });

  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isVisible && reservationId) {
      const fetchReservation = async () => {
        try {
          setIsLoading(true);
          const response = await getReservationById(reservationId);
          const {
            clienteId,
            status,
            dataInicio,
            dataFim,
            acomodacaoId,
            funcionarioId,
          } = response;
          setFormData({
            clienteId,
            status,
            dataInicio,
            dataFim,
            acomodacaoId,
            funcionarioId,
          });
        } catch (error) {
          setError("Erro ao carregar os dados da reserva.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchReservation();
    }
  }, [isVisible, reservationId]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await getClients();
        setClientes(response);
      } catch (error) {
        setError("Erro ao carregar os clientes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const formatDateToISO = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return (
      formattedDate.toISOString().split("T")[0] +
      "T" +
      formattedDate.toTimeString().split(" ")[0]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      clienteId,
      status,
      dataInicio,
      dataFim,
      acomodacaoId,
      funcionarioId,
    } = formData;

    const formattedDataInicio = formatDateToISO(dataInicio);
    const formattedDataFim = formatDateToISO(dataFim);

    if (!clienteId || !status || !formattedDataInicio || !formattedDataFim) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const updatedReservation = await updateReservation(reservationId, {
        clienteId,
        status,
        dataInicio: formattedDataInicio,
        dataFim: formattedDataFim,
        acomodacaoId,
        funcionarioId,
      });

      if (updatedReservation === "Reserva atualizada com sucesso.") {
        if (typeof onReservationUpdated === "function") {
          onReservationUpdated();
        }
        onClose();
      } else {
        setError(updatedReservation || "Erro ao atualizar a reserva.");
      }
    } catch (error) {
      setError("Erro ao atualizar a reserva.");
    }
  };

  const handleDateInicioSelect = (date) => {
    setFormData({
      ...formData,
      dataInicio: date,
    });
  };

  const handleDateFimSelect = (date) => {
    setFormData({
      ...formData,
      dataFim: date,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "clienteId") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      aria-labelledby="updateReservationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateReservationModalLabel">
              Atualizar Reserva
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isLoading && <p>Carregando dados...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Cliente</label>
                <select
                  className="form-select"
                  name="clienteId"
                  value={formData.clienteId || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 w-100">
                <label className="form-label">Data Início</label>
                <Calendar
                  onDateSelect={handleDateInicioSelect}
                  accommodationId={formData.acomodacaoId}
                  selectedDate={formData.dataInicio}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data Fim</label>
                <Calendar
                  onDateSelect={handleDateFimSelect}
                  accommodationId={formData.acomodacaoId}
                  selectedDate={formData.dataFim}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Em andamento">Em andamento</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary fw-bold shadow">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReservationModal;
