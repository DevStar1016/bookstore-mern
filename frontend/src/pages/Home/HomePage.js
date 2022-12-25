import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../components/Book/Book";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listBooks } from "../../actions/bookActions";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="title">
        <h2>All Books</h2>
        <p>Mua sách truyện tiếng Anh, sách ngoại văn.</p>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varian="alert-danger">{error}</Message>
      ) : (
        <div className="books">
          {books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
