import React from "react";
import books from "../../books";
import Book from "../../components/Book/Book";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>All Books</h1> 
      <div className="books">
        {books.map((book) => (
          <div className="book">
            <Book book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
