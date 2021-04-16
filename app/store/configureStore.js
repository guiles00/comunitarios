import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import prataComunitarios from "../reducers/prataComunitariosReducer";
import comunitarios from "../reducers/comunitariosReducer";
import common from "../reducers/commonReducer";

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  prataComunitarios,
  comunitarios,
  common
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Lo exporto para testing
export const middlewares = [thunk];

//Persist Redux
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }


export default () =>{
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
    );

  let persistor = persistStore(store)
  return { store, persistor }
}
