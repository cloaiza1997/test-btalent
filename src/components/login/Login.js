import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Actions
import { action_request_login } from "../../redux/actions/action_login";
// Partials
import { Notify } from "../partials/Notify";
import history from "../router/History";
// Material UI
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
// Íconos
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

export default function Login() {
  // * Constants
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  // * Hooks
  const display_load = useSelector(
    ({ reducer_state_login: { login }, reducer_state_load: { display_load } }) => {
      // + Sesión iniciada
      if (login) {
        history.push("/list");
      }
      return display_load;
    }
  );
  // * Functions
  /**
   * Realiza la petición de inicio de sesión
   */
  const login = () => {
    // setDisplay(true);
    let data = {
      user: user,
      pass: pass,
    };
    // Ejecuta la acción de petición de login
    dispatch(action_request_login(data));
  };

  return (
    <div className="login">
      <Notify />
      <div className="flx center">
        <CircularProgress style={display_load ? {} : { display: "none" }} />
        <br />
      </div>
      <div className="logo">
        <img
          src={require("./../../assets/img/search.png")}
          alt="Users"
          className="w-100x"
        />
      </div>
      <h1>Sistema de Gestión de Usuarios</h1>

      <br />
      <div className="flex w-100">
        <PersonIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="text"
          className="input"
          label="Usuario"
          name="id"
          value={user}
          onChange={(user) => setUser(user.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
        <LockIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="password"
          className="input"
          label="Contraseña"
          name="id"
          value={pass}
          onChange={(pass) => setPass(pass.target.value)}
        />
      </div>
      <br />
      <button onClick={login} className="btn-rnd-i" title="Inicia sesión">
        <div>
          <img
            src={require("./../../assets/img/login.png")}
            alt="Google SignIn"
            className="w-30x"
          />
          <span className="p-5x"></span>
          <span>Iniciar Sesión</span>
        </div>
      </button>
      <footer className="login-footer center p-10x">
        &copy; 2020 - Desarrollado por Cristian Loaiza
      </footer>
    </div>
  );
}
