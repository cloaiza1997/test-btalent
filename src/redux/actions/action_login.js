import * as Types from "./actionTypes";
// Estado global
import global_state from "../../components/config/GlobalState";

export const action_request_login = (data) => (dispatch) => {
  return global_state.func
    .axiosFunc("POST", "test_users_login", data)
    .then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
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
        dispatch(action_login(data));
      }
    });
};

export const action_login = (data) => ({
  type: Types.LOGIN,
  payload: {
    login: data.login,
    token: data.token,
    user: data.user
  },
});
