import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import SearchBar from "../SearchBar/SearchBar";
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
        <li className="search-bar">
          <SearchBar />
        </li>
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
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown dropdown-nav ms-4 me-4" id="admin-menu">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-button bg-nav-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </button>
            <ul className="dropdown-menu bg-nav-color">
              <li className="bg-nav-color">
                <Link
                  to="/admin/userlist"
                  className="dropdown-item bg-nav-color"
                >
                  Users
                </Link>
                <Link
                  to="/admin/booklist"
                  className="dropdown-item bg-nav-color"
                >
                  Books
                </Link>
                <Link
                  to="/admin/orderlist"
                  className="dropdown-item bg-nav-color"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
