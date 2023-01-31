import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="nav justify-content-center mb-4">
      <div className="nav-item">
        {step1 ? (
          <Link to="/login" className="step">
            <div className="nav-link step">Login</div>
          </Link>
        ) : (
          <div className="nav-link step disabled" disabled>
            Login
          </div>
        )}
      </div>

      <div className="nav-item">
        {step2 ? (
          <Link to="/shipping" className="step">
            <div className="nav-link step">Shipping</div>
          </Link>
        ) : (
          <div className="nav-link step disabled" disabled>
            Shipping
          </div>
        )}
      </div>

      <div className="nav-item">
        {step3 ? (
          <Link to="/payment" className="step">
            <div className="nav-link step">Payment</div>
          </Link>
        ) : (
          <div className="nav-link step disabled" disabled>
            Payment
          </div>
        )}
      </div>

      <div className="nav-item">
        {step4 ? (
          <Link to="/placeorder" className="step">
            <div className="nav-link step">Place Order</div>
          </Link>
        ) : (
          <div className="nav-link step disabled" disabled>
            Place Order
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
