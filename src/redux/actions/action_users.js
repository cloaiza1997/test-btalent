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
    .axiosFunc("DELETE", "test_users_delete", data, {})
    .then((response) => {
      // + Error | - Ok
      if (response.error) {
        // Muestra notificación de error
        global_state
          .showNotify()
          .error("Ocurrió un error al eliminar un usuario");
        console.error("Error Login:", response.error);
      } else {
        global_state.showNotify().success("Usuario eliminado correctamente");
        setTimeout(() => {
          window.location.reload();
          dispatch(action_load(false));
        }, 2000);
      }
    });
};
/**
 * Función recursiva
 * Realiza la petición para consultar los usuarios de la API y recorre todas las páginas para obtener todos los usuarios
 * @param {object} data Objeto con el listado de usuarios
 * @param {array} users_list Arreglo de usuarios
 * @param {number} page Número de página a consultar
 * @return {function} Ejecuta el llamado asincrónico
 */
export const action_request_list = (data, users_list = [], page = 1) => (
  dispatch
) => {
  dispatch(action_load(true));
  // Ejecuta la llamada al login
  global_state.func
    .axiosFunc(
      "GET",
      "test_users_list?page=" + page,
      {},
      { "X-Auth-Token": data.token }
    )
    .then((response) => {
      // + Error | - Ok
      if (response.error) {
        // Muestra notificación de error
        global_state.showNotify().error("Ocurrió un error al cargar la lista");
        console.error("Error Login:", response.error);
      } else {
        // Se extraen los usuarios de la respuesta
        let users = response.data.content.users;
        // Se añade al arreglo de usuario
        users_list.push(...users);

        // ++++++++++++++++++++++++

        // + Aún hay datos en la respuesta de la API | - Se carga la tabla
        if (users.length > 0) {
          // Se ejecuta nuevamente el llamado a una nueva página
          // Enviando el listado de usuarios para que este se sobreescriba
          dispatch(action_request_list(data, users_list, page + 1));
        } else {

          // ***********************
          // Se oculta el load
          dispatch(action_load(false));
          // Se extraen los usuarios del local storage
          let {
            payload: { users_local },
          } = action_get_local_users();
          // Se agregan al listado
          users_list.push(...users_local);
          // Se actualiza el estado de la tabla
          dispatch(action_get_list(users_list));
          // ************************

        }

        // ++++++++++++++++++++++++++
      }
    });
};
/**
 * Extrae del local storage el arreglo de usuarios
 */
export const action_get_local_users = () => {
  let users_local = localStorage.getItem("users_local");
  users_local = users_local != null ? JSON.parse(users_local) : [];

  return {
    type: Types.USER_LOCAL,
    payload: {
      users_local,
    },
  };
};
/**
 * Actualiza el local storage con un arreglo de usuarios
 * @param {array} users_local Arreglo de usuarios 
 */
export const action_set_local_users = (users_local) => {
  localStorage.setItem("users_local", JSON.stringify(users_local));
  return {
    type: Types.USER_LOCAL,
    payload: {
      users_local,
    },
  };
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
/**
 * Limpia la lista de usuarios
 */
export const action_clean_list = () => ({
  type: Types.USER_CLEAR
});

