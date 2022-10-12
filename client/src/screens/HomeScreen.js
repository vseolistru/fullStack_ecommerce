import React, {useEffect, useReducer, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import data from "../data";


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
                {
                    products.map(prod =>
                        <div className="product" key={prod.id}>
                            <Link to={`/product/${prod.slug}`}>
                            <img src={prod.image} alt={prod.name}/></Link>
                            <div className="product-item">
                                <p>{prod.name}</p>
                                <p><strong>{prod.price}p.</strong></p>
                                <button>ADD to Cart</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default HomeScreen;