import React from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { registerUser } from "../services/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(username, password);
      navigate("/successful-register");
    } catch (err) {
      const msg = err.response.data.msg;
      setNotification({ color: "red", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container  form-container ">
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
        <button className="form-btn btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
