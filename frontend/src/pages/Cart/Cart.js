import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart">
      <div className="row">
        <div className="col-md-8">
          <h2>Cart</h2>
        </div>
        <div className="col-md-4">
          <div className="card checkout-group">
            <div className="list-group" variant="flush">
              <div className="list-group-item bg-color">
                <h2>Sub total (0) Items</h2>
              </div>
              <div className="list-group-item bg-color">
                <Link className="btn checkout-btn" to="/shipping">
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
