import React from "react";
import "./Header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="website-logo">
        <a href="#">
          <i className="fa-solid fa-cat"></i>
        </a>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
