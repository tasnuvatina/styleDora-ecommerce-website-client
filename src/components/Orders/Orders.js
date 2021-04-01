import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../App";
import SingleOrderCard from "../SingleOrderCard/SingleOrderCard";
import './Orders.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  let { email } = useParams();
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    let url = `https://apple-sundae-80140.herokuapp.com/loadOrders/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [orders]);

 let total=(orders.reduce((a,v) =>  a = a + parseInt(v.price) , 0 ))
  
  
  return (
    <div>
      <div className="container mt-5">
      <h2 className="blue-text">You have {orders.length} products in your cart </h2>
        {orders.map((order) => (
            <SingleOrderCard order={order}></SingleOrderCard>
        ))}

        <div className='order-card-main mt-5 mb-5'>
            
            <div className='order-card-info'>
                <div><h4 className="blue-text">Total Price</h4></div>
                <div></div>
                <div>{orders.length}</div>
                <div><strong><span>$</span><span>{total}</span></strong></div>
                <div><button  className="placeOrderButton"><FontAwesomeIcon icon={faStore} /><span> Place Order</span></button></div>
            </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Orders;
