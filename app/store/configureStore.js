import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import prataComunitariosReducer from "../reducers/prataComunitariosReducer";
import comunitariosReducer from "../reducers/comunitariosReducer";

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () =>{
  const store = createStore(
    combineReducers({
      prataComunitarios: prataComunitariosReducer,
      comunitarios: comunitariosReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
    );
  
  return store;
}
