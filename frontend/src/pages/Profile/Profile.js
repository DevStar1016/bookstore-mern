import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="row profile">
      <div className="col-md-3 m-5 pt-5">
        {message && <Message varian="alert-danger">{message}</Message>}
        {error && <Message varian="alert-danger">{error}</Message>}
        {success && <Message varian="alert-success">Profile Updated</Message>}
        {loading && <Loader />}
        <h2 className="text-center green-color">User Profile</h2>
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
            <label className="form-label" htmlFor="email">
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
            <label className="form-label mt-3" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              className="form-control p-3"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-3" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control p-3"
              id="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn profile-btn">
            Update
          </button>
        </form>
      </div>

      <div className="col-md-7 m-5 pt-5 ps-5">
        <h2 className="green-color">My Order</h2>
      </div>
    </div>
  );
};

export default Profile;
