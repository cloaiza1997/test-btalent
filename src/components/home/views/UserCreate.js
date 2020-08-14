import React, { useState } from "react";
import { useGlobal } from "reactn";
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import {
  action_get_local_users,
  action_set_local_users,
  action_request_save,
} from "../../../redux/actions/action_users";
// class
import { Notify, showNotify } from "../../partials/Notify";
import Confirm from "./../../partials/Confirm";
// Components
import { makeStyles } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

export default function UserCreate() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [globalState] = useGlobal();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const users_local = useSelector(
    ({ reducer_state_users: { users_local } }) => users_local
  );
  // * Hooks
  useEffect(() => {
    // Extracción del estado de usuarios
    dispatch(action_get_local_users());
  }, []);
  // * Functions
  /**
   * Creación del usuario en el API
   */
  const addUser = () => {
    let data = {
      first_name,
      last_name,
      email,
      company,
    };
    // Actualiza el estado con los nuevos datos
    dispatch(action_request_save(data));
  };
  /**
   * Agrega un usuario en el local storage
   */
  const addUserLocal = () => {
    // Obtiene el arreglo de usuarios
    let users = users_local;
    // + Vacío: Se inicializa
    if (users == null) {
      users = [];
    }
    // Consecutivo para el id
    let cant = users.length;

    let data = {
      id: "user_" + (cant + 1),
      first_name,
      last_name,
      email,
      company: {
        name: company,
      },
    };
    // Agrega el usuario al arreglo del local storage
    users.push(data);
    // Actualiza el estado con los nuevos datos
    dispatch(action_set_local_users(users));

    showNotify().success("Usuario creado correctamente");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  /**
   * Abre una ventana modal
   */
  const openModal = () => {
    // Extracción de métodos de validación de datos
    const validateEmail = globalState.func.validateEmail;
    const validateText = globalState.func.validateText;
    // + Datos correctos | - Datos incorrectos
    if (
      validateText(first_name) &&
      validateText(last_name) &&
      company &&
      validateEmail(email)
    ) {
      setOpen(true);
    } else {
      showNotify().error(
        "Por favor diligenciar todos los campos correctamente"
      );
    }
  };

  return (
    <div className="flx div-usr-create">
      <div>
        <img
          src={require("./../../../assets/img/user_1.png")}
          alt="Usuario"
          className="w-50x"
        />
        <img
          src={require("./../../../assets/img/user_3.png")}
          alt="Usuario"
          className="w-50x"
        />
        <img
          src={require("./../../../assets/img/user_2.png")}
          alt="Usuario"
          className="w-50x"
        />
      </div>
      <h2>Creación de Usuario</h2>
      <br />
      <div className="flex w-100">
        <PermIdentityTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="text"
          className="input"
          label="Nombre"
          name="first_name"
          value={first_name}
          onChange={(first_name) => setFirstName(first_name.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
        <PermIdentityTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="text"
          className="input"
          label="Apellido"
          name="last_name"
          value={last_name}
          onChange={(last_name) => setLastName(last_name.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
        <EmailTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="email"
          className="input"
          label="Correo Electrónico"
          name="email"
          value={email}
          onChange={(email) => setEmail(email.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
        {/* <BusinessIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="text"
          className="input"
          label="Companía"
          name="company"
          value={company}
          onChange={(company) => setCompany(company.target.value)}
        /> */}
        <BusinessIcon className="f-2_5r" />
        <FormControl
          variant="outlined"
          className={(classes.formControl, "input")}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Compañía
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={company}
            onChange={(company) => setCompany(company.target.value)}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={1}>Providencia</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
      <button onClick={openModal} className="btn-rnd-i" title="Crear Usuario">
        <div>
          <img
            src={require("./../../../assets/img/save.png")}
            alt="Save"
            className="w-30x"
          />
          <span className="p-5x"></span>
          <span>Guardar Usuario</span>
        </div>
      </button>

      <Notify />
      <Confirm
        open={open}
        setOpen={setOpen}
        action={addUser}
        message="¿Confirma la creación del usuario?"
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));