import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {


    const { register, handleSubmit, reset } = useForm()

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const [user, setUser] = useState({})


    const submit = data => {

        console.log(data)

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
                console.log(res.data)
                setUser(res.data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    alert('wrong credentials')
                }
            })

        reset({

            email: '',
            password: ''

        })



    }

    console.log(user)





    return (

        <div className='logginContainer'>

            <div className='loggin'>
                <h1>Login</h1>


                {
                    token ? (

                        <>

                            <div>

                                <h1> ¡Welcome to the e-Commerce!</h1>


                                <h3>You are online right now</h3>


                            </div>
                        </>



                    ) : (

                        <>

                            <Form className='container' onSubmit={handleSubmit(submit)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register('password')} />
                                </Form.Group>

                                <div className='createUserStyle'>

                                    <Link to="/create" className='createUserStyle'>Create a user</Link>

                                </div>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                            <div className='testUser'>
                                <h3>test data</h3>
                                <p>User: mason@gmail.com</p>
                                <p>Password: mason1234</p>
                            </div>

                        </>
                    )
                }




            </div>
        </div>

    );
};

export default Login;