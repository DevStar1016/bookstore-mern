import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { listBooks } from "../../actions/bookActions";
import "./BookList.css";

const BookList = () => {
  const dispatch = useDispatch();
  const negative = useNavigate();
  const { id } = useParams();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBooks());
    } else {
      negative("/login");
    }
  }, [dispatch, userInfo, negative]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      console.log("delete");
    }
  };

  const createBookHandler = (book) => {
    console.log("add");
  };

  return (
    <div className="p-5">
      <div className="row align-items-center pt-5">
        <div className="col">
          <h1>Books</h1>
          <div className="col text-right">
            <button className="btn add-book-btn" onClick={createBookHandler}>
             
              Create Book
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <table className="table table-bordered table-striped table-hover table-responsive table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AUTHOR</th>
              <th>GENRE</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>
                  <Link to={`/admin/book/${book._id}/edit`}>
                    <button className="btn btn-light btn-sm">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteHandler(book._id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
