import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import Ratting from "./Ratting";
import axios from "axios";
import {Store} from "../Store";

const Product = ({prod}) => {
    //const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const { cart: {cartItems}, } = state;

    const addToCartHandler = async (item)=>{
        const existItem = cartItems.find((x)=>x._id ===prod._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get (`/api/products/${item._id}`)

        if (data.countInStock < quantity) {
            window.alert('Sorry, Product iut of stock');
        }
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...item, quantity},
        });
    }

    return (
        <Card key={prod.slug}>
            <Link to={`/product/${prod.slug}`}>
                <img className="card-img-top " src={prod.image} alt={prod.name}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${prod.slug}`}>
                    <Card.Title>{prod.name}</Card.Title>
                </Link>
                <Ratting ratting = {prod.ratting} numReviews = {prod.numReviews}/>
                <Card.Text>{prod.price}p.</Card.Text>
                {prod.countInStock === 0 ? <Button variant="outline-danger" disabled>Out of Stock</Button>
                    : <Button variant="warning" onClick={() => addToCartHandler(prod)}>ADD to Cart</Button>
                }
            </Card.Body>
        </Card>
    );
};

export default Product;
