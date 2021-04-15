import commonReducer from "../../app/reducers/commonReducer";
import {SET_IS_LOADING, FINISH_IS_LOADING} from "../../app/actions/commonActions";

describe("CommonReducer",()=>{

  const initialState = {
    isLoading: false,
    error: "" //Lo dejo pero todavia no lo estoy usando
  } 

  test("Cuando la accion no es conocida devolve el estado",()=>{
    const result = commonReducer({estado:undefined}, {type:"desconozco"})
    expect(result).toEqual({estado:undefined})
  });

  test("Cuando la accion es isLoading que devuelva isLoading true",()=>{
    const result = commonReducer({isLoading: false}, {type:SET_IS_LOADING})
    expect(result).toEqual({isLoading:true})
  });

  test("Cuando la accion es finish loading que devuelva isLoading false",()=>{
    const result = commonReducer({isLoading: true}, {type:FINISH_IS_LOADING})
    expect(result).toEqual({isLoading:false})
  });

})