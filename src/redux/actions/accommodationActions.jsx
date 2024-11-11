import {
  FETCH_ACCOMMODATIONS_REQUEST,
  FETCH_ACCOMMODATIONS_SUCCESS,
  FETCH_ACCOMMODATIONS_FAILURE,
  CREATE_ACCOMMODATION_SUCCESS,
  CREATE_ACCOMMODATION_FAILURE,
  UPDATE_ACCOMMODATIONS_SUCCESS, 
  UPDATE_ACCOMMODATION_FAILURE
} from "../types/actionTypes"; 

import {
  getAccommodations,
  createAccommodation,
  updateAccommodation
} from "../../services/accommodationService";

export const fetchAccommodations = () => async (dispatch) => {
  dispatch({ type: FETCH_ACCOMMODATIONS_REQUEST });

  try {
    const accommodations = await getAccommodations();
    dispatch({
      type: FETCH_ACCOMMODATIONS_SUCCESS,
      payload: accommodations,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ACCOMMODATIONS_FAILURE,
      payload: error.message || "Erro ao buscar acomodações.",
    });
  }
};

export const createAccommodationAction = (accommodation) => async (dispatch) => {
  try {
    const newAccommodation = await createAccommodation(accommodation);
    dispatch({
      type: CREATE_ACCOMMODATION_SUCCESS,
      payload: newAccommodation,
    });
    return newAccommodation;  
  } catch (error) {
    console.error("Erro ao criar acomodação", error);
    dispatch({
      type: CREATE_ACCOMMODATION_FAILURE,
      payload: error.message || "Erro ao criar acomodação.",
    });
    throw error;  
  }
};

export const updateAccommodationAction = (idAccommodation, accommodation) => async (dispatch) => {
  try {
    const updatedAccommodation = await updateAccommodation(idAccommodation, accommodation);
    dispatch({
      type: UPDATE_ACCOMMODATIONS_SUCCESS, 
      payload: updatedAccommodation,
    });
    return updatedAccommodation;  
  } catch (error) {
    console.error("Erro ao atualizar acomodação", error);
    dispatch({
      type: UPDATE_ACCOMMODATION_FAILURE,
      payload: error.message || "Erro ao atualizar a acomodação.",
    });
    throw error;  
  }
};
