
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../actions/commonActions";

const Login = () =>{
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const handleClick = (e)=>{
    e.preventDefault();
    
    const data = { 
      email, 
      password
    };

   axios({
    method: "post",
    url: "/api/auth/signin",
    data
    }).then((res)=>{
      //Si esta todo bien mando al dispatch para que se guarde el usuario
      dispatch(setCurrentUser(res.data));
      window.location.href = "/";
    }).catch((e)=>{
      console.log("error")
      console.log(e.response.data);
    });
  
  }

  return (
    <div className="container mt-4">
      <h3>Login into Jesis Comunitarios Apps</h3>
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
        <div className="btn btn-primary btn-block"
          onClick={handleClick}>Login</div>
      </form>
    </div>)
}

export default Login;