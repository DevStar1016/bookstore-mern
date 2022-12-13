import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <div className="card book">
      <Link to={`/book/${book._id}`}>
        <img src={book.image} alt="" className="card-img-top" />
      </Link>
      <div className="card-body book-desc">
        <Link to={`/book/${book._id}`}>
          <div className="card-title">
            <strong>{book.name}</strong>
          </div>
          <div className="card-text">
            <div className="my-3">
              {book.rating} from {book.numReviews} reviews
            </div>
          </div>
          <h3 className="card-text">${book.price}</h3>
        </Link>
      </div>
    </div>
  );
};

export default Book;
