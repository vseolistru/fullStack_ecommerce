import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import Ratting from "./Ratting";

const Product = ({prod}) => {
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
                <Button variant="warning">ADD to Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default Product;