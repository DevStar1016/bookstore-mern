import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/cart">Sign In</Link>
        </li>
        <li>
          <Link to="/login">
            <i className="fa-sharp fa-solid fa-cart-shopping cart-icon"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
