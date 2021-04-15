import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { startUpdateComunitarios } from "../actions/comunitariosActions";

import { useSelector, useDispatch} from "react-redux";


/** OJO QUE GUARDA EN El reducer guarda en Sting y no Int */
const FormularioComunitario = function FormularioComunitario(props) {

  const [comunitario, setComunitario] = React.useState({_id:null,nombre:"",doppler:0,bidi:0,doble:0,consultorio:0});
  const [error, setError] = React.useState("");
 
  const comunitarios = useSelector(state => state.comunitarios.listaComunitarios);
  const isLoading = useSelector(state => state.common.isLoading); 
  const dispatch = useDispatch();

  const com = comunitarios.filter((c)=>c._id === props.match.params.id);

  useEffect(() => {

    if( props.match.params.id !== "new") {
      const { _id, nombre } = com[0];
      const { doppler, doble, bidi, consultorio } = com[0].estudios[com[0].estudios.length -1];

      setComunitario({_id, nombre,doppler,bidi,doble,consultorio})
    }
      
  },[]);

  const handleSubmit = function(e) {
    e.preventDefault();
    //setIsloading(true);

    if(comunitario._id === null){

      axios({
        method: "post",
        url: "/api/comunitarios",
        data: { nombre: comunitario.nombre, doppler: comunitario.doppler, bidi: comunitario.bidi
          , doble: comunitario.doble, consultorio: comunitario.consultorio}
        }).then((res)=>{
          //setIsloading(false);     
          props.history.push("/comunitarios");
          
        }).catch((e)=>{
          console.log(e)
          //setIsloading(false);
          setError("ocurrio un error")
        });

    } else {
      console.log("actualiza esto");
      console.log(comunitario);
      dispatch(startUpdateComunitarios(comunitario))

      // axios.put(`/api/comunitarios/${comunitario._id}`, comunitario)
      //   .then(() => {
      //     setIsloading(false);
      //   }).catch(e => {
      //     console.log(e);
      //     setError("ocurrio un error")
      //   });
    }
  };

  const handleInputChange = function(e) {
    const { name, value } = e.target;

    setComunitario({ ...comunitario, [name]: value });
  };

  const isDisabled = ()=>{
    let deshabilitar = false;

    if(comunitario.nombre === "") deshabilitar = true; 

    return deshabilitar;   
  }

  return (
    <div className="container-fluid pull-down" id="comunitario-form">
      <div className="row justify-content-md-center">
        <div className="col-lg-8 col-sm-12">
          <form>
            <fieldset>
              <div className="card">
                <div className="card-body justify-content-md-center center_div">
                  <h4 className="card-title text-center">Agregar Comunitario</h4>
                  <hr/>
                  {error&&
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>}
                    {isLoading &&
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    }
                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>Nombre:</label>
                      <input type="text" className="form-control" id="nombre" name="nombre" value={comunitario.nombre} onChange={handleInputChange}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>Doppler:</label>
                      <input type="text" className="form-control" name="doppler" value={comunitario.doppler} onChange={handleInputChange}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>BIDI:</label>
                      <input type="text" className="form-control" name="bidi" value={comunitario.bidi} onChange={handleInputChange}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>Doble:</label>
                      <input type="text" className="form-control" name="doble" value={comunitario.doble} onChange={handleInputChange}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>Consultorio:</label>
                      <input type="text" className="form-control" name="consultorio" value={comunitario.consultorio} onChange={handleInputChange}></input>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer text-muted">
                  <div className="form-group">
                    <button className="btn btn-icon btn-primary" onClick={handleSubmit} disabled={isDisabled()}>
                      Guardar
                    </button> &nbsp;
                    <Link to={"/comunitarios"} className="btn btn-dark">Volver</Link> &nbsp;&nbsp;
                    <button type="submit" className="btn btn-icon btn-danger">
                      Eliminar
                    </button> &nbsp;
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

export default FormularioComunitario;