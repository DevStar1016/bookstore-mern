import React from "react";
import books from "../../books";
import Book from "../../components/Book/Book";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <div className="title">
        <h2>All Books</h2>
        <p>Mua sách truyện tiếng Anh, sách ngoại văn.</p>
      </div>

      <div className="books">
        {books.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
