import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import CartEmpty from "./CartEmpty";
import CartContent from "./CartContent";
import {getTotal} from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotal())
  }, [cart])

  return (
    <div className="cart">
      <div className="wrapper">
        <h2>Shopping Cart</h2>
        {!cart.cartItems.length ? <CartEmpty /> : <CartContent cart={cart} />}
      </div>
    </div>
  );
};

export default Cart;
