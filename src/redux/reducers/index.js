import { combineReducers } from "redux";

import reducer_state_load from "./reducer_state_load";
import reducer_state_login from "./reducer_state_login";
import reducer_state_users from "./reducer_state_users";

export default combineReducers({
  reducer_state_load,
  reducer_state_login,
  reducer_state_users,
});