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

import { setCurrentUser } from "../actions/commonActions";

//@TODO: pasar a las acciones
import axios from "axios";
class Application extends Component {
  constructor(props){
    super(props);

    this.state = { sessionId: null, isAuthenticated: false };

  }

  async componentDidMount(){

      axios.get("api/auth/currentuser").then((res)=>{
      
        this.props.setCurrentUser(res.data.currentUser)
        
      }).catch(()=>{
          
        //borra el usuario
        this.props.setCurrentUser({});
      })
      
    
  }

  render() {

    const isAuthenticated = typeof(this.props.user.id) !== "undefined";

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
const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentUser: (user)=> dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Application);