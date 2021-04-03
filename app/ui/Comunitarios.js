import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { startFetchComunitarios } from "../actions/comunitariosActions";

const Comunitarios = function Comunitarios(props) {
  
  React.useEffect(() => {
    props.fetchComunitarios();
  },[]);

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
                  {props.comunitarios.map((comunitario)=>{
                    return (
                      <ComunitarioItem key={c._id} {...comunitario}/>
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

const mapStateToProps = (state)=>{
  return {
    comunitarios: state.comunitarios.comunitarios
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchComunitarios: ()=> dispatch(startFetchComunitarios())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comunitarios);