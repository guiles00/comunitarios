import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Registro = function Registro({cantidadEstudios, comunitario, fecha, index}){
    
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
   
  return <div className="card" onClick={handleCardClick}>
    <div className="card-body p-0">
      <div className={["card-header", par && "bg-row"].join(" ")}>
        <span className="text-dark">
       
          {moment(fecha).format("DD/MM/YY")} - <strong>Comunitario:</strong> {comunitario.nombre} - <strong>Prata:</strong>  ${total}
        </span>
      </div>
      {show && tablaEstudios}        
    </div>
  </div>;
};

const PrataComunitario = function PrataComunitario() {

  const [prataComunitario, setPrataComunitario] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get("/api/prataComunitario")
      .then((res)=>{

        setPrataComunitario(res.data.prataComunitarios);
      }).catch(e => console.log(e));
  
    setUpdated(false);
    
  },[updated]);

  return (
    <div className="container-fluid pull-down" id="prataComunitario-component">
      
      <div className="row">             
        <div className="col-sm-1 col-lg-2"></div>
        <div className="col-sm-10 col-lg-8"> 
          <div className="card">
            <div className="card-header"> 
              <h2 className="card-title text-center">
                Listado Prata Comunitarios
              </h2>
              <br></br> 
              <Link to={"/prataComunitario/new"} className="btn btn-primary">Agregar</Link>
            
            </div>
            <div className="card-body p-0">
              {
                prataComunitario.map((p,index)=>{

                  return <Registro index={index} key={p._id} {...p}/>;
                })
              }         
            </div>
            <div className="card-footer">
              <Link to={"/prataComunitario"} className="btn btn-primary">Volver</Link>
            </div>
          </div>
        </div>
        <div className="col-sm-1 col-lg-2"></div>
      </div> 
    </div>
  );
};

export default PrataComunitario;