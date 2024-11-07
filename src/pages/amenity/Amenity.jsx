import React, { useState, useEffect } from "react";
import { getAmenities } from "../../services/amenityService";
import "./Amenity.css";

const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAmenities();
      if (Array.isArray(response)) {
        setAmenities(response);
      } else {
        throw new Error("Formato de resposta inesperado.");
      }
    } catch (error) {
      setError("Erro ao carregar amenidades. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100">
        <button type="button" className="btn btn-primary shadow">
          CADASTRAR
        </button>

        {loading ? (
          <p>Carregando Amenidades...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          // <div className="card shadow-sm">
          //   <div className="card-body">
              <table className="table table-striped table-bordered shadow">
                <thead>
                  <tr>
                    <th className="text-center">Nome</th> 
                    <th className="text-center">Ações</th> 
                  </tr>
                </thead>
                <tbody>
                  {amenities.map((amenity) => (
                    <tr key={amenity.id}>
                      <td>{amenity.nome}</td>
                      <td>
                        <button className="btn btn-primary btn-sm me-2 w-100">
                          <i className="fas fa-edit"></i> Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            //</div>
          //div> */
        )}
      </div>
    </div>
  );
};

export default Amenity;
