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
  error: null,
  loading: false,
};

const accommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ACCOMMODATIONS_SUCCESS: {
      // Atualiza o estado só se os dados forem diferentes
      if (isEqual(state.accommodations, action.payload)) {
        // Dados iguais, só setar loading false
        return {
          ...state,
          loading: false,
          error: null,
        };
      }
      return {
        ...state,
        accommodations: action.payload,
        loading: false,
        error: null,
      };
    }
    case FETCH_ACCOMMODATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        accommodations: state.accommodations.map((acc) =>
          acc.id === action.payload.id ? action.payload : acc
        ),
      };
    default:
      return state;
  }
};

export default accommodationsReducer;
