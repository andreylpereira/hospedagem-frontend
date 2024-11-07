import api from "./api";

const _URL = "/usuario";

export const getUsers = async () => {
  try {
    const response = await api.get(`${_URL}/lista`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários.", error);
    throw error;
  }
};

export const getUserById = async (idUser) => {
  try {
    const response = await api.get(`${_URL}/lista/${idUser}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID: ${idUser}`, error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await api.post(`${_URL}/cadastrar`, user);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário.", error);
    throw error;
  }
};

export const updateUser = async (idUser, user) => {
  try {
    const response = await api.put(`${_URL}/atualizar/${idUser}`, user);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID: ${idUser}`, error);
    throw error;
  }
};

export const updatePassword = async (idUser, user) => {
  try {
    const response = await api.put(`${_URL}/atualizarSenha/${idUser}`, user);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar senha do usuário com ID: ${idUser}`, error);
    throw error;
  }
};

export const updateAuthorization = async (idUser, isAuthorization) => {
  try {
    const response = await api.put(
      `${_URL}/lista/${idUser}/${isAuthorization}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao atualizar a permissão do usuário com ID: ${idUser}`,
      error
    );
    throw error;
  }
};
