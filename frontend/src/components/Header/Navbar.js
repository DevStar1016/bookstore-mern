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
            <i className="fa-sharp fa-solid fa-cart-shopping cart-icon mt-2 me-3" />
          </Link>
        </li>
        {userInfo ? (
          <div className="dropdown dropdown-nav" id="username">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-button bg-nav-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userInfo.name}
            </button>
            <ul className="dropdown-menu bg-nav-color">
              <li className="bg-nav-color">
                <Link to="/profile" className="dropdown-item bg-nav-color">
                  Profile
                </Link>
              </li>
              <li className="bg-nav-color">
                <div
                  className="dropdown-item bg-nav-color"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <li className="mt-2">
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
