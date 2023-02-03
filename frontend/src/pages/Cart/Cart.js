import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import "./Cart.css";

const Cart = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qty = Number(searchParams.get("qty"));
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // navigate("/login?redirect=shipping");
    navigate("/shipping");
  };

  return (
    <div className="cart row">
      <div className="col-md-8 ">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="list-group bg-color cart-item">
            {cartItems.map((item) => (
              <div className="list-group-item bg-color" key={item.book}>
                <div className="row">
                  <div className="col-md-2">
                    <img
                      className="img-fluid rounded"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-3">
                    <Link to={`/book/${item.book}`}>{item.name}</Link>
                  </div>
                  <div className="col-md-2">${item.price}</div>
                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.book, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-light"
                      onClick={() => removeFromCartHandler(item.book)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-md-4">
        <div className="card checkout-group">
          <div className="list-group">
            <div className="list-group-item bg-color">
              <h2>
                Sub total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
            <div className="list-group-item bg-color">
              <button
                type="button"
                className="btn checkout-btn"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
