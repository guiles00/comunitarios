import axios from "axios";
import { fetchComunitariosError} from "./comunitariosActions";

export const FETCH_PRATA_COMUNITARIOS = "FETCH_PRATA_COMUNITARIOS";
export const FETCH_PRATA_COMUNITARIOS_ERROR = "FETCH_PRATA_COMUNITARIOS_ERROR";
export const FETCH_PRATA_COMUNITARIOS_LOADING = "FETCH_PRATA_COMUNITARIOS_ERROR";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";

export const DELETE_PRATA_COMUNITARIO = "DELETE_PRATA_COMUNITARIO";

export const setStartDate = (startDate) =>{
  return {
    type: SET_START_DATE,
    payload: startDate
  }
}

export const setEndDate = (endDate) =>{
  return {
    type: SET_END_DATE,
    payload: endDate
  }
}

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

export const deletePrataComunitario = (id)=>{
  return {
    type: DELETE_PRATA_COMUNITARIO,
    payload: id
  }
} 

export const startDeletePrataComunitario = (id)=>{
  return (dispatch) => {
    axios.delete(`/api/prataComunitario/${id}`)
    .then(()=>{
      
     // dispatch(deletePrataComunitario(id));
    }).catch(e=>{
      console.log(e);
    })
  }
}