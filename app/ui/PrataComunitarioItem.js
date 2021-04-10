import React, { useState } from "react";
import { Link } from "react-router-dom";

import { format } from 'date-fns';

const PrataComunitarioItem = function PrataComunitarioItem({_id,cantidadEstudios, comunitario, fecha, index}){
    
  const [show, setShow] = useState(false);
  const { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio } = cantidadEstudios; 
  
  const handleClick = function handleClick(){
    setShow(!show);  
  };
  
  const tablaEstudios = (
    <table className="table">
      <thead>
        <tr>
          <th>Doppler</th>
          <th>Doble</th>
          <th>Bidi</th>
          <th>Consultorio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>{cantidadDoppler}</td>
        <td>{cantidadDoble}</td>
        <td>{cantidadBidi}</td>
        <td>{cantidadConsultorio}</td>
        </tr>
      </tbody>
    </table>);

  const par = (index % 2 === 0);
  
    
  const total = (cantidadDoppler * valorDoppler) + (cantidadDoble * valorDoble) 
    + (cantidadBidi * valorBidi) + (cantidadConsultorio * valorConsultorio);
   
  const Encabezado = (
    <div className="row no-gutters">
      <div className="col-4" onClick={handleClick}>{format(new Date(fecha+"T00:00:00"),"dd/MM/yyyy")}</div>
      <div className="col-3" onClick={handleClick}>{comunitario.nombre}</div>
      <div className="col-3" onClick={handleClick}>${total}</div>
      <div className="col-2"><Link to={`/prataComunitario/${_id}`} className="btn btn-primary">Editar</Link></div>
    </div>);

  return <div className="card" >
    <div className="card-body p-0">
      <div className={["card-header", par && "bg-row"].join(" ")}>
        {Encabezado}
      </div>
      {show && tablaEstudios}        
    </div>
  </div>;
};

export default PrataComunitarioItem;