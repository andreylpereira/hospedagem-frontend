import isEqual from 'lodash/isEqual';

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

const accommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ACCOMMODATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ACCOMMODATIONS_SUCCESS:
      if (isEqual(state.accommodations, action.payload)) {
        return state;
      }

      return {
        ...state,
        accommodations: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        loading: true,
        accommodations: [...state.accommodations, action.payload],
      };

    case UPDATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommodations: state.accommodations.map((accommodation) =>
          accommodation.id === action.payload.id
            ? { ...accommodation, ...action.payload }
            : accommodation
        ),
      };

    default:
      return state;
  }
};

export default accommodationReducer;
