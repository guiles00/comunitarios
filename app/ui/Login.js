import React, { Component } from "react";

class Login extends Component{

  constructor() {
    super();
    
  }

  render(){

    return (
      <div className="container-fluid pull-down ">  
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <fieldset>
              <div className="card">
                <div className="card-body justify-content-center">
                  <h4 className="card-title text-center">
                    <img src="../images/jesi.webp"></img>
                  </h4>
                  <hr></hr>
                  <h4 className="card-text text-center text-primary">
                    <a href="/api/login"><img src="../images/btn_google_signin_web.png"></img></a>
                  </h4> 
                
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
