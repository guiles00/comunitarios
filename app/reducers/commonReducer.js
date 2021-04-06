import {SET_IS_LOADING, FINISH_IS_LOADING} from "../actions/commonActions";

const initialState = {
  isLoading: false,
  error: ""
}

const commonReducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_IS_LOADING:
      return {...state, isLoading:true}
    case FINISH_IS_LOADING:
      return {...state, isLoading: false}
    default:
      return state;
  }
}

export default commonReducer;