import prataComunitariosReducer from "../../app/reducers/prataComunitariosReducer";
import { FETCH_PRATA_COMUNITARIOS, SET_START_DATE, SET_END_DATE, FETCH_PRATA_COMUNITARIOS_ERROR } from "../../app/actions/prataComunitariosActions";

describe("prataComunitariosReducer",()=>{
  
  test("Si la accion es desconocida que devuelva el estado",()=>{
  const newState = prataComunitariosReducer({},{type:"unknown"});
  expect(newState).toEqual({});
  })

  test("cuando llama a fetch prata comuniario que traiga el estado actualizado",()=>{
    const expectedState = {
      //startDate: new Date()),
      //endDate: endOfMonth(new Date()),
      listadoPrataComunitarios: [{_id:"123",campo:"123"}]
    }

    const listadoPrataComunitarios = [{_id:"123",campo:"123"}];

    const newState = prataComunitariosReducer({},{type:FETCH_PRATA_COMUNITARIOS, payload:listadoPrataComunitarios});

    expect(newState).toEqual(expectedState);

  });
  
  xtest("set start Date",()=>{

  });

  xtest("set End Date",()=>{

  });

})