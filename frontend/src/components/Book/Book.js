import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
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
            <Rating
              value={book.rating}
              text={` ${book.numReviews} reviews`}
              color={"#ede1d4"}
            />
          </div>
          <h3 className="card-text">${book.price}</h3>
        </Link>
      </div>
    </div>
  );
};

export default Book;
