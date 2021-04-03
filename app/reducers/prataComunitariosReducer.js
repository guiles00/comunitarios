import { FETCH_PRATA_COMUNITARIOS, FETCH_PRATA_COMUNITARIOS_ERROR, FETCH_PRATA_COMUNITARIOS_LOADING} from "../actions/prataComunitariosActions";

const initialState = {
  isLoading: false,
  error:"",
  prataComunitarios: []
}

const prataComunitariosReducer = (state = initialState, action)=>{
  switch(action.type){
    case FETCH_PRATA_COMUNITARIOS:
      
      return {...state, prataComunitarios:action.payload}
    default:
      return state;
  }
}


export default prataComunitariosReducer;
