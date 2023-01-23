import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { savePaymentMethod } from "../../actions/cartActions";
import "./Payment.css";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <form onSubmit={submitHandler} className="mt-5">
        <div className="form-group">
          <div className="form-label">Select Method</div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="PayPal"
                name="paymentMethod"
                id="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="PayPal">
                PayPal or Credit Card
              </label>
            </div>
            {/* <div className="form-check" name="paymentMethod">
              <input
                className="form-check-input"
                type="radio"
                value="Stripe"
                name="paymentMethod"
                id="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="Stripe">
                Stripe
              </label>
            </div> */}
          </div>
        </div>
        <button type="submit" className="btn payment-btn">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Payment;
