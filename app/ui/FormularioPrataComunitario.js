import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../history";

const FormularioPrataComunitario = function FormularioPrataComunitario() {

  const [prataComunitario, setPrataComunitario] = useState({fecha:"",comunitarioId:"",cantidadDoppler:"",
    valorDoppler:0,cantidadBidi:"", valorBidi:0,cantidadDoble:"", valorDoble:0});
  const [total, setTotal] = useState({doppler:0,bidi:0,doble:0,total:0});
  const [comunitarios, setComunitarios] = useState([]);
  const bidiRef = useRef(null);
  const dobleRef = useRef(null);
  
  useEffect(() =>{
    axios("/api/comunitarios")
      .then(res => setComunitarios(res.data.comunitarios))
      .catch(e => {
        console.log(e);
      });
  },[]);

  const handleSubmit = function(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "/api/prataComunitario",
      data: prataComunitario
    });
    history.push("/prataComunitario");
  };

  const handleInputChange = function(e) {
    const { name, value } = e.target;
    setPrataComunitario({ ...prataComunitario, [name]: value });
  };

  const handleOnBlurDoppler = function(){

    bidiRef.current.focus();
    setTotal({...total, "doppler":(prataComunitario.valorDoppler*prataComunitario.cantidadDoppler)});
  };

  const handleOnBlurBidi = function(){
    dobleRef.current.focus();
    setTotal({...total, "bidi":(prataComunitario.valorBidi*prataComunitario.cantidadBidi)});
  };

  const handleOnBlurDoble = function(){
    setTotal({...total, "doble":(prataComunitario.valorDoble*prataComunitario.cantidadDoble)});
  };

  const handleChangeComunitario = function(c) {

    const valores = comunitarios.find(element => element._id === c.target.value);

    const doppler = valores.estudios.find(element => element.tipo === "doppler" );
    const valorDoppler = (typeof doppler === "undefined")?0:doppler.valor;

    const bidi = valores.estudios.find(element => element.tipo === "BIDI" );
    const valorBidi = (typeof bidi === "undefined")?0:bidi.valor;

    const doble = valores.estudios.find(element => element.tipo === "doble" );
    const valorDoble = (typeof doble === "undefined")?0:doble.valor;

    setPrataComunitario({ ...prataComunitario, "comunitarioId":c.target.value,"valorDoppler": valorDoppler, "valorBidi":valorBidi,"valorDoble":valorDoble });
  };
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
                    <hr/>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2">Fecha</label>
                    <input type="date" className="form-control col-sm-10 col-lg-4" name="fecha" value={prataComunitario.fecha} onChange={handleInputChange}></input>
                    <label className="col-sm-2">Comunitario:</label>
                    <select name="comunitario" onChange={handleChangeComunitario} className="form-control col-sm-10 col-lg-4">
                      <option value="-1">-</option>
                      {comunitarios.map(function(o){return <option key={o._id} value={o._id}> {o.nombre} </option>;})}
                    </select>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                      Doppler (${prataComunitario.valorDoppler}):
                    </div>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadDoppler" value={prataComunitario.cantidadDoppler} onChange={handleInputChange} onBlur={handleOnBlurDoppler}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalDoppler" value={total.doppler} readOnly></input>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                     BIDI (${prataComunitario.valorBidi}):
                    </div>
                    <input ref={bidiRef} type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadBidi" value={prataComunitario.cantidadBidi} onChange={handleInputChange}
                      onBlur={handleOnBlurBidi}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalBidi" value={total.bidi} readOnly></input>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                     Doble (${prataComunitario.valorDoble}):
                    </div>
                    <input ref={dobleRef} type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadDoble" value={prataComunitario.cantidaDoble} onChange={handleInputChange}
                      onBlur={handleOnBlurDoble}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalDoble" value={total.doble} readOnly></input>
                  </div>

                  <div className="form-group row">
                    <span className="col-lg-2 col-sm-6 mt-2">
                      Total hoy:
                    </span>
                    <span className="col-lg-3 col-sm-6 mt-2">
                      ${total.bidi+total.doppler}
                    </span>
                  </div>
                </div>

                <div className="card-footer text-muted">
                  <div className="form-group">
                    <button type="submit" className="btn btn-icon btn-primary">
                      Guardar
                    </button> &nbsp;
                    <Link to={"/prataComunitario"} className="btn btn-dark">Volver</Link> &nbsp;&nbsp;
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
