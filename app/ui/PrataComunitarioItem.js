import React, { useState } from "react";
import { Link } from "react-router-dom";

import { format } from 'date-fns';

const PrataComunitarioItem = function PrataComunitarioItem({_id,cantidadEstudios, comunitario, fecha, index}){
    
  const [show, setShow] = useState(false);
  const { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi } = cantidadEstudios; 
  
  const handleCardClick = function handleCardClick(){
    setShow(!show);  
  };
  
  const tablaEstudios = (
    <table className="table">
      <thead>
        <tr>
          <th>Doppler</th>
          <th>Doble</th>
          <th>Bidi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>{cantidadDoppler}</td>
        <td>{cantidadDoble}</td>
        <td>{cantidadBidi}</td>
        </tr>
      </tbody>
    </table>);

  const par = (index % 2 === 0);
  
    
  const total = (cantidadDoppler * valorDoppler) + (cantidadDoble * valorDoble) + (cantidadBidi * valorBidi);
   
  return <div className="card" >
    <div className="card-body p-0">
      <div className={["card-header", par && "bg-row"].join(" ")}>
        <span className="text-dark" onClick={handleCardClick}>
          {format(new Date(fecha+"T00:00:00"),"dd/MM/yyyy")} - <strong>Comunitario:</strong> {comunitario.nombre} - <strong>Prata:</strong>  ${total}
        </span>&nbsp;
        <Link to={`/prataComunitario/${_id}`} className="btn btn-secondary">Editar</Link>
      </div>
      {show && tablaEstudios}        
    </div>
  </div>;
};


export default PrataComunitarioItem;