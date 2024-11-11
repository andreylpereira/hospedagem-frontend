import {
    FETCH_RESERVATIONS_REQUEST,
    FETCH_RESERVATIONS_SUCCESS,
    FETCH_RESERVATIONS_FAILURE,
  } from '../types/actionTypes';
  import { getReservationsByAccommodation } from '../../services/reservationService';

  export const fetchReservationsAction = (accommodationId, startDate) => async (dispatch) => {
    dispatch({ type: FETCH_RESERVATIONS_REQUEST });
  
    try {
      const reservations = await getReservationsByAccommodation(accommodationId, startDate);
      dispatch({
        type: FETCH_RESERVATIONS_SUCCESS,
        payload: reservations,
      });
    } catch (error) {
      dispatch({
        type: FETCH_RESERVATIONS_FAILURE,
        payload: error.message,
      });
    }
  };
  