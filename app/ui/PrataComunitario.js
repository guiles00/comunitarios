import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startFetchPrataComunitarios } from "../actions/prataComunitariosActions";

const PrataComunitario = function PrataComunitario(props) {

  const [prataComunitario, setPrataComunitario] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {

    props.fetchPrataComunitarios();
  
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
                props.prataComunitarios.map((p,index)=>{

                  return <PrataComunitarioItem index={index} key={p._id} {...p}/>;
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

const mapStateToProps = (state)=>{
  return {
    prataComunitarios: state.prataComunitarios.prataComunitarios
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchPrataComunitarios: ()=> dispatch(startFetchPrataComunitarios())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrataComunitario);