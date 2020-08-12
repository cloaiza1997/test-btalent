import React, { Component } from "reactn";
import { useGlobal, setGlobal } from 'reactn';

import CircularProgress from '@material-ui/core/CircularProgress';

import $ from "jquery";

import Table from "../../partials/Table";
import { Notify, showNotify } from "../../partials/Notify";

export default class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      db: this.global.func.initDataBase("users"),
      display: true,
      table: [],
    }
  }

  componentDidMount() {
    this.state.db.on("value", snap => {
      let list = [];
      $.each(snap.val(), function (key, element) {
        list.push({
          id: key,
          name: element.name
        });
      });
      
      this.setState({
        table: null
      });
      this.setState({
        table: <Table data={list} deleteItems={this.deleteItems} edit={this.edit}/>,
        display: false,
      });
    });
  }

  deleteItems = (items) => {
    items.map(id => this.state.db.child(id).remove());
    showNotify().success("Usuario(s) eliminado(s) correctamente");
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };  

  edit = (id) => {
    setGlobal({ user_edit_id: id});
    this.props.changeView("edit");
  };
    
  render() {
    return (
    <div className="div-dataTable div-usr-create">
      <div className="flx center">
        <CircularProgress style={ this.state.display ? {} : { display: "none" } }/>
      </div>
      { this.state.table }
      <div className="flx center lbl-hide" style={{ display: "none" }}>
        <img src={ require("./../../../assets/img/scroll.gif") } alt="Scroll" className="w-70x" style={{ transform: "rotate(270deg)" }}/>
        <label>Desliza sobre la tabla para desplazarte lateralmente en su contenido</label>
      </div>
      <Notify />
    </div>
  );
  }
}