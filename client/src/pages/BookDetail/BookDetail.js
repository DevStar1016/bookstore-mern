import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/Book/Rating";
import "./BookDetail.css";

const BookDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await axios.get(`/api/books/${id}`);
      setBook(data);
    };

    fetchBook();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container book-detail">
      <Link className="btn goback-btn" to="/">
        Go Back
      </Link>
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
            <div className="list-group-item bg-color">
              <strong>Description:</strong> {book.description}
            </div>
          </div>
          <button className="btn btn-add-to-cart">
            Add to Cart | {book.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
