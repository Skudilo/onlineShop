import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useHistory } from "react-router-dom";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    history.push("/cart");
  };

  return (
    <li className="product" key={product.id}>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <div className="details">
        <span>{product.desc}</span>
        <span className="price">${product.price}</span>
      </div>
      <Button classname="button" onClick={() => handleAddToCart(product)}>
        Add To Basket
      </Button>
    </li>
  );
};

export default Product;
