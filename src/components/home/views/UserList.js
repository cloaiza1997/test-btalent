import React, { useState } from "react";
import { useGlobal, setGlobal } from "reactn";

import CircularProgress from "@material-ui/core/CircularProgress";

import $ from "jquery";

import Table from "../../partials/Table";
import { Notify, showNotify } from "../../partials/Notify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { action_request_list, action_request_delete } from "../../../redux/actions/action_users";

const UserList = () => {
  const display_load = useSelector(
    ({ reducer_state_load: { display_load } }) => display_load
  );
  const [globalState] = useGlobal();
  const dispatch = useDispatch();

  const deleteItems = (id) => {
    console.log(id);
    let data = {
      user_id: id,
    };
    dispatch(action_request_delete(data));
    // items.map((id) => this.state.db.child(id).remove());
    // showNotify().success("Usuario(s) eliminado(s) correctamente");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const edit = (id) => {
    setGlobal({ user_edit_id: id });
    this.props.changeView("edit");
  };

  // Extracción del componente con la lista de usuarios
  const table = useSelector(({ reducer_state_users: { users } }) => {
    let list = [];
    // De estado se obtiene la lista y esta se recorre para convertir en arreglo
    // $.each(users, function (key, element) {
    //   list.push(element);
    // });
    console.log(users);
    let table = !$.isEmptyObject(users) ? <Table data={users} deleteItems={deleteItems} /> : "";

    return table;
  });

  useEffect(() => {
    dispatch(action_request_list(globalState));
  }, []);

  //   constructor(props) {
  //   super(props);
  //   this.state = {
  //     db: this.global.func.initDataBase("users"),
  //     display: true,
  //     table: [],
  //   }
  // }

  // componentDidMount() {
  //   this.state.db.on("value", snap => {
  //     let list = [];
  //     $.each(snap.val(), function (key, element) {
  //       list.push({
  //         id: key,
  //         name: element.name
  //       });
  //     });

  //     this.setState({
  //       table: null
  //     });
  //     this.setState({
  //       table: <Table data={list} deleteItems={this.deleteItems} edit={this.edit}/>,
  //       display: false,
  //     });
  //   });
  // }

  return (
    <div className="div-dataTable div-usr-create">
      <div className="flx center">
        <br />
        <CircularProgress style={display_load ? {} : { display: "none" }} />
        <br />
      </div>
      {table}
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
      <Notify />
    </div>
  );
};

export default UserList;
