import * as actionType from '../actionType';

export const Login = (data,type)=>{
    return async dispatch=>{
        dispatch(loginInit())
        try{
            let url = '';
            if(type=="2"){
                url = 'http://localhost:5000/user/login';
            }else{
                url = 'http://localhost:5000/user/registration'
            }
            const response = await fetch(url,{
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
              });
            const json = await response.json();
            if(json.message!=="success"){
                dispatch(loginFailed())
            }else{
                const expirationDate = new Date(new Date().getTime() + 10*60*60*1000)
                const expirationTime = 10*60*60*1000;
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('token',json.token);
                dispatch(checkAuthTimeout(expirationTime));
                dispatch(loginSuccess(json))
            }
        }catch(err){dispatch(Logout())}
    }
}

export const Logout = ()=>{
    return  dispatch=>{
        dispatch({
            type:actionType.LOGOUT_INIT
        })
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            dispatch({
                type:actionType.LOGOUT_SUCCESS,
            })
        }catch(err){
            dispatch({
                type:actionType.AUTH_FAIL,
                payload:err
            })
        }
    }
}

export const loginInit = ()=>{
    return {
        type:actionType.AUTH_INIT
    }
}

export const loginSuccess = (data)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        payload:data
    }
}

export const loginFailed = ()=>{
    return{
        type:actionType.AUTH_FAIL
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(Logout());
        }, expirationTime);
    };
};


export const checkAuthState = ()=>{
    return async dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(Logout())
        }else{
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate<=new Date()){
                dispatch(Logout());
            }else{
                const bearer = 'Bearer '+ token;
                dispatch(loginInit())
                const response = await fetch('http://localhost:5000/user/checkAuthState',{
                    method:'get',
                    headers:{
                        'Authorization':bearer,
                        'Content-Type':'application/json'
                    }
                });
                const json = await response.json();
                if(json.message == "success"){
                    dispatch(checkAuthTimeout(new Date(expirationDate).getTime() - new Date().getTime()));
                    dispatch(loginSuccess(json))
                }else{
                    dispatch(Logout())
                }
            }
        }
    }
}