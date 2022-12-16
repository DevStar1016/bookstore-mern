import React, { useState, useEffect } from "react";
import Book from "../../components/Book/Book";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get("/api/books");

      setBooks(data);
    };

    fetchBooks();
  }, []);

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
