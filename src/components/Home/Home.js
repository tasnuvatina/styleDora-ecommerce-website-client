import React, { useEffect, useState } from "react";
import SingleShirtCard from "../SingleShirtCard/SingleShirtCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://apple-sundae-80140.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);
  return (
    <div className="row w-80 text-center mx-auto">
      {products.length === 0 && (
        <div className="text-center mt-5 mx-auto">
          <div className="spinner-border" role="status" style={{width:"3rem",height:"3rem"}}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {products.map((shirt) => (
        <SingleShirtCard shirt={shirt}></SingleShirtCard>
      ))}
    </div>
  );
};

export default Home;
