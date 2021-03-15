import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registro = function Registro(props){
  
  const [show, setShow] = useState(false);
  
  const handleCardClick = function handleCardClick(){
    setShow(!show);  
  };
  
  const details = props.p.cantidadEstudios.map((e) => { return { tipo:e.tipo,cantidad:e.cantidad,valor:e.valor };});

  return <div className="card" onClick={handleCardClick}>
    <div className="card-body p-0">
      <div className="card-header">
        {props.p.fecha}: {props.p.comunitario.nombre} - $15000
      </div>
      {show? 
        <ul className="list-group list-group-flush ">
          {details.map(e=>{
            return <li key={e.tipo} className="list-group-item">Tipo:{e.tipo} - Cantidad:{e.cantidad} - Valor:${e.valor} -Total:${e.cantidad*e.valor}</li>;
          })}
        </ul>
        :null}        
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

  const handleBuscar = function handleBuscar(){
    console.log("holis");
  }
  return (
    <div className="container-fluid pull-down ">
      
      <div className="row">             
        <div className="col-sm-1 col-lg-2"></div>
        <div className="col-sm-10 col-lg-8">
          <div className="card">
            <div className="card-header"> 
              <h2> 
                Registro diario de ingreso
              </h2> <br></br> 
              <Link to={"/prataComunitario/new"} className="btn btn-primary">Agregar</Link>
            
            </div>
            <div className="card-body p-0">
              {
                prataComunitario.map((p)=>{

                  return <Registro key={p._id} p={p}/>;
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