import React, {useContext} from 'react';
import {Store} from "../Store";
import {Helmet} from "react-helmet-async";
import {Row, Col, ListGroup, Button, Card} from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const CartScreen = () => {
    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart: {cartItems}, } = state;

    const updateCartHandler = async (item, quantity)=>{
        const { data } = await axios.get (`/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry, Product iut of stock');
        }
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...item, quantity},
        });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping')
    };

    return (
        <div>
            <Helmet><title>Shopping cart</title></Helmet>
            <h1>Shopping cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length ===0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go to Shopping</Link>
                        </MessageBox>)
                        :(<ListGroup>
                            {cartItems.map((item) =>
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>{" "}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button onClick={()=> updateCartHandler(item,item.quantity -1)}
                                            variant="light" disabled={item.quantity ===1}>
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                        <Button onClick={()=> updateCartHandler(item,item.quantity +1)}
                                            variant="light" disabled={item.quantity === item.countInStock}>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>
                                        {item.price}p.
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="light" onClick={()=>removeItemHandler(item)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)}
                        </ListGroup>)
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush" className="mt-3">
                                <h3>
                                    Subtotal ({cartItems.reduce((a, c)=> a+c.quantity, 0)} {' '} items)
                                    : {cartItems.reduce((a,c)=> a+ c.price * c.quantity, 0)}p.
                                </h3>
                            </ListGroup>
                            <ListGroup>
                                <div className="d-grid">
                                    <Button  className="mt-3" type = 'button'
                                            onClick={checkoutHandler}
                                            variant='warning' disabled={cartItems.length === 0}>
                                        Proceed Checkout
                                    </Button>
                                </div>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CartScreen;