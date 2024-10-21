import React from 'react';
import { useRouter } from "next/router";
import axios from "axios";

import ProductItem from "@/components/ProductItem";

const HomePage = ({ products }) => {
    const router = useRouter();

    const addToCartHandler = async (id) => {
        try {
            const { data } = await axios.post('http://localhost:3001/api/cart',{
                id: id
            });

           console.log(data)

        }catch (error) {
            console.error(error);
        }
    }

    if(!products){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const navigateHandler = () => {
        router.push('/cart');
    }

    return(
        <div>
            <p>Welcome</p>
            <button onClick={navigateHandler}>Cart</button>

            {products.map((product) => {
                return (
                    <ProductItem key={product.id} id={product.id} price={product.price}
                                 name={product.name} addToCart={addToCartHandler}/>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(props) {
    const res = await fetch('http://localhost:3001/api/products');
    const data = await res.json();
    const products = data.products;

    return {
        props: {
            products: products
        }
    }
}

export default HomePage;