import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Shared = ({ loggenIn }) => {
  return (
    <>
      {loggenIn && <Navbar />}
      <Outlet />
    </>
  );
};

export default Shared;
