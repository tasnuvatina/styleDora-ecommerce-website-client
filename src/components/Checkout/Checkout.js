import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../App";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    isUserLoggedIn,
    setIsUserLoggedIn,
  } = useContext(userContext);
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let [orderPlaced, setOrderPlaced] = useState(false);
  console.log(orderPlaced);

  useEffect(() => {
    let url = `https://apple-sundae-80140.herokuapp.com/singleProduct/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  //handle order
  const handleOrder = () => {
    let orderInfo = {
      ...loggedInUser,
      productName: product.name,
      price: product.price,
      brand: product.brand,
      productId: product._id,
      image: product.imageURL,
    };
    const url = "https://apple-sundae-80140.herokuapp.com/addOrder";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOrderPlaced(true);
          setProduct({});
        }
      });

    // console.log(orderInfo,product);
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="blue-text">Check Out</h1>
        {orderPlaced && (
          <h3 className="text-center text-success my-5">
            Your order has been placed successfully!!!!
          </h3>
        )}
        <table class="table mt-5">
          <thead>
            <tr>
              {" "}
              <th>Description</th> <th>Quantity</th> <th>Price</th>{" "}
            </tr>
          </thead>

          <tbody>
            <tr>
              {" "}
              <td>{product.name}</td> <td>{orderPlaced ? 0 : 1}</td>{" "}
              <td>
                <span>$</span>
                <span>{product.price}</span>
              </td>{" "}
            </tr>
          </tbody>

          <tfoot>
            <tr>
              {" "}
              <th>Total</th> <th></th>{" "}
              <th>
                <span>$</span>
                <span>{product.price}</span>
              </th>{" "}
            </tr>
            {/* <tr>
              {" "}
              <th></th> <th></th> <th></th>{" "}
            </tr> */}
          </tfoot>
        </table>
        <div className="text-center">
          <button onClick={handleOrder} className="placeOrderButton">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span> Check Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
