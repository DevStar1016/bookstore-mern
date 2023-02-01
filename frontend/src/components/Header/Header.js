import React from "react";
import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="website-logo">
        <Link to="/">
          <ImBooks size="40px" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
