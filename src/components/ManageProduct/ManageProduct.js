import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ManageProduct.css'


const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);
  //delete product
  const handleDelete=(id)=>{
    console.log(id);
    let url=`http://localhost:5000/deleteProduct/${id}`;

    fetch(url,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result);
    })
  }
  return (
    <div className="">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Product Brand</th>
      <th scope="col">Product Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
      products.map(shirt=>{
          return (<tr>
      <th scope="row">{shirt.name}</th>
      <td>{shirt.brand}</td>
      <td>{shirt.price}</td>
      <td><button  className="deleteButton" onClick={()=>handleDelete(shirt._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
    </tr>)
      })
  }
    
  </tbody>
</table>
    </div>
  );
};

export default ManageProduct;
