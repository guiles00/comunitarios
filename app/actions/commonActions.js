export const SET_IS_LOADING = "SET_IS_LOADING";
export const FINISH_IS_LOADING = "FINISH_IS_LOADING";
export const LOGOUT = "LOGOUT"
export const SET_CURRENTUSER = "SET_CURRENTUSER";

export const setIsLoading = ()=>{
  return {
    type: SET_IS_LOADING
  }
}

export const finishIsLoading = ()=>{
  return {
    type: FINISH_IS_LOADING
  }
}

export const logout = ()=>{
  return {
    type: LOGOUT
  }
}

export const setCurrentUser = (user)=>{
  return {
    type: SET_CURRENTUSER,
    payload: user
  }
}

// export const getCurrentUser = ()=>{
//   return (dispatch)=>{
//     axios.get("/api/auth/currentuser")
//     .then((res)=>{
//       console.log(res.data)
//       //dispatch(fetchComunitarios(res.data.comunitarios))
//     }).catch(e => {
//       console.log(e)
      
//     });
//   }
// }
