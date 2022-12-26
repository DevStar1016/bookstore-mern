import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Book/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listBookDetails } from "../../actions/bookActions";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  useEffect(() => {
    // const { data } = await axios.get(`/api/books/${id}`);
    dispatch(listBookDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="container book-detail">
      <Link className="btn back-btn" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varian="alert-danger">{error}</Message>
      ) : (
        <div className="row book-item">
          <div className="col md-6 book-img bg-color">
            <img src={book.image} alt={book.name} className="img-fluid" />
          </div>
          <div className="col md-3 bg-color">
            <div className="list-group" varian="flush">
              <div className="list-group-item bg-color">
                <h3>{book.name}</h3>
              </div>
              <div className="list-group-item bg-color">
                <Rating
                  value={book.rating}
                  text={` ${book.numReviews} reviews`}
                  color={"#faeddf"}
                />
              </div>
              <div className="list-group-item bg-color">
                <strong>Price:</strong> ${book.price}
              </div>

              {/* <div className="list-group-item">
                <div className="row">
                  <div className="col">Qty</div>
                  <div className="col">
                    <select
                      className="form-control"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(book.name).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}

              <div className="list-group-item bg-color">
                <strong>Description:</strong> {book.description}
              </div>
            </div>
            <button className="btn btn-add-to-cart" onClick={addToCartHandler}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
