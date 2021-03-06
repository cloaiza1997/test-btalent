import * as Types from "../actions/actionTypes";

const initialState = {
  login: false,
  user: {},
  token: "",
  load: false,
};
/**
 * Cambia los estados dependiendo de la acción
 * @param {object} state Estado de la aplicación 
 * @param {object} action Acción ejecutada
 */
const reducer_state_login = (state = initialState, action) => {
  switch (action.type) {
    // Inicio de sesión
    case Types.LOGIN: {
      // Se extraen los datos de la acción
      let data = action.payload;
      return {
        ...state,
        login: data.login,
        user: data.user,
        token: data.token,
        load: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer_state_login;
