import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Store} from "../Store";
import {toast} from "react-toastify";
import {getError} from "../utils";

const SignUpScreen = () => {
    const navigate = useNavigate()
    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state
    const submitHandler = async  (e) => {
        e.preventDefault();
        try {
            if (password === confirmpassword){
            const {data} = await axios.post('/api/users/signup', {username ,email, password});
            ctxDispatch({type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
            }
            else {
                toast.error('пароли не совпадают');
            }
        }
        catch (e) {
            toast.error(getError(e));
        }
    }
    useEffect(()=>{
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (
        <Container className="small-container">
            <Row>

                <Helmet><title>Sign Up</title></Helmet>
                <h1 className="my-3">Sign Up</h1>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="UserName" required onChange={(e)=> setUserName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e)=> setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(e)=> setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" required onChange={(e)=> setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                            <div>
                                <Button type="submit" className="mt-3" variant="warning">Sign Up</Button>
                            </div>
                            <div className="mb-3 mt-3">
                                Already have an account ? {' '}
                                <Link to={`/signup?redirect=${redirect}`}>Sign In</Link>
                            </div>

                    </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
};

export default SignUpScreen;