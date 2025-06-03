import isEqual from "lodash/isEqual";

import {
  FETCH_ACCOMMODATIONS_REQUEST,
  FETCH_ACCOMMODATIONS_SUCCESS,
  FETCH_ACCOMMODATIONS_FAILURE,
  CREATE_ACCOMMODATION_SUCCESS,
  UPDATE_ACCOMMODATION_SUCCESS,
} from "../types/actionTypes";

const initialState = {
  accommodations: [],
  loading: true,
  error: null,
};

export const fetchAccommodations = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_ACCOMMODATIONS_REQUEST });
  try {
    const currentAccommodations = getState().accommodations.accommodations;
    const newAccommodationsRaw = await getAccommodations();

    const normalize = (accommodations) =>
      accommodations.map((a) => ({
        id: a.id,
        nome: a.nome,
        descricao: a.descricao,
        capacidade: a.capacidade,
        preco: a.preco,
        habilitado: a.habilitado,
        amenidades: a.amenidades?.map((am) => am.nome).sort(),
      }));

    const currentNormalized = normalize(currentAccommodations);
    const newNormalized = normalize(newAccommodationsRaw);

    if (!isEqual(currentNormalized, newNormalized)) {
      dispatch({
        type: FETCH_ACCOMMODATIONS_SUCCESS,
        payload: newAccommodationsRaw,
      });
    } else {
      dispatch({
        type: FETCH_ACCOMMODATIONS_SUCCESS,
        payload: currentAccommodations,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_ACCOMMODATIONS_FAILURE,
      payload: "Erro ao carregar as acomodações. Tente novamente mais tarde.",
    });
  }
};

export default accommodationReducer;
