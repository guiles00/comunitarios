import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

  const handleRowClick = function(id){
    return function(){
      history.push(`/comunitarios/${id}`);
    };
  };

  return (
    <div className="container-fluid pull-down ">
      
      <div className="row">             
        <div className="col-sm-1 col-lg-2">
        </div>
        <div className="col-sm-10 col-lg-8"> 
          <div className="card">
            <div className="card-header"> 
              <h2 className="card-title text-center">
                Listado de Comunitarios
              </h2>
              <br></br> 
              <Link to={"/comunitarios/new"} className="btn btn-primary">Agregar</Link>
            </div>
            <div className="card-body justify-content-center p-0">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Comunitario</th>
                    <th scope="col">Doppler</th>
                    <th scope="col" className="only-lg">BIDI</th>
                    <th scope="col" className="only-lg">Doble</th>
                    <th scope="col" className="only-lg">Consultorio</th>
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
                        <td className="only-lg">{(typeof bidi === "undefined")?"N/A":bidi.valor}</td>
                        <td className="only-lg">{(typeof doble === "undefined")?"N/A":doble.valor}</td>
                        <td className="only-lg">{(typeof consultorio === "undefined")?"N/A":consultorio.valor}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>       
            </div>
          </div>
        </div>
        
      </div>
    </div>
  
  );
};

export default Comunitarios;

/*<div className="container-fluid pull-down ">
      <div className="row justify-content-md-center">
        <div className="col-md-8 col-sm-12 col-lg-8">
          
            <div className="card">
              <div className="card-header"> 
                <h2 className="card-title text-center">
                  Listado de Comunitarios
                </h2>
                <br></br> 
                <Link to={"/comunitarios/new"} className="btn btn-primary">Agregar</Link>
              </div>
        
              <div className="card-body justify-content-center p-0">
                <table className="table table-striped table-hover table-responsive-md">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Comunitario</th>
                      <th scope="col">Doppler</th>
                      <th scope="col" className="only-lg">BIDI</th>
                      <th scope="col" className="only-lg">Doble</th>
                      <th scope="col" className="only-lg">Consultorio</th>
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
                          <td className="only-lg">{(typeof bidi === "undefined")?"N/A":bidi.valor}</td>
                          <td className="only-lg">{(typeof doble === "undefined")?"N/A":doble.valor}</td>
                          <td className="only-lg">{(typeof consultorio === "undefined")?"N/A":consultorio.valor}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
*/