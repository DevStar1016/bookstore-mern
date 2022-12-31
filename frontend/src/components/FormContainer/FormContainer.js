import React from "react";
import "./FormContainer.css";

const FormContainer = ({ children }) => {
  return (
    <div className="container form-container">
      <div className="row justify-content-md-center">
        <div className="col col-12 col-md-6">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
