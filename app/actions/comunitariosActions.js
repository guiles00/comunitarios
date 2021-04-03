import axios from "axios";

export const FETCH_COMUNITARIOS = "FETCH_COMUNITARIOS";
export const FETCH_COMUNITARIOS_ERROR = "FETCH_COMUNITARIOS_ERROR";
export const FETCH_COMUNITARIOS_LOADING = "FETCH_COMUNITARIOS_ERROR";

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
      dispatch(fetchComunitarios(res.data.comunitarios))
    }).catch(e => {
      console.log(e)
      fetchComunitariosError();
    });

  }
}

