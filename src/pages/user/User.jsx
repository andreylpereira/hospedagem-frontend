import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import { updateUserAuthorizationAction } from "../../redux/actions/userActions";
import CreateUserModal from "./modals/CreateUserModal";
import { toast } from "sonner";
import "./User.css";
import Bread from "../../components/bread/Bread";

const User = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const updateAuthorization = (id, currentAuthorization, nome) => {
    const newAuthorization = !currentAuthorization;

    dispatch(updateUserAuthorizationAction(id, newAuthorization))
      .then(() => {
        dispatch(fetchUsers());
        toast.success(
          `Authorização de acesso do usuário ${nome} atualizada com sucesso.`
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCloseCreateModal = () => setModalVisible(false);

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
        {users.length > 0 && (
          <div>
            <Bread current={"USUÁRIOS"}/>

            <button
              type="button"
              className="btn btn-primary fw-bold bg-gradient rounded shadow"
              onClick={() => setModalVisible(true)}
            >
              CADASTRAR
            </button>
            <CreateUserModal
              isVisible={modalVisible}
              onClose={handleCloseCreateModal}
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
                        {user.id !== 1 ? (
                          <button
                            className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow"
                            onClick={() =>
                              updateAuthorization(
                                user.id,
                                user.habilitado,
                                user.nome
                              )
                            }
                          >
                            <i className="fas fa-user-shield"></i>
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm fw-bold bg-gradient rounded shadow disabled">
                            <i className="fas fa-user-shield shadow"></i>
                          </button>
                        )}
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
