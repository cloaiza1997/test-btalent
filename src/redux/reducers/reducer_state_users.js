import * as Types from "../actions/actionTypes";

const initialState = {
  users: {},
  users_local: {}
};
/**
 * Cambia los estados dependiendo de la acción
 * @param {object} state Estado de la aplicación
 * @param {object} action Acción ejecutada
 */
const reducer_state_list = (state = initialState, action) => {
  switch (action.type) {
    // Listado de usuarios
    case Types.USER_LIST: {
      // Se extraen los datos de la acción
      let data = action.payload;
      return {
        ...state,
        users: data.users,
      };
    }
    // Listado de usuarios locales
    case Types.USER_LOCAL: {
      // Se extraen los datos de la acción
      let data = action.payload;
      return {
        ...state,
        users_local: data.users_local,
      };
    }
    // Vaciar lista de usuarios
    case Types.USER_CLEAR: {
      return {
        ...state,
        users: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer_state_list;
