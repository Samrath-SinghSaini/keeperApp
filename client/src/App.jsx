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

function App() {
  const [entry, setEntry] = useState([]);
  const [data, setData] = useState();
  const [api, setApi] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [listArray, setListArray] = useState(["Default"]);
  let newArr = [];

  
  useEffect(() => {
    
  }, []);

  let newNote = function (noteObject) {
    let count = 4;
    count += 1;
    setEntry((prevItems) => {
      return [...prevItems, noteObject];
    });
  };

  function dataTwo(noteObject) {
    Axios.post("/post", noteObject, {
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
    Axios.post("/delete", element, {
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
      <Header useDarkMode={changeBackground} />
      <Routes>
      
      <Route path="/" element={<Home list={listArray} setListArray={setListArray} />}></Route>
      <Route path="/:listName" element={<Home list={listArray} setListArray={setListArray} />}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      </Routes>
      
      
      <Footer />
    </div>
  );
}

export default App;
