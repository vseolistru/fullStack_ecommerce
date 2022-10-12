import React, {useEffect, useReducer, useState} from 'react';
import axios from "axios";
//import logger from "use-reducer-logger";
import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";


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
    //console.log(reducer)
    //const [products, setProducts] = useState([])
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

            //setProducts(res.data)
        };
        fetchData();
    },[])

    return (
        <div>
            <h1>Feature Products</h1>
            <div className="products">
                <Row>
                {
                    loading ? (<div>Loading...</div>): error ? (<div>{error}</div>) :
                        (
                    products.map(prod =>
                        <Col sm={6} md={4} lg={3} className="mb-3" key={prod.id} >
                            <Product prod={prod}></Product>
                        </Col>
                ))}
                </Row>
            </div>
        </div>
    );
};

export default HomeScreen;