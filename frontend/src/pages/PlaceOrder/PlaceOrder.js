import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="place-order">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row ">
        <div className="col-md-8">
          <div className="list-group-flush">
            <div className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <hr />
            <div className="list-group-item pt-4">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>
            <hr />
            <div className="list-group-item pt-4">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>You cart is empty</Message>
              ) : (
                <div className="list-group">
                  {cart.cartItems.map((item, index) => (
                    <div className="list-group-item bg-color" key={index}>
                      <div className="row">
                        <div className="col-md-1">
                          <img
                            className="img-fluid"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="col">
                          <Link to={`/book/${item.book}`}>{item.name}</Link>
                        </div>
                        <div className="col-md-4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="list-group">
              <div className="list-group-item bg-color">
                <h2>Order Summary</h2>
              </div>
              <div className="list-group-item bg-color">
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${cart.itemsPrice}</div>
                </div>
              </div>
              <div className="list-group-item bg-color">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${cart.shippingPrice}</div>
                </div>
              </div>
              <div className="list-group-item bg-color">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${cart.taxPrice}</div>
                </div>
              </div>
              <div className="list-group-item bg-color">
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${cart.totalPrice}</div>
                </div>
              </div>
              <div className="list-group item bg-color">
                {error && <Message variant={"alert-danger"}>{error}</Message>}
              </div>
              <div className="list-group-item bg-color">
                <button
                  className="btn place-order-btn"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
