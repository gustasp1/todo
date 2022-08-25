import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Collections from "./routes/Collections";
import Error from "./components/Error";
import SingleCollection from "./routes/SingleCollection";
import "./styles/App.css";
import Shared from "./components/Shared";
import { getUserInfo } from "./services/user";
import SuccessfulRegister from "./routes/SuccessfulRegister";

function App() {
  const [loggenIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUserInfo()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shared loggenIn={loggenIn} />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route
              path="collections/:collectionId"
              element={<SingleCollection />}
            />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="register" element={<Register />} />
          <Route path="successful-register" element={<SuccessfulRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
