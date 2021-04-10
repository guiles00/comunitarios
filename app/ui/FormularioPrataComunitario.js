import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

//TODO: Pasarle la ref para que vaya al otro input
const InputPrataComunitario = ({valor,name,cantidad,handleInputChange})=>{
  const [total, setTotal] = useState(0);

  const handleOnBlur = ()=>{
    
    //Debería parsear a Int? 
    setTotal(valor * cantidad);
  }

  return (
    <div className="form-group row">
      <div className="col-lg-2 col-sm-12 ">
        {name} (${valor}):
      </div>
      <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name={"cantidad"+name} value={cantidad} 
        onChange={handleInputChange} 
        onBlur={handleOnBlur}
        ></input>
      <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name={"total"+name} value={total} readOnly></input>
    </div>
  );
}


const FormularioPrataComunitario = function FormularioPrataComunitario(props) {

  const [prataComunitario, setPrataComunitario] = useState({_id:null,fecha: format(new Date(),"yyyy-MM-dd"),comunitarioId:"",cantidadDoppler:"",
    valorDoppler:0,cantidadBidi:"", valorBidi:0,cantidadDoble:"", valorDoble:0,
    cantidadConsultorio:"",valorConsultorio:0});

  const [comunitarios, setComunitarios] = useState([]);
  const bidiRef = useRef(null);
  const dobleRef = useRef(null);
  const consultorioRef = useRef(null);
  
  
  useEffect(() => {

    if( props.match.params.id !== "new")
      axios(`/api/prataComunitario/${props.match.params.id}`)
        .then(res => {
          const prataComunitarioObject = { 
            _id: res.data._id,
            fecha: res.data.fecha,
            comunitarioId: res.data.comunitario,
            cantidadDoppler:res.data.cantidadEstudios.cantidadDoppler,
            valorDoppler:res.data.cantidadEstudios.valorDoppler,
            cantidadDoble:res.data.cantidadEstudios.cantidadDoble,
            valorDoble:res.data.cantidadEstudios.valorDoble,
            cantidadBidi:res.data.cantidadEstudios.cantidadBidi,
            valorBidi:res.data.cantidadEstudios.valorBidi,
            cantidadConsultorio: res.data.cantidadEstudios.cantidadConsultorio,
            valorConsultorio: res.data.cantidadEstudios.valorConsultorio
            
          } 
          
          setPrataComunitario(prataComunitarioObject);

        }).catch(e => { console.log(e); });

  },[]);

  useEffect(() =>{
    axios("/api/comunitarios")
      .then(res =>{
        setComunitarios(res.data.comunitarios)
      })
      .catch(e => {console.log(e);});
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
      console.log("actualiza");
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

  const isDisabled = ()=>{
    let deshabilitar = false;

    if(prataComunitario.comunitarioId === "") deshabilitar = true; 

    return deshabilitar;
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
                    handleInputChange={handleInputChange} name="Doppler" />
                  
                  <InputPrataComunitario  valor={prataComunitario.valorBidi} cantidad={prataComunitario.cantidadBidi} 
                    handleInputChange={handleInputChange} name="Bidi" />
                  
                  <InputPrataComunitario  valor={prataComunitario.valorDoble} cantidad={prataComunitario.cantidadDoble} 
                    handleInputChange={handleInputChange} name="Doble" />
                  
                  <InputPrataComunitario  valor={prataComunitario.valorConsultorio} cantidad={prataComunitario.cantidadConsultorio} 
                    handleInputChange={handleInputChange} name="Consultorio" />
                  
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


/* 


const handleOnBlurDoppler = function(){

    bidiRef.current.focus();

    setTotal({...total, "doppler":(prataComunitario.valorDoppler*prataComunitario.cantidadDoppler)});
  };

  const handleOnBlurBidi = function(){
    dobleRef.current.focus();
    setTotal({...total, "bidi":(prataComunitario.valorBidi*prataComunitario.cantidadBidi)});
  };

  const handleOnBlurDoble = function(){
    consultorioRef.current.focus();
    setTotal({...total, "doble":(prataComunitario.valorDoble*prataComunitario.cantidadDoble)});
  };

  const handleOnBlurConsultorio = function(){
  
   setTotal({...total, "consultorio":(prataComunitario.valorConsultorio*prataComunitario.cantidadConsultorio)});
  };




<div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                      Doppler (${prataComunitario.valorDoppler}):
                    </div>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadDoppler" value={prataComunitario.cantidadDoppler} 
                      onChange={handleInputChange} 
                      onBlur={handleOnBlurDoppler}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalDoppler" value={total.doppler} readOnly></input>
                  </div> 
                  
                    <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                     BIDI (${prataComunitario.valorBidi}):
                    </div>
                    <input ref={bidiRef} type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadBidi" value={prataComunitario.cantidadBidi} 
                      onChange={handleInputChange}
                      onBlur={handleOnBlurBidi}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalBidi" value={total.bidi} readOnly></input>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                     Doble (${prataComunitario.valorDoble}):
                    </div>
                    <input ref={dobleRef} type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadDoble" value={prataComunitario.cantidadDoble} 
                      onChange={handleInputChange}
                      onBlur={handleOnBlurDoble}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalDoble" value={total.doble} readOnly></input>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-2 col-sm-12 ">
                     Consultorio (${prataComunitario.valorConsultorio}):
                    </div>
                    <input ref={consultorioRef} type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="cantidadConsultorio" value={prataComunitario.cantidadConsultorio} 
                      onChange={handleInputChange}
                      onBlur={handleOnBlurConsultorio}></input>
                    <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name="totalConsultorio" value={total.consultorio} readOnly></input>
                  </div>

                  
                  
                  */
