import React from 'react';
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation} from "react-router-dom";

const SigninScreen = () => {
    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <Container className="small-container">
            <Row>

            <Helmet><title>Sign in</title></Helmet>
            <h1 className="my-3">Sign in</h1>
                <Col md={3}></Col>
                <Col md={6}>
                <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required/>
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