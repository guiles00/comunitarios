import axios from "axios";

export const FETCH_PRATA_COMUNITARIOS = "FETCH_PRATA_COMUNITARIOS";
export const FETCH_PRATA_COMUNITARIOS_ERROR = "FETCH_PRATA_COMUNITARIOS_ERROR";
export const FETCH_PRATA_COMUNITARIOS_LOADING = "FETCH_PRATA_COMUNITARIOS_ERROR";

export const fetchPrataComunitarios = (prataComunitarios)=>{
  return {
    type:FETCH_PRATA_COMUNITARIOS,
    payload: prataComunitarios
  }
}

export const fetchPrataComunitariosError = ()=>{
  return {
    type:FETCH_PRATA_COMUNITARIOS_ERROR
  }
}

export const startFetchPrataComunitarios = ()=>{
  return (dispatch)=>{
    axios.get("/api/prataComunitario")
    .then((res)=>{
      dispatch(fetchPrataComunitarios(res.data.prataComunitarios))
    }).catch(e => {
      console.log(e)
      fetchPrataComunitariosError();
    });

  }
}

