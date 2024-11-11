import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../../redux/actions/userActions';
import InputMask from "react-input-mask";

const CreateUserModal = ({ isVisible, onClose, fetchUsers }) => {
  const [newUser, setNewUser] = useState({
    cpf: '',
    senha: '',
    nome: '',
    email: '',
    perfil: '', 
    habilitado: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUserAction(newUser)) 
      .then(() => {
        fetchUsers(); 
        onClose(); 
        setNewUser({ cpf: '', senha: '', nome: '', email: '', perfil: '', habilitado: false }); 
      });
  };

  return (
    isVisible && (
      <div
        className={`modal fade ${isVisible ? 'show' : ''}`}
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? 'block' : 'none' }} 
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title bold" id="createUserModalLabel">
                CADASTRAR
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Fechar"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formNome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formNome"
                    placeholder="Nome"
                    value={newUser.nome}
                    onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formCpf" className="form-label">
                    CPF
                  </label>
                  <InputMask
                        mask="999.999.999-99"
                        type="text"
                        className="form-control"
                        name="cpf"
                        id="cpf"
                        placeholder="Digite seu CPF"
                        value={newUser.cpf}
                        onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                      />
                </div>
                <div className="mb-3">
                  <label htmlFor="formSenha" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="formSenha"
                    placeholder="Senha"
                    value={newUser.senha}
                    onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formPerfil" className="form-label">
                    Perfil
                  </label>
                  <select
                    className="form-control"
                    id="formPerfil"
                    value={newUser.perfil}
                    onChange={(e) => setNewUser({ ...newUser, perfil: e.target.value })}
                  >
                    <option value="">Selecione o Perfil</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="FUNCIONARIO">Funcionário</option>
                  </select>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formHabilitado"
                    checked={newUser.habilitado}
                    onChange={(e) => setNewUser({ ...newUser, habilitado: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="formHabilitado">
                    Habilitado
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary fw-bold bg-gradient rounded shadow"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary fw-bold bg-gradient rounded shadow">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateUserModal;
