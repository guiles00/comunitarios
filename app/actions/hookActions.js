import axios from "axios";

export const getComunitarios = (setComunitarios)=>{
  
  axios.get("/api/comunitarios")
      .then((res)=>{
        setComunitarios(res.data.comunitarios);
       }).catch(e => console.log(e));
  }

export default {
  getComunitarios
}