import {SET_IS_LOADING, FINISH_IS_LOADING, SET_CURRENTUSER} from "../actions/commonActions";

const initialState = {
  user:{},
  isLoading: false,
  error: ""
}

const commonReducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_IS_LOADING:
      return {...state, isLoading:true}
    case FINISH_IS_LOADING:
      return {...state, isLoading: false}
    case SET_CURRENTUSER:
      console.log(action)
      return {...state, user: action.payload}
    case "PURGE":
      console.log("purge common");
      return initialState;

    default:
      return state;
  }
}

export default commonReducer;