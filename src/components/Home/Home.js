import React, { useEffect, useState } from 'react';
import SingleShirtCard from '../SingleShirtCard/SingleShirtCard';

const Home = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        fetch('https://apple-sundae-80140.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[products])
    return (
        <div className="row w-80 text-center mx-auto">
        {
           products.map(shirt=><SingleShirtCard shirt={shirt}></SingleShirtCard>)
        }
            
        </div>
    );
};

export default Home;