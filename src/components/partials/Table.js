// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Tooltip from "@material-ui/core/Tooltip";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import EditIcon from "@material-ui/icons/Edit";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import LastPageIcon from "@material-ui/icons/LastPage";

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: "first_name", numeric: false, disablePadding: true, label: "Nombre" },
//   { id: "last_name", numeric: false, disablePadding: true, label: "Apellido" },
//   { id: "email", numeric: false, disablePadding: true, label: "Email" },
//   { id: "company", numeric: false, disablePadding: true, label: "Compañía" },
// ];

// function EnhancedTableHead(props) {
//   const {
//     classes,
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           {/* <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ "aria-label": "select all desserts" }}
//           /> */}
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             padding="none"
//             align="center"
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//         <TableCell align="center" padding="none">
//           Eliminar
//         </TableCell>
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       // className={clsx(classes.root, {
//       //   [classes.highlight]: numSelected > 0,
//       // })}
//     >
//       {/* {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} Fila(s) Seleccionada(s)
//         </Typography>
//       ) : ( */}
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Listado de Usuarios
//         </Typography>

//       {/* )} */}

//       {/* {numSelected > 0 ? (
//         <Tooltip
//           title="Eliminar Registro(s) Seleccionado(s)"
//           onClick={() => props.deleteItems(props.list)}
//         >
//           <IconButton aria-label="delete" className="c-gray">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         ""
//       )} */}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   paper: {
//     width: "100%",
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//     "& *": {
//       color: "white",
//     },
//     width: "100% !important",
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
// }));

// export default function EnhancedTable(props) {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("id");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const [rows, setRows] = React.useState(props.data);

//   // console.log(rows);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id_row) => {
//     const selectedIndex = selected.indexOf(id_row);

//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id_row);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar
//           numSelected={selected.length}
//           list={selected}
//           deleteItems={props.deleteItems}
//         />
//         <TableContainer>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={"small"}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.id);
//                   const labelId = `enhanced-table-checkbox-${index}`;
//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.id}
//                       selected={isItemSelected}
//                       className="row-tbl"
//                     >
//                       <TableCell padding="checkbox">
//                         {/* <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ "aria-labelledby": labelId }}
//                         /> */}
//                       </TableCell>
//                       <TableCell component="th" scope="row" padding="none">
//                         {row.first_name}
//                       </TableCell>
//                       <TableCell component="th" scope="row" padding="none">
//                         {row.last_name}
//                       </TableCell>
//                       <TableCell component="th" scope="row" padding="none">
//                         {row.email}
//                       </TableCell>
//                       <TableCell component="th" scope="row" padding="none">
//                         {row.company.name}
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         scope="row"
//                         padding="none"
//                         align="center"
//                       >
//                         <Button onClick={() => props.deleteItems(row.id)}>
//                           <DeleteIcon />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 20, { label: "All", value: -1 }]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//           labelRowsPerPage="Filas por Página"
//           backIconButtonText="Página Anterior"
//           nextIconButtonText="Siguinte Página"
//           labelDisplayedRows={({ from, to, count }) =>
//             `${from}-${to} de ${count} Fila(s)`
//           }
//           className="pagination"
//           ActionsComponent={TablePaginationActions}
//         />
//       </Paper>
//     </div>
//   );
// }

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(2.5),
//   },
// }));

// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";

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

const Table = ({ data, confirmDelete }) => {
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
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default Table;
