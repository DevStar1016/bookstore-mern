import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { saveShippingAddress } from "../../actions/cartActions";
import "./Shipping.css";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <form onSubmit={submitHandler} className="mt-5">
        <div className="form-group mt-4">
          <label className="form-label" htmlFor="name">
            Address:
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="name"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group mt-4">
          <label className="form-label" htmlFor="name">
            City:
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="name"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group mt-4">
          <label className="form-label" htmlFor="name">
            Postal Code:
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="name"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="form-group mt-4">
          <label className="form-label" htmlFor="name">
            Country:
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="name"
            placeholder="Enter postal code"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit" className="btn shipping-btn">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
