import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../history";

const FormularioComunitario = function FormularioComunitario(props) {

  const [comunitario, setComunitario] = useState({_id:null,nombre:"",doppler:0,bidi:0,doble:0,consultorio:0});

  const [updated, setUpdated] = useState(false);

  useEffect(() => {

    if( props.match.params.id !== "new")
      axios(`/api/comunitarios/${props.match.params.id}`)
        .then(res => {

          const { _id, nombre } = res.data;
          const doppler = res.data.estudios[0].valor;
          setComunitario({_id:_id, nombre:nombre,doppler:doppler,bidi:res.data.estudios[1].valor
            ,doble:res.data.estudios[2].valor,consultorio:res.data.estudios[3].valor});

        }).catch(e => { console.log(e); });

  },[updated]);

  const handleSubmit = function(e) {
    e.preventDefault();

    if(comunitario._id === null){
      axios({
        method: "post",
        url: "/api/comunitarios",
        data: { nombre: comunitario.nombre, doppler: comunitario.doppler, bidi: comunitario.bidi
          , doble: comunitario.doble, consultorio: comunitario.consultorio}
      });
    } else {

      axios.put(`/api/comunitarios/${comunitario._id}`, comunitario)
        .then(() => {
          setUpdated(true);

        }).catch(e => {
          console.log(e);
        });
    }

    history.push("/comunitarios");
  };

  const handleInputChange = function(e) {
    const { name, value } = e.target;
    setComunitario({ ...comunitario, [name]: value });
  };

  return (
    <div className="container-fluid pull-down ">
      <div className="row justify-content-md-center">
        <div className="col-lg-8 col-sm-12">
          <form>
            <fieldset>
              <div className="card">
                <div className="card-body justify-content-md-center center_div">
                  <h4 className="card-title text-center">Agregar Comunitario</h4>
                  <hr/>

                  <div className="row">
                    <div className="col-sm-12 col-lg-12">
                      <label>Nombre:</label>
                      <input type="text" className="form-control" name="nombre" value={comunitario.nombre} onChange={handleInputChange}></input>
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
                    <button className="btn btn-icon btn-primary" onClick={handleSubmit}>
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