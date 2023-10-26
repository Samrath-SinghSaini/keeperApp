import React, { useState, useEffect } from "react";

import axios from "axios";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  function setVal(e) {
    if (e.target.name == "username") {
      setUserName(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  }

  function showPasswordFunc(){
    !showPassword ? setShowPassword(true) : setShowPassword(false)
    let passwordField = document.getElementById('password')
    if(!showPassword){
      passwordField.type = 'text'
    } else{
      passwordField.type = 'password'
    }
  }
  function sendData() {
    let userData = { userName: userName, password: password };
    console.log(userData);
    if(userName === '' || password === ''){
      setSubmitMessage('One or more fields are empty, please fill all the fields.')
      return 
    }
    axios
      .post("/user", userData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSubmitMessage(response.data.message ?? 'error')
      });
  }
  return (
    <div className="register-container">
      <div className="register-main">
      <h2>Register</h2>
        <h3>Create a new account</h3>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => {
            setVal(e);
          }}
          name="username"
          className="register-input auth-input"
        ></input>
        <div className="pass-div">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setVal(e);
          }}
          name="password"
          id="password"
          className="register-input auth-input password-input"
        ></input>
        <button onClick={showPasswordFunc} className="show-pass">{showPassword ? <VisibilityIcon style={{marginBottom:'-10px'}}/> : <VisibilityOffIcon style={{marginBottom:'-10px'}}/>}</button>
        </div>
        <button onClick={sendData} className="auth-btn">
          Submit
        </button>
        <p>{submitMessage}</p>
      </div>
    </div>
  );
}

export default Register;
