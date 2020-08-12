import * as Types from "../actions/actionTypes";

const initialState = {
  login: false,
  user: {},
  token: "",
};

const reducer_state_login = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN: {
      let data = action.payload;

      return {
        ...state,
        login: data.login,
        user: data.user,
        token: data.token,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer_state_login;
