import api, { getUserIdFromToken } from "./api";

const _URL = "/hospedagem";

export const getClients = async () => {
  try {
    const response = await api.get(`${_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
    throw error;
  }
};

export const getClientById = async (idClient) => {
  try {
    const response = await api.get(`${_URL}/clientes/${idClient}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${idClient}:`, error);
    throw error;
  }
};

export const createClient = async (Client) => {
  const idUser = getUserIdFromToken();
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const response = await api.post(`${_URL}/${idUser}/clientes`, Client);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente.", error);
    throw error;
  }
};

export const updateClient = async (idClient, Client) => {
  const idUser = getUserIdFromToken();
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const response = await api.put(
      `${_URL}/${idUser}/clientes/${idClient}`,
      Client
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${idClient}:`, error);
    throw error;
  }
};
