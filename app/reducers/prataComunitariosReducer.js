import { format, startOfMonth, endOfMonth } from 'date-fns'

import { FETCH_PRATA_COMUNITARIOS, SET_START_DATE,SET_END_DATE, 
  DELETE_PRATA_COMUNITARIO, FETCH_PRATA_COMUNITARIOS_ERROR, FETCH_PRATA_COMUNITARIOS_LOADING} from "../actions/prataComunitariosActions";

const initialState = {
  startDate: format(startOfMonth(new Date()),"yyyy-MM-dd"),
  endDate: format(endOfMonth(new Date()),"yyyy-MM-dd"),
  listadoPrataComunitarios: []
}

const prataComunitariosReducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_START_DATE:
   
      return {...state, startDate: action.payload}
    case SET_END_DATE:
     
      return {...state, endDate: action.payload}
    case FETCH_PRATA_COMUNITARIOS:
      
      return {...state, listadoPrataComunitarios:action.payload}
    case DELETE_PRATA_COMUNITARIO:
      
      const newListado = state.listadoPrataComunitarios.filter((pc)=>{
        return pc._id !== action.payload;
      });
      const newState = {...state,listadoPrataComunitarios: newListado};
      
      return newState; 
    
    case "PURGE":
      console.log("purge paraComunitarios");
        return initialState;
  
    default:
      return state;
  }
}

export default prataComunitariosReducer;
