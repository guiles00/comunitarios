import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { sessionId: null };
  }

  render() {

    const userLinks = (
      <React.Fragment>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/home"}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/prataComunitario"}>Prata Comuntario</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/comunitarios"}>Comunitarios</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link">Logout</a>
            </li>
        </ul>
      </React.Fragment>);

    const layout = (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top">
        <a className="navbar-brand" href="/">Comunitarios <small>v</small>{this.props.version}</a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="collapse_target">
         {userLinks}
        </div>
      </nav>
    );
    return layout;
  }
}

export default Navbar;
