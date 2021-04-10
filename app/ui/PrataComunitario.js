import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startFetchPrataComunitarios, setStartDate, setEndDate } from "../actions/prataComunitariosActions";
import  getVisiblePrataComunitario  from "../selectors/prataComunitarios";

import PrataComunitarioItem from "./PrataComunitarioItem";

import { format } from 'date-fns';

const PrataComunitario = function PrataComunitario(props) {

  const [updated, setUpdated] = useState(false);

  useEffect(() => {

    props.fetchPrataComunitarios();
  
    setUpdated(false);
    
  },[updated]);
  
  const handleStartDateChange = (e)=>{

    props.setStartDate(new Date(e.target.value+"T00:00:00"))     
  }
  const handleEndDateChange = (e)=>{

    props.setEndDate(new Date(e.target.value+"T00:00:00"))     
  }

  return (
    <div className="container-fluid" id="prataComunitario-component">
      
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
              <br></br><br></br> 
              <div className="row">
                <div className="col-lg-4">
                  <input className="form-control" type="date" value={format(props.startDate,"yyyy-MM-dd")} onChange={handleStartDateChange} ></input>
                </div>
                <div className="col-lg-4">
                  <input className="form-control" type="date" value={format(new Date(props.endDate),"yyyy-MM-dd")} onChange={handleEndDateChange}></input>
                </div>
                
                </div>
              
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

const mapStateToProps = (state, props)=>{
  return {
    prataComunitarios: getVisiblePrataComunitario(state.prataComunitarios.listadoPrataComunitarios,state.prataComunitarios.startDate,state.prataComunitarios.endDate),
    startDate: state.prataComunitarios.startDate,
    endDate: state.prataComunitarios.endDate
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchPrataComunitarios: ()=> dispatch(startFetchPrataComunitarios()),
    setStartDate: (startDate)=> dispatch(setStartDate(startDate)),
    setEndDate: (endDate)=> dispatch(setEndDate(endDate))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrataComunitario);