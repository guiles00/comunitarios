import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Registro = function Registro(props){
  
  const [show, setShow] = useState(false);
  
  const handleCardClick = function handleCardClick(){
    setShow(!show);  
  };
  
  const details = props.p.cantidadEstudios.map((e) => { return { tipo:e.tipo,cantidad:e.cantidad,valor:e.valor };});
  
  const theader = details.map( (e,i)=>{
    return <th key={i}>{e.tipo}</th>;
  });
  const trs = details.map( (e,i)=>{
    return <td key={i}>{e.cantidad}</td>; 
  });

  const tablaEstudios = (
    <table className="table">
      <thead>
        <tr>{theader}</tr>
      </thead>
      <tbody>
        <tr>{trs}</tr>
      </tbody>
    </table>);

  const par = (props.index % 2 === 0);
  
  return <div className="card" onClick={handleCardClick}>
    <div className="card-body p-0">
      <div className={["card-header", par && "bg-row"].join(" ")}>
        <span className="text-dark">
       
          {moment(props.p.fecha).format("DD/MM/YY")} - <strong>Comunitario:</strong> {props.p.comunitario.nombre} - <strong>Prata:</strong>  $15000
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
    <div className="container-fluid pull-down ">
      
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

                  return <Registro index={index} key={p._id} p={p}/>;
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