import React, { useState } from "react";
import { useGlobal } from "reactn";
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Class
import { Notify } from "../../partials/Notify";
import Confirm from "./../../partials/Confirm";
import Table from "../../partials/Table";
// Components
import CircularProgress from "@material-ui/core/CircularProgress";
// Actions
import {
  action_request_list,
  action_request_delete,
  action_get_local_users,
  action_set_local_users,
  action_clean_list,
} from "../../../redux/actions/action_users";

import $ from "jquery";

const UserList = () => {
  const [globalState] = useGlobal();
  const [id_delete, setIdDelete] = useState(0); // Id de usuario a eliminar
  const [open, setOpen] = useState(false); // Controla el modal de confirmación
  const dispatch = useDispatch();
  const display_load = useSelector(
    ({ reducer_state_load: { display_load } }) => display_load
  ); // Controla el load
  /**
   * Muestra la ventana de confirmación de eliminación
   * @param {object} user Usuario a eliminar
   */
  const confirmDelete = (user) => {
    setOpen(true); // Abre el modal
    setIdDelete(user.id); // Agrega el id al estado
  };

  const users_local = useSelector(
    ({ reducer_state_users: { users_local } }) => users_local
  );
  /**
   * Elimina un usuario en base al id
   */
  const deleteUser = () => {
    // Validación del id
    let local = /user_/.test(id_delete);
    // + Se identifica que es un usuario del local storage | - Se elimina de la API
    if (local) {
      // Se crea un nuevo arrego
      let new_users_local = [];
      // Se recorre el arrego actual
      users_local.forEach((user) => {
        // Se añaden al nuevo arreglo los elementos que no coincidan con el id
        if (user.id !== id_delete) {
          new_users_local.push(user);
        }
      });
      // Se actualiza el estado
      dispatch(action_set_local_users(new_users_local));

      globalState.showNotify().success("Usuario eliminado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      let data = {
        user_id: id_delete,
      };

      dispatch(action_request_delete(data));
    }
  };
  // Extracción del componente con la lista de usuarios
  const table = useSelector(({ reducer_state_users: { users } }) => {
    // + El objeto está lleno se retorna el componente Table, se pasa la función de confirmación
    let table = !$.isEmptyObject(users) ? (
      <Table data={users} confirmDelete={confirmDelete} />
    ) : (
      ""
    );
    return table;
  });
  /**
   * Se consultan los datos de la API
   */
  useEffect(() => {
    // Se limpia la lista
    dispatch(action_clean_list());
    // Se pasan los usuarios locales al estado
    dispatch(action_get_local_users());
    // Se consulta la lista
    dispatch(action_request_list(globalState));
  }, []);

  return (
    <div className="div-dataTable div-usr-create">
      <div className="flx center">
        <br />
        <CircularProgress style={display_load ? {} : { display: "none" }} />
        <br />
      </div>
      {table}
      <div style={{ height: 10 }}></div>
      <div className="flx center lbl-hide" style={{ display: "none" }}>
        <img
          src={require("./../../../assets/img/scroll.gif")}
          alt="Scroll"
          className="w-70x"
          style={{ transform: "rotate(270deg)" }}
        />
        <label>
          Desliza sobre la tabla para desplazarte lateralmente en su contenido
        </label>
      </div>
      <div style={{ height: 10 }}></div>
      <Notify />
      <Confirm
        open={open}
        setOpen={setOpen}
        action={deleteUser}
        message="¿Confirma eliminar usuario?"
      />
    </div>
  );
};

export default UserList;
