import comunitariosReducer from "../../app/reducers/comunitariosReducer";
import { FETCH_COMUNITARIOS } from "../../app/actions/comunitariosActions";

describe("ComunitariosReducer", ()=>{
  
  test("Si la accion no la conozco que devuelva el estado",()=>{
    const newState = comunitariosReducer({},{type:"unknown"})
    expect(newState).toEqual({}) 
  });

  test(" si la accion es fetch Comunitarios que devuelva estado actualizado",()=>{
    const expectedState = {
      listaComunitarios: [{_id:"123",nombre:"Comunitario"}]
    } 
    const listaComunitarios= [{_id:"123",nombre:"Comunitario"}];

    const newState = comunitariosReducer({}, {type:FETCH_COMUNITARIOS,payload:listaComunitarios})
    expect(newState).toEqual(expectedState);
  });
  
});