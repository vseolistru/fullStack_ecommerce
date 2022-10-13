import React, {useEffect, useReducer} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Badge, Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import Ratting from "../components/Ratting";
import {Helmet} from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const ProductScreen = () => {
    const params = useParams();
    const {slug} = params;
    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product:[],
        loading: true,
        error:''
    });

    useEffect(()=>{
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'})
            try {
                const res = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type: 'FETCH_SUCCESS', payload: res.data})

            }
            catch (e) {
                dispatch({type: 'FETCH_FAIL', payload: e.message})
            }
        };
        fetchData();
    },[slug])


    return (
        loading ? <LoadingBox/>
        : error ? <MessageBox/>
        :
        <div className="mt-3">
            <Row>
                <Col md={6}>
                   <img className="img-large" src={product.image} alt={product.name}/>
                </Col>
                <Col mg={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name} Best Deals whole web in our New Store</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Ratting
                               ratting={product.ratting}
                               numReviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Price: <strong>{product.price}p.</strong></p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p><strong>Description:</strong></p>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3} className="mt-3">
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <Row className="mt-3">
                                    <Col>Price: <Col><strong>{product.price}p.</strong></Col></Col>
                                </Row>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <Row className="mt-3">
                                    <Col>Status:
                                        <Col>{product.countInStock > 0
                                            ? (<Badge bg = "success">In Stock</Badge>)
                                            : (<Badge bg = "danger">Unavailable</Badge>)}</Col>
                                    </Col>
                                </Row>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item className="mt-3">
                                        <div className="d-grid">
                                            <Button variant="warning">
                                                ADD to cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
          </div>
    );
};

export default ProductScreen;