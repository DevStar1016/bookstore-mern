import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="spinner-border text-success loader" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
