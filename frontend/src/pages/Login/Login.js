import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { login } from "../../actions/userActions";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loader />}
      <h1 className="text-center green-color">Login</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            className="form-control p-3 mb-2"
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
        <button type="submit" className="btn login-btn">
          Log In
        </button>
        <div className="row py-3">
          <div className="col">
            <Link to="/register" className="green-color">
              Don't have account? Click here
            </Link>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
