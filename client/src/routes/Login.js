import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";
import { loginUser } from "../services/user";
import { ThreeDots } from "react-loader-spinner";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await loginUser(username, password);
      setUsername("");
      setPassword("");
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      setNotification({ color: "red", msg: "Wrong username or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-container form-container ">
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {loading && (
            <ThreeDots
              height="20"
              width="20"
              radius="9"
              color="#1a73e8"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}
          {notification && <Notification notification={notification} />}
          <button className="form-btn btn">Login</button>
          <div className="create-account-container">
            <span>
              <Link to="/register" className="create-account dark-blue">
                Create an account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
