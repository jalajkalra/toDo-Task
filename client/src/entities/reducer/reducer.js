import * as actionType from '../actionType';

const INITIAL_STATE = {
    isLoggedIn:false,
    isLoading:false,
    error:false,
    apiResponse:null
}

const reducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case actionType.AUTH_INIT:
            return{...state,isLoading:true}
        case actionType.AUTH_SUCCESS:
            return{...state,isLoading:false,isLoggedIn:true,apiResponse:action.payload}
        case actionType.AUTH_FAIL:
            return{...state,isLoading:false,isLoggedIn:false,error:true}
        case actionType.LOGOUT_INIT:
            return{...state,isLoading:true,isLoggedIn:false,apiResponse:null}
        case actionType.LOGOUT_SUCCESS:
            return{...state,isLoading:false,isLoggedIn:false,apiResponse:null}
        default:
            return state
    }
}
export default reducer;