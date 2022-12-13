import React from "react";
import "./Header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="website-logo">
        <i className="fa-solid fa-cat"></i>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
