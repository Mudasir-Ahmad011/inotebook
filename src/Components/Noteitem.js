import React,{useContext} from "react";
import NoteContext from "../Context/Notes/NoteContext";
import AlertContext from "../Context/Alert/AlertContext";

export default function Noteitem(props) {
  const ContextAlert = useContext(AlertContext);
  const {showAlert}=ContextAlert;

  const Context = useContext(NoteContext);
  const {deleteNote}=Context;
  const { note,editNote } = props;
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="far fa-edit mx-2" onClick={()=>{editNote(note);}}></i>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted","success"); }}></i>
          </div>
          <p className="card-text">{note.description}</p>

        </div>
      </div>
    </div>
  );
}
