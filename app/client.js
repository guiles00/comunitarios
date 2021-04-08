import React from "react";
import ReactDOM from "react-dom";
import Application from "./ui/Application";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <Application/>
  </Provider>
  );

ReactDOM.render(jsx, document.getElementById("app"));
