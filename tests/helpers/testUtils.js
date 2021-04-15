import { createStore, applyMiddleware, combineReducers } from "redux";
import comunitarios from "../../app/reducers/comunitariosReducer";
import prataComunitarios from "../../app/reducers/prataComunitariosReducer";
import common from "../../app/reducers/commonReducer";

import { middlewares } from "../../app/store/configureStore";


export const storeFactory = (initialState)=>{
  const store = createStore(combineReducers({
    comunitarios,
    prataComunitarios,
    common
  }),
    initialState,applyMiddleware(...middlewares));

  return store;
}
