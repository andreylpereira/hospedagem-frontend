import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateAmenityModal from "./modals/CreateAmenityModal";
import { fetchAmenities } from "../../redux/actions/AmenityActions";
import EditAmenityModal from "./modals/EditAmenityModal";
import "./Amenity.css";

const Amenity = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [amenityToEdit, setAmenityToEdit] = useState(null);

  const { amenities, loading, error } = useSelector((state) => state.amenity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);

  const handleEdit = (amenity) => {
    setAmenityToEdit(amenity);
    setEditModalVisible(true);
  };

  const handleCloseCreateModal = () => setModalVisible(false);
  const handleCloseEditModal = () => setEditModalVisible(false);

  return (
    <div className="container d-flex justify-content-center min-vh-100 user-select-none">
      <div className="w-100">
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
        {amenities.length > 0 && (
          <div>
            <button
              type="button"
              className="btn btn-primary fw-bold bg-gradient rounded shadow"
              onClick={() => setModalVisible(true)}
            >
              CADASTRAR
            </button>
            <CreateAmenityModal
              isVisible={modalVisible}
              onClose={handleCloseCreateModal}
              fetchAmenities={() => dispatch(fetchAmenities())}
            />

            <EditAmenityModal
              isVisible={editModalVisible}
              onClose={handleCloseEditModal}
              amenityToEdit={amenityToEdit}
              fetchAmenities={() => dispatch(fetchAmenities())}
            />
            <table className="table table-striped table-bordered shadow">
              <thead>
                <tr>
                  <th className="text-center table-primary text-light">Nome</th>
                  <th className="text-center table-primary text-light">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {amenities.map((amenity) => (
                  <tr key={amenity.id}>
                    <td>{amenity.nome}</td>
                    <td>
                      <button
                        className="btn btn-primary fw-bold shadow bg-gradient rounded btn-sm me-2 w-100"
                        onClick={() => handleEdit(amenity)}
                      >
                        <i className="fas fa-edit"></i> Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && amenities.length === 0 && !error && (
        <div className="alert alert-warning mt-3" role="alert">
          Não há amenidades cadastradas.
        </div>
      )}
    </div>
  );
};

export default Amenity;
