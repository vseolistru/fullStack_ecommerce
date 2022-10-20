import React, {useContext, useReducer, useState} from 'react';
import {Store} from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Helmet} from "react-helmet-async";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {getError} from "../utils";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return {...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return {...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return {...state, loadingUpdate: false };
        default:
            return state;
    }
}

const ProfileScreen = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { userInfo } = state;

    const [username, setName] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false
    });

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            dispatch({type: 'UPDATE_REQUEST'})
            try {
                const {data} = await axios.put( '/api/users/profile', {
                    username, email, password
                },
                  {
                           headers: { authorization: `Bearer ${ userInfo.token }`}
                        }
                );
                dispatch( { type: 'UPDATE_SUCCESS', } );
                ctxDispatch ( { type: 'USER_LOGIN', payload: data } );
                localStorage.setItem('userInfo', JSON.stringify(data));
                toast.success('User updated successfully');
            }
            catch (e) {
                dispatch({type: 'UPDATE_FAIL'});
                toast.error(getError(e))
            }
        }
        else {
            toast.error('Passwords is not compared')
        }
    };

    return (
        <Row>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <Col md={3}></Col>
            <Col md={6}>
                <h1>User Profile</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={username} onChange={(e)=>setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email" value={email}
                            onChange={(e)=>setEmail(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirm password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </Form.Group>
                    <div>
                        <Button type="submit" variant="warning">Update User profile</Button>
                    </div>
                </Form>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
};

export default ProfileScreen;