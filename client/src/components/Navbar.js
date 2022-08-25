import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/user";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();

    navigate("/login");
  };

  return (
    <nav>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/collections">
          Collections
        </Link>
      </div>
      <div className="navbar-link" onClick={logout}>
        logout
      </div>
    </nav>
  );
};

export default Navbar;
