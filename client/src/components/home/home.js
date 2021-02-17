import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logout } from '../../entities/action/action';
import { AddToDo,GetTodo } from '../../utilities/apiIntegration';
import classes from './home.module.css';


const Home = (props)=>{
    const isLoggedIn = useSelector(state=>state.account.isLoggedIn);
    const [input,updateinput] = useState('');
    const [data,updateData] = useState([]);
    const dispatch = useDispatch();
    const handleAddToDo = async()=>{
        if(input.length>0){
            const res = await AddToDo(input);
            if(res.message==="success"){
                updateData('');
                const response = await GetTodo();
                if(response.message==="success"){
                    updateData(response.data);
                }
            }
        }
    }
    useEffect(()=>{
        if(!isLoggedIn){
            props.history.push("/");
        }
    },[isLoggedIn])
    useEffect(()=>{
        (async()=>{
            const response = await GetTodo();
            if(response.message==="success"){
                updateData(response.data);
            }
        })()
    },[])
    return(
        <div className={classes.Background}>
            <Container className={classes.Body}>
                <h3>TO-DO:</h3>
                <Form.Control 
                    type="text"
                    name="input"
                    placeholder="Enter TO-DO"
                    onChange={(e)=>updateinput(e.target.value)}
                    value={input}
                    required
                />
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Button style={{margin:'5px 2px'}} onClick={handleAddToDo}>Add new To-do</Button>
                    <Button variant="danger" style={{margin:'5px 2px'}} onClick={()=>dispatch(Logout())}>Logout</Button>
                </div>
                <hr/>
                <ul className={classes.Ul}>
                    {
                        data.length>0?data.map((item,key)=>
                            <Link to={`/updateTask/${key}`} key={key} style={{color:'black',textDecoration:'none'}}>
                            <li className={classes.Li}>
                                <Row>
                                    <Col sm={7}>{item.task}</Col>
                                    <Col sm={2}>
                                        {
                                            item.important==="Yes"?
                                                <i className="fas fa-star fa-lg"></i>:null
                                        }
                                    </Col>
                                    <Col sm={3}>
                                        {
                                            item.status=="Completed"?
                                                <Button variant="secondary" size="sm">Completed</Button>:
                                                <Button variant="warning" size="sm">Pending</Button>
                                        }
                                    </Col>
                                </Row>
                            </li>
                            </Link>
                        ):null
                    }
                </ul>
            </Container>
        </div>
    )
}
export default Home;