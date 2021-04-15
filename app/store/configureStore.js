import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import prataComunitarios from "../reducers/prataComunitariosReducer";
import comunitarios from "../reducers/comunitariosReducer";
import common from "../reducers/commonReducer";

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Lo exporto para testing
export const middlewares = [thunk];

export default () =>{
  const store = createStore(
    combineReducers({
      prataComunitarios,
      comunitarios,
      common
    }),
    composeEnhancers(applyMiddleware(thunk))
    );

  return store;
}
