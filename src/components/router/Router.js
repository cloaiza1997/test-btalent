import React from "react";
import { useGlobal } from "reactn";
// Router
import { Route, Switch, Router } from "react-router-dom";
import history from "./History";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Actions
import { action_login } from "../../redux/actions/action_login";
// Class
import ErrorPage from "../error/ErrorPage";
import Home from "../home/Home";
import Login from "../login/Login";

const RouterComponent = (props) => {
  // * Constants
  const [globalState] = useGlobal();
  const dispatch = useDispatch();
  // * Hooks
  // Se obtiene el valor de la sesión
  const login = useSelector(({ reducer_state_login: { login } }) => login);
  // * Actions
  // + Sesión no iniciada
  if (!login) {
    // Se extrae el usuario del localStorage
    let data = globalState.func.getUser();
    // + Usuario logueado | - No logueado
    if (data) {
      // Ejecuta la acción de registro de login
      dispatch(action_login(data));
    } else {
      history.push("/");
    }
  }
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/:url?" component={Home} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
