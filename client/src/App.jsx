/* eslint-disable no-unused-vars */
import "vite/modulepreload-polyfill";

//import './App.css'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import Notes from "./notes";
import Entry from "./components/Entry";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { Routes, Route, useParams } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login'
import UserContext from "./Contexts";

function App() {
  const [entry, setEntry] = useState([]);
  const [data, setData] = useState();
  const [api, setApi] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [listArray, setListArray] = useState(["Default"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState(null)
  let newArr = [];
  useEffect(()=>{
    window.open('https://keeperappbackend-ijry.onrender.com', '_blank')
  }, [isLoggedIn])
  
  useEffect(() => {
    let loginVal = sessionStorage.getItem('IsLoggedIn')
    let loggedInUser = sessionStorage.getItem('userName')
    if(loginVal){
      setIsLoggedIn(true)
    }
    if(loggedInUser){setUserName(loggedInUser) 
      console.log(loggedInUser)}
  }, []);

  let newNote = function (noteObject) {
    let count = 4;
    count += 1;
    setEntry((prevItems) => {
      return [...prevItems, noteObject];
    });
  };

  function getLoginCookieVal(){
    let cookies = document.cookie?.split('; ')
    let loggedInCookie = cookies?.find((element)=>{return element.startsWith('loggedIn')})
    let isLoggedIn = loggedInCookie?.split('=')[1]
    return isLoggedIn
  }

  function changeLogin(loggedIn, userName){
    setIsLoggedIn(loggedIn)
    setUserName(userName)
    sessionStorage.setItem('IsLoggedIn', true)
    sessionStorage.setItem('userName', userName)
  }
  function dataTwo(noteObject) {
    Axios.post("/api/post", noteObject, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(() => {
        console.log("success");
        console.log("THis is api sent:" + api);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteEntry(key) {
    let newArr = entry.filter((value, index) => {
      if (index != key) {
        return value;
      }
    });
    setEntry(newArr);

    let element = entry[key];
    // entry.filter((value, index)=>{
    //   if(index == key){
    //     return value
    //   }
    // })
    Axios.post("/api/delete", element, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }
  function changeBackground(mode) {
    setDarkMode(mode);
  }
  useEffect(() => {
    if (!darkMode) {
      document.body.style.backgroundColor = "#dfdfde";
    } else {
      document.body.style.backgroundColor = "#393E46";
    }
  }, [darkMode]);

  ////////////////////////

  return (
    <div
      className="root-container"
      style={
        darkMode
          ? { backgroundColor: "#393E46" }
          : { backgroundColor: "#dfdfde" }
      }
    >
      
      <UserContext.Provider value={{userName,isLoggedIn}}>
      <Header useDarkMode={changeBackground} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
      <Route path="/" element={isLoggedIn ? <Home list={listArray} setListArray={setListArray} userName={userName}/> : <Login changeLogin={changeLogin}/>}></Route>
      <Route path="/:listName" element={ isLoggedIn ? <Home list={listArray} setListArray={setListArray} userName={userName}/> : <Login changeLogin={changeLogin}/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login changeLogin={changeLogin}/>}></Route>
      </Routes>
      </UserContext.Provider>
      
      <Footer />
    </div>
  );
}

export default App;
