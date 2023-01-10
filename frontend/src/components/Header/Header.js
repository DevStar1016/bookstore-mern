import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="website-logo">
        <Link to="/">
          <i className="fa-solid fa-book-open"></i>
        </Link>
        
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
