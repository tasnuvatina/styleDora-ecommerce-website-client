import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./AddProduct.css";


const AddProduct = () => {
const [imageURL,setImageURL]=useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  let [productSubmitted,setProductSubmitted]=useState(false);

  const handleImageUpload=(event)=>{
    console.log(event.target.files[0]);
    const imageData=new FormData();
    imageData.set('key','c3a5e1749f745e232df102bb1899914d');
    imageData.append('image',event.target.files[0]);
    
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const onSubmit = (data,e) => {
    const productData ={
        name:data.name,
        price:data.price,
        brand:data.brand,
        imageURL:imageURL
    } 
    const url ='http://localhost:5000/addProduct';
    
    fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(productData)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data){
        setProductSubmitted(true);
        e.target.reset();
      }
    })
    
};

  return (
    <div>
    {
      productSubmitted && <h4 className="text-center text-success">New Product has been added successfully</h4>
    }
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 mx-3 mt-5">
        
      <p><span><strong>Product Name :</strong> </span> <input name="name" placeholder="Product name" type="text" ref={register} className="form-control" /></p>
        <p><span><strong>Product Price :</strong> </span> <input name="price" placeholder="Product price" type="text" ref={register} className="form-control"/></p>
       <p> <span><strong>Product Brand:</strong> </span> <input name="brand" placeholder="Product brand" type="text" ref={register} className="form-control"/></p>

       
       <span><strong>Product Image :</strong> </span> <input name="Image" type="file" onChange={handleImageUpload} />
       
        {errors.exampleRequired && <span>This field is required</span>}

        <div className='text-right mt-5'><input className="placeOrderButton" type="submit" /></div>
      </form>
    </div>
  );
};

export default AddProduct;
