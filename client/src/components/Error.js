import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="error-container">
      <h1>Page not found</h1>
      <button className="form-btn btn error-btn" onClick={handleClick}>
        Home
      </button>
    </div>
  );
};

export default Error;
