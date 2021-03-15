import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

const Comunitarios = function Comunitarios() {

  const [comunitarios, setComunitarios] = useState([]);
  const [updated, setUpdated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios.get("/api/comunitarios")
      .then((res)=>{
        setComunitarios(res.data.comunitarios);
      }).catch(e => console.log(e));

    setUpdated(false);

  },[updated]);

  const handleDelete = function(id) {
    return function(){
      axios.delete(`/api/comunitarios/${id}`).then(() => {
        setUpdated(true);
      }).catch(e => {
        console.log(e);
      });
    };
  };

  const handleRowClick = function(id){
    return function(){
      history.push(`/comunitarios/${id}`);
    };
  };

  return (
    <div className="container-fluid pull-down ">
      <div className="row justify-content-md-center">
        <div className="col-md-10">
          <fieldset>
            <div className="card">
              <div className="card-body justify-content-center">
                <h4 className="card-title text-center">
                </h4>
                <hr></hr>
                <div>
                  <Link to={"/comunitarios/new"} className="btn btn-primary">Agregar</Link>
                  <table className="table table-striped table-hover table-responsive-md">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Comunitario</th>
                        <th scope="col">Doppler</th>
                        <th scope="col">BIDI</th>
                        <th scope="col">Doble</th>
                        <th scope="col">Consultorio</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {comunitarios.map((c)=>{

                        const doppler = c.estudios.find(element => element.tipo === "doppler");

                        const bidi = c.estudios.find(element => element.tipo === "BIDI" );
                        const doble = c.estudios.find(element => element.tipo === "doble" );
                        const consultorio = c.estudios.find(element => element.tipo === "consultorio" );

                        return (
                          <tr key={c._id} onClick={handleRowClick(c._id)}>
                            <td>{c.nombre}</td>
                            <td>{(typeof doppler === "undefined")?"N/A":doppler.valor}</td>
                            <td>{(typeof bidi === "undefined")?"N/A":bidi.valor}</td>
                            <td>{(typeof doble === "undefined")?"N/A":doble.valor}</td>
                            <td>{(typeof consultorio === "undefined")?"N/A":consultorio.valor}</td>
                            <td>
                              <button className="btn btn-danger" onClick={handleDelete(c._id)}>X</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Comunitarios;
//<Link to={"/"} className="btn btn-info">Volver al listado</Link>
