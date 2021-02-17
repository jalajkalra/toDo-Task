import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import { Login } from '../../entities/action/action';

const ClientLogin = ()=>{
    const dispatch = useDispatch();
 
    return(
        <>
            <Formik 
                    initialValues={{ email:'',password:'' }} 
                    onSubmit={
                        async(values,{setSubmitting})=>{
                            setSubmitting(true);
                            dispatch(Login(values,"2"));
                            setSubmitting(false);
                        }
                    }>
                        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(
                            <Form onSubmit={handleSubmit} style={{color:'white'}}>
                                <center style={{margin:'15px 0'}}>
                                    <h4>Log In</h4>
                                </center>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control
                                    name="email"
                                    type="email" 
                                    placeholder="Enter Email ID"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={touched.email ? "has-error":null}
                                    required
                                    /> 
                                    <Form.Text className="text-muted">
                                    {errors.email && touched.email && errors.email}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={touched.password && errors.password ? "has-error":null}
                                    required />
                                    <Form.Text className="text-muted">
                                    {errors.password && touched.password && errors.password}
                                    </Form.Text>
                                </Form.Group>
                                <center>
                                    <Button 
                                        size="lg"  
                                        type="submit" 
                                        style={{margin:'3% 0',background:'rgb( 19, 177, 132)'}}
                                        disabled={isSubmitting}
                                    >
                                    Get Started
                                    </Button>
                                </center>
                            </Form>
                        )}
                    </Formik> 
        </>
    )
}
export default ClientLogin;