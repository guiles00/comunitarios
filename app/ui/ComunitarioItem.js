import React from "react";
import { useHistory } from "react-router-dom";

const ComunitarioItem = ({_id, nombre, estudios})=>{

  const {doppler, doble, bidi, consultorio} = estudios[estudios.length -1];

  const history = useHistory();

  const handleRowClick = function(id){
    return function(){
      history.push(`/comunitarios/${id}`);
    };
  };

  return (
    <tr onClick={handleRowClick(_id)}>
    <td>{nombre}</td>
    <td>{doppler}</td>
    <td className="only-lg">{bidi}</td>
    <td className="only-lg">{doble}</td>
    <td className="only-lg">{consultorio}</td>
  </tr>
  )
}

export default ComunitarioItem;