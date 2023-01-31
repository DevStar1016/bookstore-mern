import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="search-bar">
      <input
        type="text"
        className="form-control me-2"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Book..."
      />
      <button type="submit" className="btn search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
