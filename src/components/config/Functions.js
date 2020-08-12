import { Component, setGlobal } from "reactn";
import axios from "axios";

export default class Function extends Component {
  /**
   * Realiza llamadas asíncronas
   * @param {get,post,put,delete} method Método de envío
   * @param {strin} url Url a concatenar con la url principal
   * @param {objet} data Objeto con los datos a enviar a la petición
   * @return {axios}
   */
  axiosFunc(method = "get", url = "", data = {}) {
    return axios({
      method: method,
      url: this.global.url + url,
      data: data,
    })
      .then((response) => response)
      .catch((error) => ({ error: error }));
  }

  /**
   * Calcula la fecha del día actual
   * @return {string} date Fecha en formado YYYY-MM-DD
   */
  getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day}`;
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
