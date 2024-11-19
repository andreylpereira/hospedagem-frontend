import {
  FETCH_ACCOMMODATIONS_REQUEST,
  FETCH_ACCOMMODATIONS_SUCCESS,
  FETCH_ACCOMMODATIONS_FAILURE,
  CREATE_ACCOMMODATION_SUCCESS,
  UPDATE_ACCOMMODATION_SUCCESS,
} from "../types/actionTypes.jsx";

import {
  getAccommodations,
  createAccommodation,
  updateAccommodation,
} from "../../services/AccommodationService.jsx";

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
      payload: "Erro ao carregar as acomodações. Tente novamente mais tarde.",
    });
  }
};

export const createAccommodationAction =
  (accommodation) => async (dispatch) => {
    try {
      const newAccommodation = await createAccommodation(accommodation);
      dispatch({
        type: CREATE_ACCOMMODATION_SUCCESS,
        payload: newAccommodation,
      });
      return newAccommodation;
    } catch (error) {
      throw error;
    }
  };

export const updateAccommodationAction =
  (idAccommodation, accommodation) => async (dispatch) => {
    try {
      const updatedAccommodation = await updateAccommodation(
        idAccommodation,
        accommodation
      );
      dispatch({
        type: UPDATE_ACCOMMODATION_SUCCESS,
        payload: updatedAccommodation,
      });
      return updatedAccommodation;
    } catch (error) {
      throw error;
    }
  };
