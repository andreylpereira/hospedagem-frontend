import React from "react";

import "./Login.css";

const Login = () => {
  return (
    <div className="bg-primary d-flex justify-content-center align-items-center page-height">
      <div className="d-flex">
        <div className="row justify-content-center card-width">
          <div>
            <div className="card shadow">
              <div className="card-header">
                <div className="card-body">
                  <form>
                    <div className="text-center mb-3">
                      <svg
                        id="user-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="150"
                        height="150"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 14a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="form-group mb-1">
                      <label for="cpf">CPF</label>
                      <input
                        type="cpf"
                        className="form-control"
                        aria-describedby="cpfId"
                        placeholder="Digite seu CPF"
                        formControlName="cpf"
                      />
                      <small id="cpfId" className="form-text text-danger">
                        <p className="mb-0">* Favor digitar um CPF válido!</p>
                      </small>
                    </div>
                    <div className="form-group">
                      <label for="senha">Senha</label>
                      <input
                        type="password"
                        className="form-control"
                        aria-describedby="senhaId"
                        placeholder="Digite sua senha"
                        formControlName="senha"
                      />
                      <small id="senhaId" className="form-text text-danger">
                        <p className="mb-0">
                          * Favor digitar uma senha válida!
                        </p>
                      </small>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 font-weight-bold mt-2 rounded shadow"
                    >
                      ENTRAR
                    </button>

                    {/*  spinner */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
