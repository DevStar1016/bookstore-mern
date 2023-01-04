import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { register } from "../../actions/userActions";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
      navigate("/");
    }
  };

  return (
    <FormContainer>
      {message && <Message variant="alert-danger">{message}</Message>}
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loader />}
      <h1 className="text-center green-color">Register</h1>
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
        <button type="submit" className="btn register-btn">
          Register
        </button>
        <div className="row py-3">
          <div className="col">
            <Link to="/login" className="green-color">
              You Have an Account? Click here to login
            </Link>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;
