import { createStore, applyMiddleware } from "redux";
import comunitariosReducer from "../../app/reducers/comunitariosReducer";

import { middlewares } from "../../app/store/configureStore";


export const storeFactory = (initialState)=>{
  const store = createStore(comunitariosReducer,initialState,applyMiddleware(...middlewares));

  return store;
}
