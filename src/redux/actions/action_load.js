import * as Types from "./actionTypes";

/**
 * Actualiza el estado para mostrar u ocultar el load
 * @param {boolean} display_load
 */
export const action_load = (display_load) => ({
  type: Types.LOAD,
  payload: {
    display_load,
  },
});
