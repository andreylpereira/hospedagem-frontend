import api from "./api";

const _URL = "/hospedagem";

export const getAmenities = async () => {
  try {
    const response = await api.get(`${_URL}/amenidades`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar amenidades.", error);
    throw error;
  }
};

export const getAmenityById = async (idAmenity) => {
  try {
    const response = await api.get(`${_URL}/amenidades/{idAmenity}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar a amenidade com ID: ${idAmenity}`, error);
    throw error;
  }
};

export const createAmenity = async (idUser, amenity) => {
  try {
    const response = await api.post(`${_URL}/${idUser}/amenidades`, amenity);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a amenidade.", error);
    throw error;
  }
};

export const updateAmenity = async (idUser, idAmenity, amenity) => {
  try {
    const response = await api.put(`${_URL}/${idUser}/amenidades/${idAmenity}`, amenity);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar a amenidade com ID: ${idAmenity}`, error);
    throw error;
  }
};
