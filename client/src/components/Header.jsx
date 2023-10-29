import React, { useState, useEffect, useContext } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts";
function Header(props) {
   const { isLoggedIn } = useContext(UserContext);
  const { userName } = useContext(UserContext);
  const object = useContext(UserContext);
  
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  function toggleDarkMode() {
    if (!darkMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }
  // console.log('from header, this is the log in val', userName)
  function logoutFunc() {
    props.setIsLoggedIn(false);
    sessionStorage.removeItem("IsLoggedIn");
    sessionStorage.removeItem("userName");
    axios
      .post("/user/logout")
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    props.useDarkMode(darkMode);
  }, [darkMode]);


  return (
    <div className="header-container">
      <h1 className="main-heading">
        Keeper{" "}
        <EditNoteIcon
          style={{
            fontSize: "32px",
            margin: "0",
            position: "relative",
            top: "8px",
          }}
        />
      </h1>
      <div className="header-btn-div">
        <button
          className="header-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          className="header-btn"
          onClick={() => {
            navigate("/login");
          }}
          style={{ display: !isLoggedIn ? "inline-block" : "none" }}
        >
          Login
        </button>
        <button
          className="header-btn"
          onClick={() => {
            navigate("/register");
          }}
          style={{ display: !isLoggedIn ? "inline-block" : "none" }}
        >
          Register
        </button>
        <button
          className="header-btn"
          onClick={() => {
            navigate("/");
          }}
          style={{ display: isLoggedIn ? "inline-block" : "none" }}
        >
        {userName ?? 'Account'}
        </button>
        <button
          className="header-btn"
          onClick={() => {
            logoutFunc();
            navigate("/login");
          }}
        >
          Logout
        </button>
        <button
          className="header-btn"
          onClick={() => {
            toggleDarkMode();
          }}
        >
          {darkMode ? (
            <DarkModeIcon style={{ marginBottom: "-5px" }} />
          ) : (
            <LightModeIcon style={{ marginBottom: "-5px" }} />
          )}{" "}
        </button>
      </div>
    </div>
  );
}
export default Header;
