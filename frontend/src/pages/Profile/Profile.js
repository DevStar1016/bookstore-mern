import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";
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

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
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
    <div className="row profile" style={{ paddingTop: "100px" }}>
      <div className="col-md-3 m-5 pt-5">
        {message && <Message variant="alert-danger">{message}</Message>}
        {error && <Message variant="alert-danger">{error}</Message>}
        {success && <Message variant="alert-success">Profile Updated</Message>}
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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant={"alert-danger"}>{error}</Message>
        ) : (
          <table className="table table-bordered table-striped table-hover table-responsive table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "red", background: "none" }}
                      />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "red", background: "none" }}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="btn detail-btn">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
