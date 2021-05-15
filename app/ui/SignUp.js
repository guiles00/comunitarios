import React from "react";
import axios from "axios";
//import 'regenerator-runtime/runtime'

const SignUp = () =>{
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClick =  (e)=>{
    e.preventDefault();
    
    const data = { 
      email, 
      password
    };

   axios({
    method: "post",
    url: "/api/auth/signup",
    data
    }).then((res)=>{
      console.log("exito")
      console.log(res.data.data);
      
    }).catch((e)=>{
      console.log("error")
      console.log(e.response.data);
    });
  
  }

  return (
  <div className="container">
    <form>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" className="form-control" 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          ></input>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" 
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          ></input>
      </div>
      <div className="btn btn-primary"
        onClick={handleClick}>Save</div>
    </form>
  </div>)
}

export default SignUp;