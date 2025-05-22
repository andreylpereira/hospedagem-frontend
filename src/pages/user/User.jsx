import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUserAuthorizationAction,
} from "../../redux/actions/userActions";
import CreateUserModal from "./modals/CreateUserModal";
import { toast } from "sonner";
import Bread from "../../components/bread/Bread";
import ReactPaginate from "react-paginate";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
       user?.nome?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const offset = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const updateAuthorization = (id, currentAuthorization, nome) => {
    const newAuthorization = !currentAuthorization;

    dispatch(updateUserAuthorizationAction(id, newAuthorization))
      .then(() => {
        dispatch(fetchUsers());
        toast.success(
          `Autorização de acesso do usuário ${nome} atualizada com sucesso.`
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
        {!loading && users.length > 0 && (
          <div>
            <Bread current={"USUÁRIOS"} />

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

            <div className="mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Filtrar por nome..."
                className="form-control shadow"
                style={{ width: "18ch" }}
              />
            </div>

            <table className="table table-striped table-bordered shadow mt-3">
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
                {currentUsers.map((user) => (
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
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-center mt-3">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={
                  "page-link bg-light text-primary border-primary"
                }
                previousClassName={"page-item"}
                previousLinkClassName={
                  "page-link bg-light text-primary border-primary"
                }
                nextClassName={"page-item"}
                nextLinkClassName={
                  "page-link text-primary border-primary"
                }
                breakClassName={"page-item"}
                breakLinkClassName={
                  "page-link text-primary border-primary"
                }
                activeClassName={"active"}
                activeLinkClassName={"bg-primary text-light border-primary"}
              />
            </div>
          </div>
        )}
        {!loading && users.length === 0 && !error && (
          <div className="alert alert-warning mt-3" role="alert">
            Não há usuários cadastrados.
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
