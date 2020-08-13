import * as Types from "./actionTypes";
// Estado global
import global_state from "../../components/config/GlobalState";
// Actions
import { action_load } from "./action_load";
/**
 * Realiza la petición para el incio de sesión
 * @param {object} data Objeto con los datos de username y password
 * @return {function} Ejecuta el llamado asincrónico
 */
export const action_request_login = (data) => (dispatch) => {
  dispatch(action_load(true));
  console.log("log");
  // Ejecuta la llamada al login
  return global_state.func
    .axiosFunc("POST", "test_users_login", data)
    .then((response) => {
      // + Error | - Ok
      if (response.error) {
        // Muestra notificación de error
        global_state.showNotify().error("Ocurrió un error al iniciar sesión");
        console.error("Error Login:", response.error);
        data = { load: false };
      } else {
        // Obtiene los datos del login
        let res = response.data;
        let user = res.user_info.user;

        data = {
          login: true,
          token: res.jwt,
          user: {
            id: user.id,
            name: user.display_name,
            rol: user.user_role_type,
            status: user.user_status,
            avatar: user.user_avatar,
          },
        };
        // Almacena en el local storage la sesión del usuario
        localStorage.setItem("data", JSON.stringify(data));
      }
      // Ejecuta la acción de login
      dispatch(action_load(false));
      dispatch(action_login(data));
    });
};
/**
 * Acción para actualizar los estados del login
 * @param {object} data Objeto con los datos del estado de login
 */
export const action_login = (data) => ({
  type: Types.LOGIN,
  payload: {
    login: data.login,
    token: data.token,
    user: data.user,
  },
});
