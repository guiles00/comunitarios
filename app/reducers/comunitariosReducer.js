import { format } from 'date-fns';
import { _ } from "lodash";

function igual(ob1,obj2){
  return ob1.doppler === obj2.doppler && ob1.doble === obj2.doble && ob1.bidi === obj2.bidi && ob1.consultorio === obj2.consultorio  
}

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
     
      //Se podría hacer con Object.assign?
      const newListadoComunitario = state.listaComunitarios.map ((c)=>{

        if(c._id === action.payload._id) {
      
          const { doppler, doble, bidi, consultorio } = action.payload;

          const newComunitario = {...c,nombre:action.payload.nombre} 
          
          if(!igual(action.payload,newComunitario.estudios[newComunitario.estudios.length - 1]))
            newComunitario.estudios.push({fecha:format(new Date(),"yyyy-MM-dd"),doppler, doble, bidi, consultorio});

          return newComunitario;
        }else{
          return c; 
        }
      }); 
      
      return { listaComunitarios: newListadoComunitario};  

    case "PURGE":
      console.log("purge Comunitarios");
      return initialState;

    default:
      
      return state;
  }
}


export default comunitariosReducer;
