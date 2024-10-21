import React from 'react';

const ProductItem = ({ id, name, price, addToCart }) => {
    return(
        <div>
            <h3>{ name }</h3>
            <p>{ price }</p>
            <button onClick={() => addToCart(id)}>Add Cart</button>
        </div>
    )
}

export default ProductItem;