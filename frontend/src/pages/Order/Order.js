import { useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import "./Order.css";

const Order = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // Calculate price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = true;

      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      }
    }
  }, [order, dispatch, id, successPay, successDeliver, navigate, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="alert-danger">{error}</Message>
  ) : (
    <>
      <div className="order">
        <h1 className="pb-5">Order {order._id}</h1>
        <div className="row ">
          <div className="col-md-8">
            <div className="list-group-flush">
              <div className="list-group-item">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                </p>

                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant={"alert-success"}>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant={"alert-danger"}>Not Delivered</Message>
                )}
              </div>
              <hr />
              <div className="list-group-item pt-4">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant={"alert-success"}>
                    Paid on {order.paidAt}
                  </Message>
                ) : (
                  <Message variant={"alert-danger"}>Not Paid</Message>
                )}
              </div>
              <hr />
              <div className="list-group-item pt-4">
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>You cart is empty</Message>
                ) : (
                  <div className="list-group">
                    {order.orderItems.map((item, index) => (
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
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
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
                    <div className="col">${order.itemsPrice}</div>
                  </div>
                </div>
                <div className="list-group-item bg-color">
                  <div className="row">
                    <div className="col">Shipping</div>
                    <div className="col">${order.shippingPrice}</div>
                  </div>
                </div>
                <div className="list-group-item bg-color">
                  <div className="row">
                    <div className="col">Tax</div>
                    <div className="col">${order.taxPrice}</div>
                  </div>
                </div>
                <div className="list-group-item bg-color">
                  <div className="row">
                    <div className="col">Total</div>
                    <div className="col">${order.totalPrice}</div>
                  </div>
                </div>
                {!order.isPaid && (
                  <div className="list-group-item bg-color">
                    {loadingPay && <Loader />}

                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="list-group-item bg-color">
                      <button
                        className="btn order-btn"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
