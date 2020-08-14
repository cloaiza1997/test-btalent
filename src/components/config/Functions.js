import { Component, setGlobal } from "reactn";
import axios from "axios";

export default class Functions extends Component {
  /**
   * Realiza llamadas asíncronas
   * @param {get,post,put,delete} method Método de envío
   * @param {strin} url Url a concatenar con la url principal
   * @param {objet} data Objeto con los datos a enviar a la petición
   * @return {axios}
   */
  axiosFunc(method = "get", url = "", data = {}, headers = {}) {
    return axios({
      method: method,
      url: this.global.url + url,
      data,
      headers
    })
      .then((response) => response)
      .catch((error) => ({ error: error }));
  }
  /**
   * Obtiene el usuario almacenado en el localStorage y lo agrega al estado global
   */
  getUser() {
    let data = localStorage.getItem("data");
    // Si existe el usuario lo parsea y agrega al estado global
    if (data != null) {
      data = JSON.parse(data);
      setGlobal({...data});
    };

    return data;
  }
  /**
   * Valida una cadena de tipo email
   * @param {*} email Email a validar
   * @return {boolean} Validación del email
   */
  validateEmail(email) {
    const pattern = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // Realiza la validacion del patron para el email
    return pattern.test(email.trim());
  }
  /**
   * Valida una cadena de texto
   * @param {*} text Texto a validar
   * @return Texto validado
   */
  validateText(text) {
    text = text.trim();

    if (text === "") {
      text = false;
    }

    return text;
  }
}
