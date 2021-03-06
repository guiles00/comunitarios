import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import InputPrataComunitario from "./InputPrataComunitario";

import { useDispatch, useSelector } from "react-redux";
import { startDeletePrataComunitario } from "../actions/prataComunitariosActions";
import { startFetchComunitarios } from "../actions/comunitariosActions";

const FormularioPrataComunitario = function FormularioPrataComunitario(props) {

  const [prataComunitario, setPrataComunitario] = useState({_id:null,fecha: format(new Date(),"yyyy-MM-dd"),comunitarioId:"",cantidadDoppler:"",
    valorDoppler:0,cantidadBidi:"", valorBidi:0,cantidadDoble:"", valorDoble:0,
    cantidadConsultorio:"",valorConsultorio:0});
  
  const comunitarios = useSelector(state=>state.comunitarios.listaComunitarios);

  const dispatch = useDispatch();

  const bidiRef = useRef(null);
  const dobleRef = useRef(null);
  const consultorioRef = useRef(null);
  
  
  useEffect(() => {

    if( props.match.params.id !== "new")
      axios(`/api/prataComunitario/${props.match.params.id}`)
        .then(res => {
          const {_id, fecha, comunitario: comunitarioId } = res.data;
          const { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio } = res.data.cantidadEstudios;
          
          setPrataComunitario({ 
            _id, fecha, comunitarioId, cantidadDoppler, valorDoppler, cantidadDoble, 
            valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio
          } );

        }).catch(e => { console.log(e); });

  },[]);

  React.useEffect(() => {
    dispatch(startFetchComunitarios());
  },[]);


  const handleSubmit = function(e) {
    e.preventDefault();

    if(prataComunitario._id === null){

      axios({
        method: "post",
        url: "/api/prataComunitario",
        data: prataComunitario
      })
      .then((res)=>{ props.history.push("/prataComunitario");})
      .catch((e)=>{console.log(e) });;
 
    }else{
    
      axios.put(`/api/prataComunitario/${prataComunitario._id}`, prataComunitario)
      .then((res)=>{
        props.history.push("/prataComunitario");
      })
      .catch((e)=>{
        console.log(e)
      })
      
    }

  };

  const handleInputChange = function(e) {
    const { name, value } = e.target;
    setPrataComunitario({ ...prataComunitario, [name]: value });
  };

  const handleChangeComunitario = function(c) {
    const valores = comunitarios.find(element => element._id === c.target.value);

     const { doppler, bidi, doble, consultorio } = valores.estudios[valores.estudios.length - 1];
     
     setPrataComunitario({ ...prataComunitario, "comunitarioId":c.target.value
       ,"valorDoppler": doppler, "valorBidi":bidi,"valorDoble":doble,
      "valorConsultorio":consultorio });
    
  };

  const handleDelete = (e)=>{
    e.preventDefault();

    dispatch(startDeletePrataComunitario(prataComunitario._id));
    props.history.push("/prataComunitario");
  }

  const isDisabled = ()=>{
    let deshabilitar = false;

    if(prataComunitario.comunitarioId === "") deshabilitar = true; 

    return deshabilitar;
  }

  const isDisabledInput = ()=>{
    return (prataComunitario.comunitarioId === "")
  }

  return (
    <div className="container-fluid pull-down ">
      <div className="row justify-content-md-center">
        <div className="col-lg-8 col-sm-12">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="card">
                <div className="card-body justify-content-md-center center_div">
                  <div className="card-header"> 
                    <h2 className="card-title text-center">Agregar Prata Comunitario</h2>
                    
                  </div>
                  <br></br>
                  <div className="form-group row">
                    <label className="col-sm-2">Fecha</label>
                    <input type="date" className="form-control col-sm-10 col-lg-4" name="fecha" value={prataComunitario.fecha} onChange={handleInputChange}></input>
                    <label className="col-sm-2">Comunitario:</label>
                    <select name="comunitario" value={prataComunitario.comunitarioId} onChange={handleChangeComunitario} className="form-control col-sm-10 col-lg-4">
                      <option value="-1">-</option>
                      {comunitarios.map(function(o){return <option key={o._id} value={o._id}> {o.nombre} </option>;})}
                    </select>
                  </div>

                  <InputPrataComunitario  valor={prataComunitario.valorDoppler} cantidad={prataComunitario.cantidadDoppler} 
                    handleInputChange={handleInputChange} name="Doppler" disabled={isDisabledInput()}/>
                  
                  <InputPrataComunitario  valor={prataComunitario.valorBidi} cantidad={prataComunitario.cantidadBidi} 
                    handleInputChange={handleInputChange} name="Bidi" disabled={isDisabledInput()}/>
                  
                  <InputPrataComunitario  valor={prataComunitario.valorDoble} cantidad={prataComunitario.cantidadDoble} 
                    handleInputChange={handleInputChange} name="Doble" disabled={isDisabledInput()}/>
                  
                  <InputPrataComunitario  valor={prataComunitario.valorConsultorio} cantidad={prataComunitario.cantidadConsultorio} 
                    handleInputChange={handleInputChange} name="Consultorio" disabled={isDisabledInput()}/>
                  
                  <div className="form-group row">
                    <span className="col-lg-2 col-sm-6 mt-2">
                      Total hoy:
                    </span>
                    <span className="col-lg-3 col-sm-6 mt-2">
                      $
                    </span>
                  </div>
                </div>

                <div className="card-footer text-muted">
                  <div className="form-group">
                    <button type="submit" className="btn btn-icon btn-primary" disabled={isDisabled()}>
                      Guardar
                    </button> &nbsp;
                    <Link to={"/prataComunitario"} className="btn btn-dark">Volver</Link> &nbsp;&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                  </div>
                </div>
              </div>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPrataComunitario;