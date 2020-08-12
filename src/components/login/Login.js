import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Actions
import { action_request_login } from "../../redux/actions/action_login";
// Componetes
import TextField from "@material-ui/core/TextField";
// Íconos
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

export default function Login() {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  const login = () => {
    let data = {
      user: user,
      pass: pass,
    };
    dispatch(action_request_login(data));
  };

  const data = useSelector((state) => {
    if(state.login) {

    } else {
      
    }
  });

  return (
    <div className="login">
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
