import React, {useEffect, useReducer, useState} from 'react';
import axios from "axios";
import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Helmet} from "react-helmet-async";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

//const [{loading, error, products}, dispatch] = useReducer(logger(reducer)
const HomeScreen = () => {
    const [{loading, error, products}, dispatch] = useReducer(reducer, {
        products:[],
        loading: true,
        error:''
    });

    useEffect(()=>{
            const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'})
            try {
                const res = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: res.data})
                //console.log(res.data)
            }
            catch (e) {
                dispatch({type: 'FETCH_FAIL', payload: e.message})
            }
        };
        fetchData();
    },[])

    return (
        <div><Helmet><title>Catalog in our New Store, Best deals in whole web</title></Helmet>
            <h1>Feature Products</h1>
            <div className="products">
                <Row>
                {
                    loading ? (<LoadingBox/>): error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                    products.map(prod =>
                        <Col sm={6} md={4} lg={3} className="mb-3" key={prod._id} >
                            <Product prod={prod}></Product>
                        </Col>
                ))}
                </Row>
            </div>
        </div>
    );
};

export default HomeScreen;