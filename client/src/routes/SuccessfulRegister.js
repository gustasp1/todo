import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessfulRegister = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="error-container">
      <h1>You have successfully registered!</h1>
      <button className="form-btn btn error-btn" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default SuccessfulRegister;
