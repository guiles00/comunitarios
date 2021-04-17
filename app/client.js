import React from "react";
import ReactDOM from "react-dom";
import Application from "./ui/Application";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

const VERSION = process.env.VERSION || "1.0.0";

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Application version={VERSION}/>
    </PersistGate>
  </Provider>
  );

ReactDOM.render(jsx, document.getElementById("app"));