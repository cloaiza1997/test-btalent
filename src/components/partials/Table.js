
import React from "react";
import { forwardRef } from "react";
// Table
import MaterialTable from "material-table";
// Components
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// Íconos de la tabla
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
/**
 * Renderiza un data table
 * @param {object} data Listado de objetos
 * @param {function} confirmDelete Función al eliminar un elemento
 */
const Table = ({ data, confirmDelete }) => {
  // Estado con los datos de la tabla
  const [state, setState] = React.useState({
    columns: [
      { title: "Nombre", field: "first_name" },
      { title: "Apellido", field: "last_name" },
      { title: "Email", field: "email" },
      { title: "Compañía", field: "company.name" },
    ],
    data: data,
  });

  return (
    <MaterialTable
      icons={tableIcons}
      title="Listado de Usuarios"
      columns={state.columns}
      data={state.data}
      draggable="false"
      // Traducción
      localization={{
        body: {
          editRow: {
            deleteText: "Confirma eliminar el usuario",
            saveTooltip: "Confirmar",
            cancelTooltip: "Cancelar",
          },
          emptyDataSourceMessage: "No hay registros que coincidan",
          deleteTooltip: "Eliminar",
        },
        header: { actions: "Eliminar" },
        pagination: {
          labelDisplayedRows: "{from}-{to} de {count}",
          labelRowsSelect: "filas",
          labelRowsPerPage: "Filas por página:",
          firstAriaLabel: "Primera",
          firstTooltip: "Primera",
          previousAriaLabel: "Anterior",
          previousTooltip: "Anterior",
          nextAriaLabel: "Siguiente",
          nextTooltip: "Siguiente",
          lastAriaLabel: "Última",
          lastTooltip: "Última",
        },
        toolbar: {
          searchTooltip: "Búscar",
          searchPlaceholder: "Búscar",
        },
      }}
      // Función de eliminar
      actions={[
        (rowData) => ({
          icon: tableIcons.Delete,
          tooltip: "Eliminar Usuario",
          onClick: (event, rowData) => {
            confirmDelete(rowData);
          },
          disabled: rowData.birthYear < 2000,
        }),
      ]}
      // Enviar al final la columna de la acción
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default Table;
