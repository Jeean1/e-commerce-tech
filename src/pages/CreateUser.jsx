
import axios, { Axios } from 'axios';
import React from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getConfig from '../utils/getConfig';


const CreateUser = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, reset } = useForm()




    const submit = (data) => {



        console.log(data)

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)

            .then(() => {

                alert('user created')
                navigate('/login')
            }

            )

            .catch(error => {

                alert(`error type: ${error.response.data.message}`)
                console.log(error.response)
            })


    }


    return (

        <div className='createUserContainer'>

            <div className='testPrueba'>

                <h1>Creating user...</h1>

                <Form noValidate onSubmit={handleSubmit(submit)} className='container my-3'>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                // defaultValue="Mark"
                                {...register('firstName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                // defaultValue="Otto"
                                {...register('lastName')}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    {...register('email')}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Password" required {...register('password')} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="10 digits"
                                required
                                {...register('phone')}
                                pattern='[0-9] {10}'
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>

                    <Button type="submit">Create</Button>
                </Form>
            </div>

        </div>
    );
};

export default CreateUser;