import moment from "moment";
import { startOfMonth, endOfMonth } from 'date-fns'

import { FETCH_PRATA_COMUNITARIOS, SET_START_DATE,SET_END_DATE, FETCH_PRATA_COMUNITARIOS_ERROR, FETCH_PRATA_COMUNITARIOS_LOADING} from "../actions/prataComunitariosActions";

const initialState = {
  startDate: startOfMonth(new Date()),
  endDate: endOfMonth(new Date()),
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
    default:
      return state;
  }
}


export default prataComunitariosReducer;
