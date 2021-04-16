import React from "react";
import ReactDOM from "react-dom";
import Application from "./ui/Application";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();
console.log(store)
const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Application/>
    </PersistGate>
  </Provider>
  );

ReactDOM.render(jsx, document.getElementById("app"));