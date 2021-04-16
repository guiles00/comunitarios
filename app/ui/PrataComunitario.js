import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startFetchPrataComunitarios, setStartDate, setEndDate } from "../actions/prataComunitariosActions";
import  getVisiblePrataComunitario  from "../selectors/prataComunitarios";

import PrataComunitarioItem from "./PrataComunitarioItem";

import { format } from 'date-fns';

const PrataComunitario = function PrataComunitario(props) {

  const [updated, setUpdated] = useState(false);
  const startDate = useSelector(state => state.prataComunitarios.startDate);
  const endDate = useSelector(state => state.prataComunitarios.endDate);  
  const listadoPrataComunitarios = useSelector(state => getVisiblePrataComunitario(state.prataComunitarios.listadoPrataComunitarios,startDate,endDate));
  const dispatch = useDispatch()  
  
  useEffect(() => {

    dispatch(startFetchPrataComunitarios());  
    setUpdated(false);
    
  },[updated]);
  
  const handleStartDateChange = (e)=>{
    dispatch(setStartDate(e.target.value) )
  }
  const handleEndDateChange = (e)=>{

    dispatch(setEndDate(e.target.value) );
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
                  <input className="form-control" type="date" value={format(new Date(startDate+"T00:00:00"),"yyyy-MM-dd")} onChange={handleStartDateChange} ></input>
                </div>
                <div className="col-lg-4">
                  <input className="form-control" type="date" value={format(new Date(endDate+"T00:00:00"),"yyyy-MM-dd")} onChange={handleEndDateChange}></input>
                </div>
                
                </div>
              
            </div>
            <div className="card-body p-0">
              {
                listadoPrataComunitarios.map((p,index)=>{

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

export default PrataComunitario;