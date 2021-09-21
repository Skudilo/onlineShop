import React from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearCart, decreaseQuantity, increaseQuantity, removeFromCart} from "../features/cartSlice";

const CartContent = ({cart}) => {
	const dispatch = useDispatch();
	const handleRemoveProduct = (product) => {
		dispatch(removeFromCart(product));
	};
	const handleDecreaseQuantity = (item) => {
		dispatch(decreaseQuantity(item));
	};
	const handleIncreaseQuantity = (item) => {
		dispatch(increaseQuantity(item));
	};

	return (
		<div className="cart-content">
			<div className="cart-titles">
				<h3>PRODUCT</h3>
				<h3>PRICE</h3>
				<h3>QUANTITY</h3>
				<h3>TOTAL</h3>
			</div>
			<div className="cart-items">
				{cart.cartItems.map((item) => (
					<div className="cart-item" key={item.id}>
						<div className="cart-product">
							<img src={item.image} alt={item.name} />
							<div className="cart-product-info">
								<h3>{item.name}</h3>
								<p>{item.desc}</p>
								<Button
									onClick={() => handleRemoveProduct(item)}
									type="text"
								>
									Remove
								</Button>
							</div>
						</div>
						<div className="cart-item-price">${item.price}</div>
						<div className="cart-item-quantity">
							<button
								className="decrease"
								onClick={() => handleDecreaseQuantity(item)}
							>
								-
							</button>
							<div className="count">{item.itemQuantity}</div>
							<button
								className="increase"
								onClick={() => handleIncreaseQuantity(item)}
							>
								+
							</button>
						</div>
						<div className="cart-item-total">
							${item.price * item.itemQuantity}
						</div>
					</div>
				))}
			</div>
			<div className="cart-summary">
				<Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
				<div className="cart-checkout">
					<div className="cart-checkout-total">
						<h3>Subtotal</h3>
						<span>${cart.cartTotalAmount}</span>
					</div>
					<p className="cart-checkout-taxes">
						Taxes and shipping calculated at checkout
					</p>
					<Button type="primary" block>
						Check Out
					</Button>
					<div className="continue-shopping">
						<Link to="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-arrow-left"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
								/>
							</svg>
							<span>Continue Shopping</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartContent;
