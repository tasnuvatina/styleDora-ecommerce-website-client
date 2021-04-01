import React from 'react';
import './SingleOrderCard.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const SingleOrderCard = (props) => {
    let order=props.order;
    let {productName,image,brand,price,email,_id}= order;
    //delete order
    const handleOrderDelete=(id)=>{
       let url=`http://localhost:5000/deleteOrder/${id}`
       fetch(url,{
           method:'DELETE'
       })
       .then(res=>res.json())
       .then(data=>console.log(data))
    }
    return (
        <div className='order-card-main mt-5 mb-5'>
            <div className='order-card-name blue-text'><h4>{productName}</h4></div>
            <div className='order-card-info'>
                <div><img className="ordered-product-image" src={image} alt=""/></div>
                <div><p>{brand}</p></div>
                <div><p>1</p></div>
                <div><p><span>$</span><span>{price}</span></p></div>
                <div><button className="deleteButton" onClick={()=>handleOrderDelete(_id)}><FontAwesomeIcon icon={faTrashAlt} /> <span> Cancel</span></button></div>
            </div>
        </div>
    );
};

export default SingleOrderCard;