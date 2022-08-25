import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getUserInfo } from "../services/user";

function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo()
      .then((response) => {
        const user = response.data.user;

        setUsername(user.username);
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="main-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="center">
              <h1>Welcome, {username}</h1>
              <Link className="collections-link btn" to="/collections">
                Collections
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
