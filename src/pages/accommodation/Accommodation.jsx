import React, { useState, useEffect } from 'react';
import { getAccommodations } from "../../services/accommodationService"; 
import "./Accommodation.css";

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAccommodations();
      if (Array.isArray(response)) {
        setAccommodations(response);
      } else {
        throw new Error("Formato de resposta inesperado.");
      }
    } catch (error) {
      setError("Erro ao carregar acomodações. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2></h2>
      {loading ? (
        <p>Carregando acomodações...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row g-4">
          {accommodations.map((accommodation) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={accommodation.id}>
              <div className="card shadow">
                <div className="card-header d-flex justify-content-between">
                  <h5 className="mb-0">{accommodation.nome}</h5>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary ms-3 badge-button shadow">
                      <i className="fas fa-calendar"></i> 
                    </span>
                    <span className="badge bg-secondary ms-3 badge-button shadow">
                      <i className="fas fa-edit"></i>
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label><strong>Descrição</strong></label>
                    <p>{accommodation.descricao}</p>
                  </div>

                  <div className="mb-3 d-flex justify-content-between">
                    <div className="capacidade-preco">
                      <label><strong>Capacidade</strong></label>
                      <p>{accommodation.capacidade} pessoas</p>
                    </div>
                    <div className="capacidade-preco">
                      <label><strong>Preço</strong></label>
                      <p>R$ {accommodation.preco}</p>
                    </div>
                  </div>

                  {accommodation.amenidades.length > 0 ? (
                    <div>
                      <label><strong>Amenidades</strong></label>
                      <div>
                        {accommodation.amenidades.map((amenidade) => (
                          <span key={amenidade.id} className="badge bg-info me-2">
                            {amenidade.nome}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>Acomodação sem amenidades.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accommodation;
