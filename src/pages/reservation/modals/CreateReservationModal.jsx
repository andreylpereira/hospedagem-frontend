import React, { useState, useEffect } from "react";
import Calendar from "../../../components/calendar/Calendar";
import { getClients } from "../../../services/ClientService";
import { getUserIdFromToken } from "../../../services/api";
import { createReservation } from "../../../services/ReservationService";
import { toast } from "sonner";

const CreateReservationModal = ({
  accommodationId,
  isVisible,
  onClose,
  //onReservationCreated,
}) => {
  const [form, setForm] = useState({
    clienteId: null,
    status: "Em andamento",
    dataInicio: "",
    dataFim: "",
  });

  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  const funcionarioId = getUserIdFromToken();

  useEffect(() => {
    if (isVisible) {
      const fetchClients = async () => {
        try {
          const response = await getClients();
          setClientes(response);
        } catch (error) {
          toast.error(error.response.data);
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

    const { clienteId, status, dataInicio, dataFim } = form;

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
      }).then(()=>{
//fazer actions para  o create modal e o update do reservations
        //onReservationCreated(reservation);
        toast.success("Reserva efetuada com sucesso.");
        onClose();
        console.log("nao fechou modal;")
      });
    } catch (error) {
      toast.error(error.response);
      setError(error.response);
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
                  accommodationId={accommodationId}
                  selectedDate={form.dataInicio}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data Fim</label>
                <Calendar
                  onDateSelect={handleDateFimSelect}
                  accommodationId={accommodationId}
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
                  className="btn btn-secondary fw-bold bg-gradient rounded shadow"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary fw-bold bg-gradient rounded shadow"
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

export default CreateReservationModal;
