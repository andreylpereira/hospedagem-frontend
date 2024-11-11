import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../types/actionTypes";

import {
  getUsers,
  createUser,
  updateAuthorization,
} from "../../services/userService";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    const users = await getUsers();
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: users,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: "Erro ao carregar usuários. Tente novamente mais tarde.",
    });
  }
};

export const createUserAction = (user) => async (dispatch) => {
  try {
    const newUser = await createUser(user);
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: newUser,
    });
  } catch (error) {
    console.error("Erro ao criar usuário", error);
  }
};

export const updateUserAuthorizationAction = (idUser, newAuthorization) => {
  return async (dispatch) => {
    try {
     
      const result = await updateAuthorization(idUser, newAuthorization);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { ...result, habilitado: newAuthorization }, 
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error,
      });
    }
  };
};