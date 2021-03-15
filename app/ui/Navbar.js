import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

  constructor() {
    super();
    
    this.state = { sessionId: null };
    
  }  

  componentDidMount(){
    //por ahora que consulte aca. Pero debería hacer la consulta como siempre, en el componente principal o en cada llamada.
    fetch("/api/getAuth").then(res => res.json())
      .then((response) => {
        this.setState( { sessionId: response.user.passport.user.id });
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  render() {

    const userLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/home"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/prataComunitario"}>Prata Comuntario</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/comunitarios"}>Comunitarios</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/api/logout">Logout </a>
        </li>
      </ul>);

    const layout = (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top">
        <a className="navbar-brand" href="/">Comunitarios <small>v</small>1.0</a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="collapse_target">
          {this.state.sessionId ? userLinks : null}
        </div>
      </nav>
    );
    return layout;
  }
}

export default Navbar;
//<a className="navbar-brand" href="/"> <img src="/images/jesi.webp" width="50" height="50"></img></a>
          
/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" to={"/"}>Alta</a>
            <a className="dropdown-item" to={"/"}>Reportes</a>
            <a className="dropdown-item" to={"/api/logout"}>Logout</a>
          </div> */
        