import React,{useState} from 'react';
import {Form,Button,Col} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import { Login } from '../../entities/action/action';

const ClientRegistration = (props)=>{
    const dispatch = useDispatch();
 
    return(
        <>
                <Formik 
                    initialValues={{ firstName: '', lastName: '',email:'',password:'' }} 
                    onSubmit={
                        async(values,{setSubmitting})=>{
                            setSubmitting(true);
                            dispatch(Login(values,"1"));
                            setSubmitting(false);
                        }
                    }>
                        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(
                            <Form onSubmit={handleSubmit} style={{color:'white'}}>
                                <center style={{margin:'15px 0'}}>
                                    <h4>Sign Up</h4>
                                </center>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicFirstName">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasiclastName">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            required
                                        />
                                    </Form.Group>
                                </Form.Row>
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
export default ClientRegistration;