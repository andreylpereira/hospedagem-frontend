import api from "./api";

const _URL = "/hospedagem";

export const getAccommodations = async () => {
  try {
    const response = await api.get(`${_URL}/acomodacoes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar acomodações.", error);
    throw error;
  }
};

export const getAccommodationById = async (idAccommodation) => {
  try {
    const response = await api.get(`${_URL}/acomodacoes/${idAccommodation}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar acomodação com ID: ${idAccommodation}`, error);
    throw error;
  }
};

export const createAccommodation = async (idUser, accommodation) => {
  try {
    const response = await api.post(`${_URL}/${idUser}/acomodacoes`, accommodation);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar acomodação.", error);
    throw error;
  }
};

export const updateAccommodation = async (idUser, idAccommodation, accommodation) => {
  try {
    const response = await api.put(`${_URL}/${idUser}/acomodacoes/${idAccommodation}`, accommodation);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar acomodação com ID: ${idAccommodation}`, error);
    throw error;
  }
};

export const updateEnable = async (idAccommodation, isEnable) => {
  try {
    const response = await api.put(
      `${_URL}/acomodacoes/${idAccommodation}/${isEnable}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao atualizar a habilitação da acomodação com ID: ${idAccommodation}`,
      error
    );
    throw error;
  }
};
