import React from 'react';
import { Link } from 'react-router-dom';
import "./SingleShirtCard.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const SingleShirtCard = (props) => {
    let shirt=props.shirt;
    let {name,imageURL,price,brand,_id}=shirt;
    return (
        <div className='col-lg-4 col-md-6 col-sm-6 mt-5 mb-5'>
        <div ><div><img className="shirt-img" src={imageURL} alt=""/></div>
       <div className="shirt-card-info">
       <div><h4>{name}</h4></div>
        <div><span>By</span><span> {brand}</span></div>
        <div className="button-price-div"><div><h5>${price}</h5></div><div><Link to={`/checkout/${_id}`}><button className="buyButton" ><FontAwesomeIcon icon={faShoppingCart} /><span> Buy now</span></button></Link> </div></div>
       </div></div>
        </div>
    );
};

export default SingleShirtCard;