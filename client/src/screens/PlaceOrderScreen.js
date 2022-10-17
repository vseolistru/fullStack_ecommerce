import React, {useContext, useEffect} from 'react';
import CheckOutSteps from "../components/CheckOutSteps";
import {Helmet} from "react-helmet-async";
import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import {Store} from "../Store";
import {Link, useNavigate} from "react-router-dom";

const PlaceOrderScreen = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo, cart} = state;
    const navigate = useNavigate()

    const round2 = num => Math.round(num*100 + Number.EPSILON)/ 100;
    cart.itemsPrice = round2( cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler =async () => {

    }

    useEffect(()=>{
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart])

    return (
        <div className="mt-5">
            <CheckOutSteps step1 step2 step3 step4/>
            <Helmet><title>Preview Order</title></Helmet>
                <h1 className="my-3">Preview Order</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3 mt-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name: </strong>{cart.shippingAddress.fullName}<br/>
                                <strong>Address: </strong>{cart.shippingAddress.address}<br/>
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3 mt-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong>{cart.paymentMethod}<br/>

                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3 mt-3">
                        <Card.Body>
                            <Card.Title>Products</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map(item =>
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src = {item.image} alt = {item.name} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}><span>{item.quantity}</span></Col>
                                            <Col md={3}><span>{item.price}</span></Col>
                                        </Row>
                                </ListGroup.Item>)}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.itemsPrice}p.</Col>
                                </Row>
                            </ListGroup.Item>
                            <hr/>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{cart.shippingPrice}p.</Col>
                                </Row>
                            </ListGroup.Item>
                            <hr/>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>{cart.taxPrice}p.</Col>
                                </Row>
                            </ListGroup.Item>
                            <hr/>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Order Total</Col>
                                    <Col>{cart.totalPrice}p.</Col>
                                </Row>
                            </ListGroup.Item>
                            <hr/>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button className="mt-3" variant="warning" type="button" onClick={placeOrderHandler}
                                            disabled={cart.cartItems.length === 0}>
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;