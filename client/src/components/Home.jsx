import "vite/modulepreload-polyfill";

//import './App.css'
import Note from "./Note";
import Notes from "../notes";
import Entry from "./Entry";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

function Home(props) {
  let { listName } = useParams();
 
  let newNoteEntry = {
    key: null,
    title: "",
    content: "",
  };
  const [entry, setEntry] = useState([]);
  const [data, setData] = useState();
  const [api, setApi] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  let userName = props.userName ?? ''
  let newArr = [];
  useEffect(() => {
    // ?listName=${getParam}
    let getParam = listName ?? 'Default'
    Axios.get(`/note/app`, {params:{listName:getParam, userName:props.userName}}).then((response) => {
      let res = response.data.data
      // console.log(res)
      res.forEach((element) => {
        let newObj = {
          title: element.title,
          content: element.content,
        };
        newArr.push(newObj);
      });
      if (newArr) {
        setEntry(newArr);
       
      }
    });
  }, []);

  let newNote = function (noteObject) {
    let count = 4;
    count += 1;
    setEntry((prevItems) => {
      return [...prevItems, noteObject];
    });
  };

  function dataTwo(noteObject) {
    Axios.post("/note/post", noteObject, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(() => {
        // console.log("success");
        // console.log("THis is api sent:" + api);
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
    let element = entry[key];
    setEntry(newArr);
    // console.log(`from delete func`)
    // console.log(element)
    // entry.filter((value, index)=>{
    //   if(index == key){
    //     return value
    //   }
    // })
    Axios.delete(`/note/delete?title=${element.title}`,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
      // .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="main">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-section">
        <Entry addNote={newNote} sendData={dataTwo} listName={listName} />

        {entry.map((element, index) => {
          return (
            <Note
              title={element.title}
              content={element.content}
              key={index}
              deleteNote={(id) => {
                deleteEntry(id);
              }}
              id={index}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Home;
