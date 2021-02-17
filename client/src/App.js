import React, { useEffect } from 'react';
import {Switch,withRouter,Route, Redirect} from 'react-router-dom'
import Account from './components/account/account';
import Home from './components/home/home';
import Updatetask from './components/updatetask/updateTask';
import {useDispatch, useSelector} from 'react-redux';
import { checkAuthState } from './entities/action/action';

const App = ()=> {
  const isLoggedIn = useSelector(state=>state.account.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuthState());
  },[])
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route exact path="/updateTask/:id" component={Updatetask}/>
        <Route path="/" component={Account}/>
        {
          !isLoggedIn?<Redirect to="/"/>:null
        }
      </Switch>  
    </div>
  );
}

export default withRouter(App);
