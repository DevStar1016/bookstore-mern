import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <Link className="btn checkout-btn" to="/shipping">
        Thanh toán
      </Link>
    </div>
  );
};

export default Cart;
