import React from "react";
import ReactDOM from "react-dom";
import { setGlobal } from "reactn";
import * as serviceWorker from "./serviceWorker";
import Router from "./components/router/Router";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Estados globales
import GlobalState from "./components/config/GlobalState";

setGlobal(GlobalState);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
