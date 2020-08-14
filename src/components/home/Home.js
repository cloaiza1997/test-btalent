import React from "react";
import { useGlobal } from "reactn";
import $ from "jquery";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Actions
import { action_login } from "../../redux/actions/action_login";
// Class
import ErrorPage from "../error/ErrorPage";
import Profile from "./views/Profile";
import UserCreate from "./views/UserCreate";
import UserList from "./views/UserList";
// Components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import PowerSettingsNewTwoToneIcon from "@material-ui/icons/PowerSettingsNewTwoTone";
/**
 * Vista principal
 * @param {*} url Extrae de las props la url digitada
 */
export default function Home({
  match: {
    params: { url },
  },
}) {
  // * Constants
  const [globalState, setGlobalState] = useGlobal(); // Estado global
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(({ reducer_state_login: { user } }) => user);
  // * Theme Functions
  const handleDrawerOpen = () => {
    setOpen(true);
    $("#sign").show();
  };
  const handleDrawerClose = () => {
    setOpen(false);
    $("#sign").hide();
  };
  // * Functions
  /**
   * Actualiza el componente a mostrar
   */
  const renderSection = () => {
    let component_view = "";
    switch (url) {
      case "create":
        component_view = <UserCreate />;
        break;
      case "list":
        component_view = <UserList />;
        break;
      case "profile":
        component_view = <Profile user={user} />;
        break;
      default:
        component_view = <ErrorPage />;
        break;
    }
    return component_view;
  };
  /**
   * Cierre de sesión
   */
  const logout = () => {
    setGlobalState({ user: null }); // Borra el estado global
    localStorage.removeItem("data"); // Elimina el usuario del local storage
    dispatch(action_login({ login: false, token: "", user: {} })); // Borra los datos del estate
  };
  // Render
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            title="Abrir Menú"
          >
            <MenuIcon />
          </IconButton>
          <div className="toolbar">
            {/* Título y botón de cierre de sesión */}
            <Typography variant="h6" noWrap>
              Gestión de Usuarios
            </Typography>
            <IconButton onClick={logout} title="Cerrar Sesión">
              <PowerSettingsNewTwoToneIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/* Cabecera navegación */}
        <div className={classes.toolbar}>
          <div className="div-logo">
            <a
              href="https://btalentconsultores.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="o-7x"
              title="Ir a la página de BTalent Consultores"
            >
              <img
                className="w-50x"
                src={require("../../assets/img/logo-small.png")}
                alt="BTalent"
              />
            </a>
            <span className="p-5x"></span>
            <h5 className="m-0x">BTalent - Vectorial</h5>
          </div>
          <IconButton onClick={handleDrawerClose} title="Minimizar Menú">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* Listado de opciones */}
        <List>
          <Link to="profile">
            <ListItem button title="Mi Perfil">
              <ListItemIcon>
                <div
                  className="nav-user-img"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                ></div>
              </ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary={user.name} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="create">
            <ListItem button title="Crear un Usuario">
              <ListItemIcon>
                <PersonAddTwoToneIcon className="f-2_5r" />
              </ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary="Crear Usuario" />
            </ListItem>
          </Link>

          <Link to="list">
            <ListItem button title="Ver Listado de Usuario">
              <ListItemIcon>
                <PeopleAltTwoToneIcon className="f-2_5r" />
              </ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary="Listar Usuarios" />
            </ListItem>
          </Link>
        </List>
        <footer className="footer center p-10x">
          <div>
            <span id="sign" hidden={true}>
              Desarrollado por Cristian Loaiza
            </span>
            <span>&copy; 2020</span>
          </div>
        </footer>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderSection()}
      </main>
    </div>
  );
}
// Estilos para el dashboard
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerWidth: {
    width: 58
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
