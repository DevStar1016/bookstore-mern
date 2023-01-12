import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { listTopBooks } from "../../actions/bookActions";
import "./Carousel.css";

const Carousel = () => {
  const dispatch = useDispatch();

  const bookTopRated = useSelector((state) => state.bookTopRated);
  const { loading, error, books } = bookTopRated;

  useEffect(() => {
    dispatch(listTopBooks());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="alert-danger">{error}</Message>
  ) : (
    <div
      id="carouselExampleIndicators"
      className="book-carousel carousel bg-dark"
      data-pause="hover"
    >
      {books.map((book) => (
        <div key={book._id} className="carousel-item active">
          <Link to={`/book/${book._id}`}>
            <img src={book.image} alt={book.name} />
            <div className="carousel-caption">
              <h2>
                {book.name} ({book.price})
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
