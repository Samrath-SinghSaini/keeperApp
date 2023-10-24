import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Zoom } from '@mui/material';
import Axios from 'axios'

import Note from "./Note";
function Entry(props) {
  let listName  = props.listName ?? 'Default'
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    listName:listName
  });
  const [isExpanded, setIsExpanded] = useState(false)
  const [placeholder, setPlaceholder] = useState({title:'Add title', content:'Add content'})

  function btnClickFunc(event){
    //event.preventDefault()
    if(newEntry.title !== '' && newEntry.content !== ''){
      let postData = {
        title: newEntry.title.trim(),
        content: newEntry.content,
        listName:newEntry.listName
      }
      props.addNote(postData);
      //props.sendData()
      props.sendData(postData)
      setNewEntry({title:'', content:'', listName:listName})
      setPlaceholder({title:'Add Title', content:'Add Content'})
    } else{
      setPlaceholder({title:'Note cannot be empty', content:''})
    }      
  }
  function changeValue(event) {
    const { name, value } = event.target;
    if (name == "title") {
      setNewEntry((prevVal) => {
        
        return {
          ...prevVal,
          title: value,
        };
      });
    } else if (name == "content") {
      setNewEntry((prevVal) => {
        return {
          ...prevVal,
          content: value,
        };
      });
    }
  }
  function expandInput(){
    setIsExpanded(true)
  }
  return (
    <div className="add-note-container" style={{height:isExpanded?"150px":"30px"}}>
      <input
        type="text"
        name="title"
        className="add-title"
        value={newEntry.title}
        onChange={(event) => {
          changeValue(event);
        }}
        onClick={expandInput}
        placeholder={placeholder.title}
      />
      <div style={{visibility:isExpanded? "visible" :"hidden"}}>
      <textarea
        className="add-note"
        name="content"
        value={newEntry.content}
        onChange={(event) => {
          changeValue(event);
        }}
        placeholder={placeholder.content}
         
      ></textarea>

      <button className="add-btn"
        onClick={btnClickFunc}>

       <AddIcon className="add-icon"/>
      </button>
      <form method="post" action="/">
        <button onClick={btnClickFunc}>Back</button>
      </form>
      </div>
    </div>
  );
}
export default Entry;
