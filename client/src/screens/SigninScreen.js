import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Store} from "../Store";
import {toast} from "react-toastify";
import {getError} from "../utils";

const SigninScreen = () => {
    const navigate = useNavigate()
    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state
    const submitHandler = async  (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/signin', {email, password});
            ctxDispatch({type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
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

            <Helmet><title>Sign in</title></Helmet>
            <h1 className="my-3">Sign in</h1>
                <Col md={3}></Col>
                <Col md={6}>
                <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e)=> setPassword(e.target.value)}/>
                    <div>
                        <Button type="submit" className="mt-3" variant="warning">Sign In</Button>
                    </div>
                    <div className="mb-3 mt-3">
                        New customer? {' '}
                        <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </Form.Group>
            </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
};

export default SigninScreen;