import React, { useState } from 'react';
import { useRouter } from "next/router";
import CartItem from "@/components/CartItem";
import axios from "axios";

const CartScreen = ({ cart }) => {
    const router = useRouter();
    const [cartInfo, setCartInfo] = useState(cart);

    const navigateHandler = () => {
        router.push('/');
    }

    const removeFromCartHandler = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3001/api/cart/${id}`);
            console.log(data);

            const { data: data2 } = await axios.get('http://localhost:3001/api/cart');
            console.log(data2)
            setCartInfo(data2.cart);

        }catch (error) {
            console.log(error);
        }
    }

    if(!cartInfo){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <p>Cart</p>
            <button onClick={navigateHandler}>Home</button>

            {cartInfo.map((cartItem, index) => {
                return (
                    <CartItem key={cartItem.id} id={cartItem.id} price={cartItem.price}
                              name={cartItem.name} removeFromCart={removeFromCartHandler}/>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(props) {
    const res = await fetch('http://localhost:3001/api/cart');
    const data = await res.json();
    const cart = data.cart;

    return {
        props: {
            cart: cart
        }
    }
}

export default CartScreen;