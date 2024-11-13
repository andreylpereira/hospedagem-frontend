import React, { useState } from "react";
import { updatePassword } from "./../../services/UserService";

const ChangePasswordModal = ({ isVisible, onClose }) => {
  const [form, setForm] = useState({
    senha: "",
    confirmarSenha: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    const newPassword = { senha: form.senha };

    updatePassword(newPassword)
      .then(() => {
        console.log("Senha alterada com sucesso!");
        onClose();
      })
      .catch((err) => {
        setError("Ocorreu um erro ao alterar a senha.");
        console.error(err);
      });
  };

  return (
    isVisible && (
      <div
        className="modal fade show"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden={!isVisible}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePasswordModalLabel">
                Alterar Senha
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
                  <label htmlFor="formSenha" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="formSenha"
                    placeholder="Digite sua nova senha"
                    value={form.senha}
                    onChange={(e) =>
                      setForm({ ...form, senha: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formConfirmarSenha" className="form-label">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="formConfirmarSenha"
                    placeholder="Confirme sua senha"
                    value={form.confirmarSenha}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmarSenha: e.target.value,
                      })
                    }
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary">
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

export default ChangePasswordModal;