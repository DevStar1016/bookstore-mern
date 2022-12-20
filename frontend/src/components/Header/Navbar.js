import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fa-sharp fa-solid fa-cart-shopping cart-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
