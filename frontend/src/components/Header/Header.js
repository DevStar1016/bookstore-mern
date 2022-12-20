import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="website-logo">
        <Link to="/">
          <i className="fa-solid fa-cat"></i>
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
