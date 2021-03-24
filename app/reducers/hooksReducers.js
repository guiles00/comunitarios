
export const comunitariosReducer = (state, action) => {
  switch (action.type){
    case "POPULATE_COMUNITARIOS":
      return action.payload;
    default:
      return state;  
  }
}

export const a = ()=>{
  console.log("a")
}

export default {
  comunitariosReducer,a
}