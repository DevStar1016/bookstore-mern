import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/cart">
            <i className="fa-sharp fa-solid fa-cart-shopping cart-icon" />
          </Link>
        </li>
        {userInfo ? (
          <div class="dropdown" id="username">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userInfo.name}
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <div className="dropdown-item" onClick={logoutHandler}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
