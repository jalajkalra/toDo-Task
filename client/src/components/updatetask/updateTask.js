import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Col} from 'react-bootstrap';
import classes from '../home/home.module.css';
import {Link} from 'react-router-dom';
import { DeleteTodo, GetTodoById,UpdateTaskData } from '../../utilities/apiIntegration';

const UpdateTask = (props)=>{
    const [task,updateTask] = useState('');
    const [description,updateDescription] = useState('');
    const [status,updateStatus] = useState('Pending');
    const [important,updateImportant] = useState('Yes');
    const [date,updateDate] = useState('');
    const [time,updateTime] = useState('');
    useEffect(()=>{
        (async()=>{
            const response = await GetTodoById(props.match.params.id);
            if(response.message==="success"){
                updateTask(response.data.task);
                updateDescription(response.data.description);
                updateImportant(response.data.important);
                updateStatus(response.data.status);
                updateTime(response.data.deadlineTime);
                updateDate(response.data.deadlineDate);
            }
        })()
    },[])
    const handletask = async()=>{
        const newData = {
            task,
            description,
            status,
            important,
            date,
            time
        }
        const res = await UpdateTaskData(newData);
        if(res.message==="success"){
            props.history.push("/home");
        }else{
            alert("Something went wrong");
            props.history.push("/home");
        }
    }
    const handleDeletetask = async()=>{
        const res = await DeleteTodo(task);
        if(res.message==="success"){
            props.history.push("/home");
        }else{
            alert("Something went wrong");
            props.history.push("/home");
        }
    }
    return(
        <div className={classes.Background} style={{display:'flex',alignItems:'center'}}>
            <Container className={classes.Body}>
                <Link to="/home" style={{color:'black',textDecoration:'none'}}>
                    <span className={classes.Back}><i className="fas fa-long-arrow-alt-left"></i> Back to task</span>
                </Link>
                <hr/>
                <Form>
                    <Form.Group controlId="formBasicTask">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control
                            type="text"
                            name="task"
                            placeholder="Task"
                            onChange={(e)=>updateTask(e.target.value)}
                            value={task}
                            required
                        />
                    </Form.Group>
                    <Form.Row> 
                        <Form.Group as={Col} controlId="formBasicStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                placeholder="Status"
                                onChange={(e)=>updateStatus(e.target.value)}
                                value={status}
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicImportance">
                            <Form.Label>Important</Form.Label>
                            <Form.Control
                                as="select"
                                name="important"
                                onChange={(e)=>updateImportant(e.target.value)}
                                value={important}
                                required
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDate">
                            <Form.Label>Deadline Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                onChange={(e)=>updateDate(e.target.value)}
                                value={date}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicTime">
                            <Form.Label>Deadline Time:</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                onChange={(e)=>updateTime(e.target.value)}
                                value={time}
                                required
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e)=>updateDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </Form.Group>
                    <div style={{display:'flex',justifyContent:'space-around'}}>
                        <Button onClick={()=>handletask()}>Save</Button>
                        <Button variant="secondary" onClick={()=>props.history.push("/home")}>Cancel</Button>
                        <Button variant="danger" onClick={()=>handleDeletetask()}>Delete</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}
export default UpdateTask;