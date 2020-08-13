import Functions from "./Functions";
import { showNotify } from "../../components/partials/Notify";

export default {
  url: "http://ikc.vectorialgroup.com/", // URL API
  func: new Functions(), // Biblioteca de funciones
  showNotify, // Mostrar notificaciones
  login: false,
  token: "",
  user: {}
};