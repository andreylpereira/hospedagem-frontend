import React, { useState, useEffect } from "react";
import Calendar from "../../../components/calendar/Calendar";
import { getClients } from "../../../services/clientService";
import { getUserIdFromToken } from "../../../services/api";
import { createReservation } from "../../../services/reservationService";

const CreateReservationModal = ({
  accommodationId,
  isVisible,
  onClose,
  onReservationCreated,
}) => {
  const [formData, setFormData] = useState({
    clienteId: null,
    status: "Em andamento",
    dataInicio: "",
    dataFim: "",
  });

  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const funcionarioId = getUserIdFromToken();

  useEffect(() => {
    if (isVisible) {
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
    }
  }, [isVisible]);

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

    const { clienteId, status, dataInicio, dataFim } = formData;

    const formattedDataInicio = formatDateToISO(dataInicio);
    const formattedDataFim = formatDateToISO(dataFim);

    try {
      const reservation = await createReservation({
        funcionarioId,
        clienteId,
        acomodacaoId: accommodationId,
        dataInicio: formattedDataInicio,
        dataFim: formattedDataFim,
        status,
      });

      onReservationCreated(reservation);

      onClose();
    } catch (error) {
      setError("Erro ao criar a reserva.");
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
      aria-labelledby="createReservationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createReservationModalLabel">
              CADASTRAR
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isLoading && <p>Carregando clientes...</p>}
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
                  accommodationId={accommodationId}
                  selectedDate={formData.dataInicio}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data Fim</label>
                <Calendar
                  onDateSelect={handleDateFimSelect}
                  accommodationId={accommodationId}
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
                  className="btn btn-secondary fw-bold bg-gradient rounded shadow"
                  onClick={onClose}
                >
                  Cancelar
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
  );
};

export default CreateReservationModal;
