import React from 'react';
import data from "../data";
import {Link} from "react-router-dom";

const HomeScreen = () => {
    return (
        <div>
            <h1>Feature Products</h1>
            <div className="products">
                {
                    data.products.map(prod =>
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