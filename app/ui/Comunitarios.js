import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import hookActions from "../actions/hookActions";
import { comunitariosReducer } from "../reducers/hooksReducers";

const Comunitarios = function Comunitarios() {
  
  const history = useHistory();
  const [comunitarios, dispatch] = React.useReducer(comunitariosReducer,[]);

  const setComunitarios = (comunitarios)=>{
    dispatch({type:"POPULATE_COMUNITARIOS",payload:comunitarios})
  }

  React.useEffect(() => {
    hookActions.getComunitarios(setComunitarios);
  },[]);

  const handleRowClick = function(id){
    return function(){
      history.push(`/comunitarios/${id}`);
    };
  };

  return (
    <div className="container-fluid pull-down" id="comunitarios-list">
      
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
              <BrowserRouter>
                <Link to={"/comunitarios/new"} className="btn btn-primary">Agregar</Link>
              </BrowserRouter>
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

                    const {doppler, doble, bidi, consultorio} = c.estudios[c.estudios.length -1];

                    return (
                      <tr key={c._id} onClick={handleRowClick(c._id)}>
                        <td>{c.nombre}</td>
                        <td>{doppler}</td>
                        <td className="only-lg">{bidi}</td>
                        <td className="only-lg">{doble}</td>
                        <td className="only-lg">{consultorio}</td>
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