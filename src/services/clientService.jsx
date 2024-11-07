import api from "./api";

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

export const createClient = async (idUser, Client) => {
  try {
    const response = await api.post(`${_URL}/${idUser}/clientes`, Client);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente.", error);
    throw error;
  }
};

export const updateClient = async (idUser, idClient, Client) => {
  try {
    const response = await api.put(`${_URL}/${idUser}/clientes/${idClient}`, Client);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${idClient}:`, error);
    throw error;
  }
};