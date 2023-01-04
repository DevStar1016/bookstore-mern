import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { getUserDetails } from "../../actions/userActions";
import "./UserEdit.css";

const UserEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="admin/userlist" className="btn back-btn">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varian="alert-danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name:
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

            <div className="form-group">
              <label className="form-label mt-3" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className="form-control p-3"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                />
                <label className="form-check-label">Is Admin</label>
              </div>
            </div>

            <button type="submit" className="btn register-btn">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
