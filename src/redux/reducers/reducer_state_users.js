import * as Types from "../actions/actionTypes";

const initialState = {
  users: {}
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
        users: data.users
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer_state_list;
