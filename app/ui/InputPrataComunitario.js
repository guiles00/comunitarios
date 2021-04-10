import React, { useState } from "react";

//TODO: Pasarle la ref para que vaya al otro input

const InputPrataComunitario = function InputPrataComunitario({valor,name,cantidad,handleInputChange,disabled}){
  
  return (
    <div className="form-group row">
      <div className="col-lg-2 col-sm-12 ">
        {name} (${valor}):
      </div>
      <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" name={"cantidad"+name} value={cantidad} 
        onChange={handleInputChange} 
        disabled={disabled}></input>
        <input type="text" className="form-control col-lg-3 col-sm-12 mt-2" value={(valor*cantidad)} readOnly></input>
    </div>
  );
}

export default InputPrataComunitario;