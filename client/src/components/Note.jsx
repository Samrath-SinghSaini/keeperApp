import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
function Note(prop) {
  function deleteFunc(){
    console.log("To be deleted: Note - "+ prop.id)
    prop.deleteNote(prop.id)
  }
  return (
    <div className="main-cont">
      <div className="note-container">
        <div className="title-container">
          <h3 className="noteTitle">{prop.title}</h3>
        </div>

        <div className="content-container">
          <p className="notePara">{prop.content.slice(0, 150)}</p>
        </div>
        <button className="delete-btn" onClick={deleteFunc}><DeleteIcon/></button>
      </div>
    </div>
  );
}
export default Note;
