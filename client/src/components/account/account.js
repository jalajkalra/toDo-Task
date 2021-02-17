import React,{useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import classes from './account.module.css';
import ClientLogin from './login';
import ClientRegistration from './registration';

const Account = (props)=>{
    const isLoggedIn = useSelector(state=>state.account.isLoggedIn);
    const [active,updateActive] = useState("1");
    useEffect(()=>{
        if(isLoggedIn){
            props.history.push("/home")
        }
    },[isLoggedIn])
    return(
        <div className={classes.Background}>
            <Container className={classes.Box}>
                <div className={classes.Options}>
                    <div onClick={()=>updateActive("1")} className={active==="1"?classes.Active:classes.InActive}>Sign Up</div>
                    <div onClick={()=>updateActive("2")} className={active==="2"?classes.Active:classes.InActive}>Log In</div>
                </div>
                <div>
                    {
                        active==="1"?<ClientRegistration/>:
                        active==="2"?<ClientLogin/>:null
                    }
                </div>
            </Container>
        </div>
    )
}
export default Account;
