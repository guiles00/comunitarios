import moment from "moment";
import { FETCH_COMUNITARIOS, FETCH_COMUNITARIOS_ERROR, 
  UPDATE_COMUNITARIO } from "../actions/comunitariosActions";

const initialState = {
  listaComunitarios: []
}

const comunitariosReducer = (state = initialState, action)=>{
  switch(action.type){
    case FETCH_COMUNITARIOS:
      
      return {...state, listaComunitarios:action.payload}
    case FETCH_COMUNITARIOS_ERROR:
      
      return {...state,error:"lo pongo en otro lado y listorti"}
    
    case UPDATE_COMUNITARIO:
      
      const newListadoComunitario = state.listaComunitarios.map ((c)=>{

        if(c._id === action.payload._id) {
          return {...c,...action.payload}
        }else{
          return c; 
        }
      }); 

      console.log(newListadoComunitario)
      return { listaComunitarios: newListadoComunitario};  

    default:
      
      return state;
  }
}


export default comunitariosReducer;
