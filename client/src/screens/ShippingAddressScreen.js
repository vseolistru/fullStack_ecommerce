import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import {Button, Form, Row, Col} from "react-bootstrap";
import {Store} from "../Store";
import {useNavigate} from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";



const ShippingAddressScreen = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { userInfo, cart: { shippingAddress },} = state;
    const [fullName, setFullName]= useState(shippingAddress.fullName || '');
    const [address, setAddress]= useState(shippingAddress.address || '');
    const [city, setCity]= useState(shippingAddress.city || '')
    const [postalCode, setPostalCode]= useState(shippingAddress.postalCode || '');
    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo])

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type:'SAVE_SHIPPING_ADDRESS',payload:{fullName, address, city, postalCode}});
        localStorage.setItem('shippingAddress', JSON.stringify({fullName, address, city, postalCode}));
        navigate('/payment');
    }

    return (
        <div>
            <Helmet><title>Shipping Address</title></Helmet>
            <h1 className="my-3">Shipping Address</h1>
            <CheckOutSteps step1 step2/>
            <Row className="mt-5">
                <Col md={2}></Col>
                <Col md={6}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required/>
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">Continue</Button>
                    </div>
                </Form>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    );
};

export default ShippingAddressScreen;