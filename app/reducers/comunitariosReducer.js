import { FETCH_COMUNITARIOS, FETCH_COMUNITARIOS_ERROR, FETCH_COMUNITARIOS_LOADING} from "../actions/comunitariosActions";

const initialState = {
  isLoading: false,
  error:"",
  comunitarios: []
}

const comunitariosReducer = (state = initialState, action)=>{
  switch(action.type){
    case FETCH_COMUNITARIOS:
      
      return {...state, comunitarios:action.payload}
    default:
      
      return state;
  }
}


export default comunitariosReducer;
