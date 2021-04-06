export const SET_IS_LOADING = "SET_IS_LOADING";
export const FINISH_IS_LOADING = "FINISH_IS_LOADING";

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
