import api, { getUserIdFromToken } from "./api";

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

export const getUserById = async () => {
  const idUser = getUserIdFromToken();  
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
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


export const updatePassword = async (user) => {
  const idUser = getUserIdFromToken();  
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const response = await api.put(`${_URL}/atualizarSenha/${idUser}`, user);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar senha do usuário com ID: ${idUser}`, error);
    throw error;
  }
};

export const updateAuthorization = async (idUser, isAuthorization) => {
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
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
