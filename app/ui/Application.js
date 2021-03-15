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
    const isAuthenticated = this.state.sessionId; 
    
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