import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import Paginate from "../../components/Paginate/Paginate";
import { listBooks, deleteBook, createBook } from "../../actions/bookActions";
import { BOOK_CREATE_RESET } from "../../constants/bookConstants";
import "./BookList.css";

const BookList = () => {
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books, page, pages } = bookList;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/book/${createdBook._id}/edit`);
    } else {
      dispatch(listBooks("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdBook,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteBook(id));
    }
  };

  const createBookHandler = () => {
    dispatch(createBook());
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <>
          <table className="table table-bordered table-striped table-hover table-responsive table-sm">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>NAME</th>
                <th>AUTHOR</th>
                <th>GENRE</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="text-center">
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
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => deleteHandler(book._id)}
                    >
                      <i className="fas fa-trash color-red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default BookList;
