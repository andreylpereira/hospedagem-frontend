import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAccommodations } from "../../redux/actions/accommodationActions.jsx";
import { useAuth } from "./../../context/AuthContext";
import ChangePasswordModal from "./ChangePasswordModal.jsx";
import logo from "../../assets/logo.png"
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { logout, auth } = useAuth();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  useEffect(() => {
    if (location.pathname === "/painel/acomodacoes") {
      dispatch(fetchAccommodations());
    }
  }, [dispatch, location.pathname]);

  const handleOpenChangePasswordModal = () => {
    setModalPasswordVisible(true);
  };

  const handleCloseChangePasswordModal = () => {
    setModalPasswordVisible(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient fixed-top  user-select-none shadow">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
           <img src={logo} alt="" srcset="" width={56} height={36}/>

          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isNavbarOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/tempo-real">
                  Tempo Real
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/acomodacoes">
                  Acomodação
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/clientes">
                  Clientes
                </Link>
              </li>
              {auth.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/painel/usuarios">
                    Usuários
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/amenidades">
                  Amenidades
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  onClick={handleOpenChangePasswordModal}
                >
                  Alterar Senha
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light bg-gradient rounded shadow"
                  onClick={logout}
                >
                  SAIR
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ChangePasswordModal
        isVisible={modalPasswordVisible}
        onClose={handleCloseChangePasswordModal}
      />
    </>
  );
};

export default Navbar;
