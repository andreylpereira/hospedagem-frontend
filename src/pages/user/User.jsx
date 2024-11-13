import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/UserActions";
import { updateUserAuthorizationAction } from "../../redux/actions/UserActions";
import CreateUserModal from "./modals/CreateUserModal";
import "./User.css";

const User = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const updateAuthorization = (id, currentAuthorization) => {
    const newAuthorization = !currentAuthorization;

    dispatch(updateUserAuthorizationAction(id, newAuthorization))
      .then(() => {
        dispatch(fetchUsers());
      })
      .catch((err) => {
        console.error("Erro ao atualizar autorização", err);
      });
  };

  return (
    <div className="container d-flex justify-content-center min-vh-100">
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
        {users.length > 0 && (
          <div>
            <button
              type="button"
              className="btn btn-primary fw-bold bg-gradient rounded shadow"
              onClick={() => setModalVisible(true)}
            >
              CADASTRAR
            </button>

            <CreateUserModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              fetchUsers={() => dispatch(fetchUsers())}
            />
            <table className="table table-striped table-bordered shadow">
              <thead>
                <tr>
                  <th className="text-center table-primary text-light">Nome</th>
                  <th className="text-center table-primary text-light">
                    Perfil
                  </th>
                  <th className="text-center table-primary text-light">
                    Email
                  </th>
                  <th className="text-center table-primary text-light">
                    Habilitado
                  </th>
                  <th className="text-center table-primary text-light">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.nome}</td>
                      <td>{user.perfil}</td>
                      <td>{user.email || "Não informado"}</td>
                      <td>{user.habilitado ? "Sim" : "Não"}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow"
                          onClick={() =>
                            updateAuthorization(user.id, user.habilitado)
                          }
                        >
                          <i className="fas fa-user-shield"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && users.length === 0 && !error && (
        <div className="alert alert-warning mt-3" role="alert">
          Não há usuário cadastrados.
        </div>
      )}
    </div>
  );
};

export default User;
