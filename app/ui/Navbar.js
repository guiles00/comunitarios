import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import 'regenerator-runtime/runtime'
import axios from "axios";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { sessionId: null };
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount(){
    console.log("aca pregunta por el usuario");
    // const user = await axios.get("/api/auth/currentuser");
    // console.log(user.data);
    console.log(this.props.user);
    const { _id } = this.props.user;
    this.setState({ sessionId: _id})
    //dispatch a common asi se guarda el estado de usuario
  }

  async onLogout() {

    await axios.get("/api/auth/signout");

    //PRUGE ALL REDUCERS
    this.props.purge();
    window.location.href = "/login";
  }

  render() {

    const userLinks = (
      <React.Fragment>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to={"/"}>Home</Link>
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
                <Link className="nav-link" data-toggle="collapse" data-target="#collapse_target" to="#" onClick={this.onLogout}>Cerrar Sesi&oacute;n</Link>
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
        {this.state.sessionId && userLinks}
        </div>
      </nav>
    );
    return layout;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    purge: () => dispatch({ type: 'PURGE' }),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.common.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
