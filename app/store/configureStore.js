import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import prataComunitariosReducer from "../reducers/prataComunitariosReducer";
import comunitariosReducer from "../reducers/comunitariosReducer";
import commonReducer from "../reducers/commonReducer";

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Lo exporto para testing
export const middlewares = [thunk];


export default () =>{
  const store = createStore(
    combineReducers({
      prataComunitarios: prataComunitariosReducer,
      comunitarios: comunitariosReducer,
      common: commonReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    );

  return store;
}
