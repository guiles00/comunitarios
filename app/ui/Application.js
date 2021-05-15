import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import history from "../history";

import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import Comunitarios from "./Comunitarios";
import FormularioComunitario from "./FormularioComunitario";
import PrataComunitario from "./PrataComunitario";
import FormularioPrataComunitario from "./FormularioPrataComunitario";
import SignUp from "./SignUp";
import Maqueta from "./Maqueta";

class Application extends Component {
  constructor(props){
    super(props);

    this.state = { sessionId: null };
  }

  async componentDidMount(){
    console.log("aca pregunta por el usuario");
    console.log(this.props.user);
    const { _id } = this.props.user;
    this.setState({ sessionId: _id})
    //dispatch a common asi se guarda el estado de usuario
  }

  render() {
    const isAuthenticated = this.state.sessionId;
    
    if (isAuthenticated) {
      return (
        <Router history={history}>
          <Navbar version={this.props.version}/>
          <div>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/comunitarios" component={Comunitarios} exact={true}/>
            <Route path="/comunitarios/:id" component={FormularioComunitario} exact={true}/>
            <Route path="/prataComunitario/" component={PrataComunitario} exact={true}/>
            <Route path="/prataComunitario/:id" component={FormularioPrataComunitario} exact={true}/>
            <Route path="/signup" component={SignUp} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/maqueta/" component={Maqueta} exact={true}/> 
          </div>
        </Router>
      );
    }
    return <Login/>;
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.common.user
  }
}
export default connect(mapStateToProps)(Application);