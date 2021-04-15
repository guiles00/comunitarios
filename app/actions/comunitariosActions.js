import axios from "axios";
import { setIsLoading,finishIsLoading } from "../actions/commonActions";

export const FETCH_COMUNITARIOS = "FETCH_COMUNITARIOS";
export const FETCH_COMUNITARIOS_ERROR = "FETCH_COMUNITARIOS_ERROR";
export const FETCH_COMUNITARIOS_LOADING = "FETCH_COMUNITARIOS_ERROR";

export const UPDATE_COMUNITARIO = "UPDATE_COMUNITARIO";
export const IS_LOADING_START = "IS_LOADING_START";
export const IS_LOADING_END = "IS_LOADING_END";


export const fetchComunitarios = (comunitarios)=>{
  return {
    type:FETCH_COMUNITARIOS,
    payload: comunitarios
  }
}

export const fetchComunitariosError = ()=>{
  return {
    type:FETCH_COMUNITARIOS_ERROR
  }
}

export const startFetchComunitarios = ()=>{
  return (dispatch)=>{
    axios.get("/api/comunitarios")
    .then((res)=>{
      console.log(res.data.comunitarios)
      dispatch(fetchComunitarios(res.data.comunitarios))
    }).catch(e => {
      console.log(e)
      fetchComunitariosError();
    });
  }
}

export const updateComunitario = (comunitario)=>{
  return {
    type:UPDATE_COMUNITARIO,
    payload: comunitario
  }
}


export const startUpdateComunitarios = (comunitario)=>{
  return (dispatch)=>{
    dispatch(setIsLoading());

    axios.put(`/api/comunitarios/${comunitario._id}`, comunitario)
    .then(() => {  
      dispatch(updateComunitario(comunitario));
      dispatch(finishIsLoading());

    }).catch(e => {
      console.log(e);
      //Aca deberia setear si algun error      
    });
  }
}