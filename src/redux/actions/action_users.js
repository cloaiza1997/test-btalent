import * as Types from "./actionTypes";
// Estado global
import global_state from "../../components/config/GlobalState";
// Actions
import { action_load } from "./action_load";
/**
 * Realiza la petición para eliminar usuarios de la API
 * @param {object} data Objeto con el listado de id de usuarios
 * @return {function} Ejecuta el llamado asincrónico
 */
export const action_request_delete = (data) => (dispatch) => {
  dispatch(action_load(true));
  // Ejecuta la llamada al login
  return global_state.func
    .axiosFunc("DEL", "test_users_delete", data, {})
    .then((response) => {
      // + Error | - Ok
      if (response.error) {
        // Muestra notificación de error
        global_state.showNotify().error("Ocurrió un error al iniciar sesión");
        console.error("Error Login:", response.error);
        data = { load: false };
      } else {
        // Obtiene los datos del login
        dispatch(action_load(false));
        dispatch(action_get_list(response.data.content.users));
      }
    });
};
/**
 * Realiza la petición para consultar los usuarios de la API
 * @param {object} data Objeto con el listado de usuarios
 * @return {function} Ejecuta el llamado asincrónico
 */
export const action_request_list = (data, users_list = [], page = 1) => (dispatch) => {
  dispatch(action_load(true));
  // Ejecuta la llamada al login
  global_state.func
    .axiosFunc("GET", "test_users_list?page=" + page, {}, { "X-Auth-Token": data.token })
    .then((response) => {
      // + Error | - Ok
      if (response.error) {
        // Muestra notificación de error
        global_state.showNotify().error("Ocurrió un error al iniciar sesión");
        console.error("Error Login:", response.error);
        data = { load: false };
      } else {

        let users = response.data.content.users;


          users_list.push(...users);

          if (users.length > 0) {
            // dispatch(action_request_list(data, users_list, page + 1));
          } else {
            
            // Obtiene los datos del login
            dispatch(action_load(false));
            
          }
          dispatch(action_get_list(users_list));
      }
    });
};
/**
 * Acción para actualizar el estado del listado de usuarios
 * @param {object} users Objeto con el listado de usuarios
 */
export const action_get_list = (users) => ({
  type: Types.USER_LIST,
  payload: {
    users,
  },
});