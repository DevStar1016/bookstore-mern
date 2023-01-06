import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { listBookDetails, updateBook } from "../../actions/bookActions";
import { BOOK_UPDATE_RESET } from "../../constants/bookConstants";
import "./BookEdit.css";

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      navigate("/admin/booklist");
    } else {
      if (!book.name || book._id !== id) {
        dispatch(listBookDetails(id));
      } else {
        setName(book.name);
        setPrice(book.price);
        setImage(book.image);
        setAuthor(book.author);
        setGenre(book.genre);
        setCountInStock(book.countInStock);
        setDescription(book.description);
      }
    }
  }, [dispatch, id, book, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      console.log(data);
      setImage(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({
        _id: id,
        name,
        price,
        image,
        author,
        genre,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link className="btn back-btn" to="/admin/booklist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="mb-5">
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                className="form-control p-3"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="image">
                Image
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="image"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                className="form-control"
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
              />

              {uploading && <Loader />}
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="author"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="genre">
                Genre
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="genre"
                placeholder="Enter Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="countInStock">
                Count In Stock
              </label>
              <input
                type="number"
                className="form-control p-3"
                id="countInStock"
                placeholder="Enter Genre"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn bookEdit-btn">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default BookEdit;
