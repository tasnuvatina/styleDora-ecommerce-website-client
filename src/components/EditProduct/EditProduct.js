import React, { useEffect, useState,useRef } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import './EditProduct.css';

const EditProduct = () => {
    const nameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const [products, setProducts] = useState([]);
  let [productToUpdate,setProductToUpdate]=useState({});
  const [updatedSuccess,setUpdatedSuccess]=useState(false)
  useEffect(() => {
    fetch("https://apple-sundae-80140.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);
  //delete product
  const handleLoad = (id) => {
      fetch(`https://apple-sundae-80140.herokuapp.com/singleProduct/${id}`)
      .then(res=>res.json())
      .then(data=>{
        setProductToUpdate(data);
        setUpdatedSuccess(false);
      })
  }

  const handleUpdate=(id)=>{
      let name=nameRef.current.value;
      let price=priceRef.current.value;
      let brand=brandRef.current.value;
      let updatedProduct={id,name,price,brand}
      fetch(`https://apple-sundae-80140.herokuapp.com/updateProduct/${id}`,{
          method:'PATCH',
          headers:{
              'Content-type':'application/json'
                },
            body:JSON.stringify(updatedProduct)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data);
          setProductToUpdate({});
          setUpdatedSuccess(true);
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
          {products.map((shirt) => {
            return (
              <tr>
                <th scope="row">{shirt.name}</th>
                <td>{shirt.brand}</td>
                <td>{shirt.price}</td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => handleLoad(shirt._id)}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container">
      {
          updatedSuccess && <h3 className="text-center text-success">Product has beed Updated!!!</h3>
      }
      {
        productToUpdate._id && <div>
            <div><h4><strong>Product Id :</strong> {productToUpdate._id}</h4></div>
            <div>
                <label htmlFor="name">Product Name : </label><input type="text" defaultValue={productToUpdate.name} name="name" className="form-control" ref={nameRef}/>
                <label htmlFor="price">Product Price : </label><input type="text" defaultValue={productToUpdate.price} name="price" className="form-control" ref={priceRef}/>
                <label htmlFor="brand">Product Brand : </label><input type="text" defaultValue={productToUpdate.brand} name="brand" className="form-control" ref={brandRef}/>
                <button className="buyButton mt-3 mb-5" onClick={()=>handleUpdate(productToUpdate._id)}>Update</button>
            </div>
        </div>
      }
      {

      }
      </div>
    </div>
  );
};

export default EditProduct;
