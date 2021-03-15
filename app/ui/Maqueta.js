import React, { useEffect, useState } from "react";
import axios from "axios";

const Holis = function Holis(props){
  return <p>Holis {props.nombre}</p>;
}


const Maqueta = function Maqueta() {

  const [nombre, setNombre] = useState();
  const [comunitarios, setComunitarios] = useState([]);
  useEffect(() => {
    
    fetch("/api/comunitarios")
      .then(res => res.json())
      .then((res)=>{
       // setComunitarios(res.comunitarios);
       setComunitarios("res.comunitarios");
      }).catch(e => console.log(e));

    setNombre("Guille")

  },[]);

  return <div>
      <Holis nombre={nombre}/>
    </div>;
};

export default Maqueta;
