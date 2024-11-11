import {
    FETCH_AMENITIES_REQUEST,
    FETCH_AMENITIES_SUCCESS,
    FETCH_AMENITIES_FAILURE,
    CREATE_AMENITY_SUCCESS,
    UPDATE_AMENITY_SUCCESS,
  } from "../types/actionTypes";
  import {
    getAmenities,
    createAmenity,
    updateAmenity,
  } from "../../services/amenityService";
  
  export const fetchAmenities = () => async (dispatch) => {
    dispatch({ type: FETCH_AMENITIES_REQUEST });
  
    try {
      const amenities = await getAmenities();
      dispatch({
        type: FETCH_AMENITIES_SUCCESS,
        payload: amenities,
      });
    } catch (error) {
      dispatch({
        type: FETCH_AMENITIES_FAILURE,
        payload: "Erro ao carregar amenidades. Tente novamente mais tarde.",
      });
    }
  };
  
  export const createAmenityAction = (amenity) => async (dispatch) => {
    try {
      const newAmenity = await createAmenity(amenity);
      dispatch({
        type: CREATE_AMENITY_SUCCESS,
        payload: newAmenity,
      });
    } catch (error) {
      console.error("Erro ao criar amenidade", error);
    }
  };
  
  export const updateAmenityAction = (idAmenity, amenity) => async (dispatch) => {
    try {
      const updatedAmenity = await updateAmenity(idAmenity, amenity);
  
      dispatch({
        type: UPDATE_AMENITY_SUCCESS,
        payload: updatedAmenity,
      });
    } catch (error) {
      console.error("Erro ao atualizar amenidade", error.message);
    }
  };
  