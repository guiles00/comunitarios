import React, { useState } from "react";
import { useSelector } from "react-redux";
import { format, startOfMonth, endOfMonth, addMonths } from 'date-fns'
import { es } from 'date-fns/locale';

import { getPrataComunitarioSum, getListadoPorComunitario } from "../selectors/filtersPrataComunitario";
/** 
 * @TODO Dejo estos componentes aca para que en el codeReview vea los nombres
*/

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Mes = ({offset = 0,listadoPrataComunitarios})=>{
  
  const inicio = addMonths(startOfMonth(new Date()), offset);
  const fin = addMonths(endOfMonth(new Date()), offset);

  const suma = getPrataComunitarioSum(listadoPrataComunitarios,format(inicio ,"yyyy-MM-dd"),format(fin ,"yyyy-MM-dd"));
  const estudiosPorComunitario = getListadoPorComunitario(listadoPrataComunitarios,format(inicio ,"yyyy-MM-dd"),format(fin ,"yyyy-MM-dd"));

  return (<div className="card">
    <div className="card-body">
        <h4 className="card-title text-center">{capitalize(format(inicio,"MMMM",{locale:es}))}</h4>
        <h3 className="class-subtitle text-center display-5">${suma}</h3>
        <Detalle comunitarios={estudiosPorComunitario}/>
    </div>
  </div>)
}

const Detalle = ({comunitarios})=>{

  const [show, setShow] = useState(false);
  
  const handleClick = ()=>{
    (show)? setShow(false): setShow(true);
  }

  const listado = Object.keys(comunitarios).map((c,i)=>{
    
    return <tr key={i}><td>{c}</td><td>${comunitarios[c]}</td></tr>
  })
 
  const detalle = (<table className="table table-striped"><tbody>
    {listado}
    </tbody>
    </table>)

  return (<div className="text-center">
    <h4 className="btn btn-sm btn-light" onClick={handleClick}>
    {show? "Ocultar": "Mostrar"}
    </h4>
   { show && <div>{detalle}</div> }
  </div>)
}

const Home = function Home() {

  const { listadoPrataComunitarios } = useSelector((state)=>state.prataComunitarios);

  return (
    <div className="container-fluid pull-down ">  
      <div className="row justify-content-md-center">
        <div className="col-md-10">
          <fieldset>
            <div className="card">
              <div className="card-body justify-content-center">
              <h4 className="card-title text-center">Comunitarios Dashboard</h4>

                <Mes offset={-2} listadoPrataComunitarios={listadoPrataComunitarios}/>
                
                <Mes offset={-1} listadoPrataComunitarios={listadoPrataComunitarios}/>

                <Mes listadoPrataComunitarios={listadoPrataComunitarios}/>

              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Home;
