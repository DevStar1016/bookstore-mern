import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#">Sign In</a>
        </li>
        <li>
          <a href="#">
            <i className="fa-sharp fa-solid fa-cart-shopping cart-icon"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
