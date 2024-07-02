


import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsPlus, BsEyeFill } from "react-icons/bs";
import '../../css/Product.css'; // Import the CSS file

const Product = ({ product }) => {
  // const { addToCart } = useContext(CartContext);

  // destructure product
  const { id, image, category, title, price } = product;
  return (
    <div>
      <div className="product-container">
        <div className="product-image-wrapper">
          <div className="product-image">
            <img className="product-img" src={image} alt="" />
          </div>
        </div>
        <div className="product-buttons">
          <div className="add-to-cart-button">
            <BsPlus className="plus-icon" />
          </div>
          <Link to={`/product/${id}`} className="view-details-button">
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="product-category">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="product-title">{title}</h2>
        </Link>
        <h2 className="product-price">$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
