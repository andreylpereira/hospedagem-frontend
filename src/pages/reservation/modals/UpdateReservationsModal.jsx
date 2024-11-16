import React, { useState, useEffect } from "react";
import Calendar from "../../../components/calendar/Calendar";
import { getClients } from "../../../services/ClientService";
import { getReservationById } from "../../../services/ReservationService";
import { updateReservation } from "../../../services/ReservationService";
import { toast } from "sonner";

const UpdateReservationModal = ({
  reservationId,
  isVisible,
  onClose,
  onReservationUpdated,
}) => {
  const [form, setForm] = useState({
    clienteId: null,
    status: "Em andamento",
    dataInicio: "",
    dataFim: "",
    acomodacaoId: null,
    funcionarioId: null,
  });

  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isVisible && reservationId) {
      const fetchReservation = async () => {
        try {
          const response = await getReservationById(reservationId);
          const {
            clienteId,
            status,
            dataInicio,
            dataFim,
            acomodacaoId,
            funcionarioId,
          } = response;
          setForm({
            clienteId,
            status,
            dataInicio,
            dataFim,
            acomodacaoId,
            funcionarioId,
          });
        } catch (error) {
          setError("Erro ao carregar os dados da reserva.");
        } 
      };

      fetchReservation();
    }
  }, [isVisible, reservationId]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients();
        setClientes(response);
      } catch (error) {
        setError("Erro ao carregar os clientes.");
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
    } = form;

    const formattedDataInicio = formatDateToISO(dataInicio);
    const formattedDataFim = formatDateToISO(dataFim);

    if (!clienteId || !status || !formattedDataInicio || !formattedDataFim) {
      toast.error("Todos os campos são obrigatórios.");
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
        toast.success("Reserva atualizada com sucesso.");
        onClose();
      } else {
        toast.error(updatedReservation || "Erro ao atualizar a reserva.");
        setError(updatedReservation || "Erro ao atualizar a reserva.");
      }
    } catch (error) {
      toast.error(error.response.data);
      setError(error.response.data);
    }
  };

  const handleDateInicioSelect = (date) => {
    setForm({
      ...form,
      dataInicio: date,
    });
  };

  const handleDateFimSelect = (date) => {
    setForm({
      ...form,
      dataFim: date,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "clienteId") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? Number(value) : null,
      }));
    } else {
      setForm((prev) => ({
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
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Cliente</label>
                <select
                  className="form-select"
                  name="clienteId"
                  value={form.clienteId || ""}
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
                  accommodationId={form.acomodacaoId}
                  selectedDate={form.dataInicio}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data Fim</label>
                <Calendar
                  onDateSelect={handleDateFimSelect}
                  accommodationId={form.acomodacaoId}
                  selectedDate={form.dataFim}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
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
                <button
                  type="submit"
                  className="btn btn-primary fw-bold shadow"
                >
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
