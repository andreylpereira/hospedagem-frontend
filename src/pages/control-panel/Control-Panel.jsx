import React from 'react'
import "./Control-Panel.css";
import Date from './Date';

const ControlPanel = () => {
  return (
 <>

<nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top shadow">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">LOGO</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Acomodações</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Clientes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Usuários</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Amenidades</a>
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-primary shadow" href="#">SAIR</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className="content d-flex justify-content-center align-items-center mt-5">
    <div className="container text-center mt-5">
        <h1>Hello World</h1>
        <p>Hello World</p>
        <p>Hello World</p>
    </div>
</div>

 <Date></Date>
 </>
  )
}

export default ControlPanel