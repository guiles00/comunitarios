import moment from "moment";
import { FETCH_COMUNITARIOS, FETCH_COMUNITARIOS_ERROR, FETCH_COMUNITARIOS_LOADING} from "../actions/comunitariosActions";

const initialState = {
  listaComunitarios: []
}

const comunitariosReducer = (state = initialState, action)=>{
  switch(action.type){
    case FETCH_COMUNITARIOS:
      
      return {...state, listaComunitarios:action.payload}
    case FETCH_COMUNITARIOS_ERROR:
      
      return {...state,error:"lo pongo en otro lado y listorti"}
      
    default:
      
      return state;
  }
}


export default comunitariosReducer;
