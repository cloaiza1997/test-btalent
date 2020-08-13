import * as Types from "../actions/actionTypes";

const initialState = {
  display_load: false,
};
/**
 * Cambia los estados dependiendo de la acción
 * @param {object} state Estado de la aplicación
 * @param {object} action Acción ejecutada
 */
const reducer_state_load = (state = initialState, action) => {
  switch (action.type) {
    // Load de carga
    case Types.LOAD: {
      // Se extraen los datos de la acción
      let data = action.payload;
      return {
        ...state,
        display_load: data.display_load,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer_state_load;
