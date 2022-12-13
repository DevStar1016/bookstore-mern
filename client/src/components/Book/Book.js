import React from "react";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <div className="card book">
      <a href={`/book/${book._id}`}>
        <img src={book.image} alt="" className="card-img-top" />
      </a>
      <div className="card-body book-desc">
        <a href={`/book/${book._id}`}>
          <div className="card-title">
            <strong>{book.name}</strong>
          </div>
          <div className="card-text">
            <div className="my-3">
              {book.rating} from {book.numReviews} reviews
            </div>
          </div>
          <h3 className="card-text">${book.price}</h3>
        </a>
      </div>
    </div>
  );
};

export default Book;
