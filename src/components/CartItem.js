import React from "react";

const CartItem = ({ id, name, price, removeFromCart }) => {
    return(
        <div>
            <h3>{ name }</h3>
            <p>{ price }</p>
            <button onClick={() => removeFromCart(id)}>Remove From Cart</button>
        </div>
    )
}

export default CartItem;