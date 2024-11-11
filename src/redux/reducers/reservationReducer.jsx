import {
    FETCH_RESERVATIONS_REQUEST,
    FETCH_RESERVATIONS_SUCCESS,
    FETCH_RESERVATIONS_FAILURE,
  } from './../types/actionTypes';
  
  const initialState = {
    reservations: [],
    loading: false,
    error: null,
  };
  
  const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESERVATIONS_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_RESERVATIONS_SUCCESS:
        return { ...state, loading: false, reservations: action.payload };
  
      case FETCH_RESERVATIONS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default reservationReducer;
  