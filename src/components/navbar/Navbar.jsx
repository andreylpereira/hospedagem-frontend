import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top shadow">
        <div className="container-fluid">
          <Link className="navbar-brand text-white">LOGO</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white">Tempo Real</Link>
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
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/usuarios">
                  Usuários
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/painel/amenidades">
                  Amenidades
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary shadow">SAIR</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
