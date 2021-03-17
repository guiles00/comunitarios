import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import Comunitarios from "./Comunitarios";
import FormularioComunitario from "./FormularioComunitario";
import PrataComunitario from "./PrataComunitario";
import FormularioPrataComunitario from "./FormularioPrataComunitario";
import Maqueta from "./Maqueta";

class Application extends Component {
  constructor(){
    super();

    this.state = { sessionId: null };
  }

  render() {
   const isAuthenticated = true;
    
   if (isAuthenticated) {
      return (
        <Router history={history}>
          <Navbar/>
          <div>
            <Route path="/home" component={Home} exact={true}/>
            <Route path="/comunitarios" component={Comunitarios} exact={true}/>
            <Route path="/comunitarios/:id" component={FormularioComunitario} exact={true}/>
            <Route path="/prataComunitario/" component={PrataComunitario} exact={true}/>
            <Route path="/prataComunitario/:id" component={FormularioPrataComunitario} exact={true}/>
            <Route path="/maqueta/" component={Maqueta} exact={true}/>
            
          </div>
        </Router>
      );
    }
    return <Login/>;
  }
}

export default Application;