import React, {useContext, useEffect, useState} from 'react';
import CheckOutSteps from "../components/CheckOutSteps";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Store} from "../Store";
import {useNavigate} from "react-router-dom";

const PaymentMethodScreen = () => {
    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart: {shippingAddress, paymentMethod}} = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal')

    useEffect(()=>{
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    },[shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));
        navigate('/placeorder');
    }

    return (
        <div className="mt-5">
            <CheckOutSteps step1 step2 step3/>
            <Helmet><title>Payment Method</title></Helmet>
            <Row className="mt-5">
                <Col md={2}></Col>
                <Col md={6}>
                    <Form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <Form.Check type="radio" id="PayPal" label="PayPal" value="PayPal"
                                        checked={paymentMethodName === "PayPal"} onChange={(e)=>{setPaymentMethod(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <Form.Check type="radio" id="Stripe" label="Stripe" value="Stripe"
                                        checked={paymentMethodName === "Stripe"} onChange={(e)=>{setPaymentMethod(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <Button type="submit">Continue</Button>
                        </div>
                    </Form>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    );
};

export default PaymentMethodScreen;