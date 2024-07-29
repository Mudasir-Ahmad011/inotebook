import React,{useContext, useState} from "react";
import NoteContext from "../Context/Notes/NoteContext";
import AlertContext from "../Context/Alert/AlertContext";

export default function AddNote() {
    const ContextAlert = useContext(AlertContext);
    const {showAlert}=ContextAlert;

    const Context = useContext(NoteContext);
    const {addNote}=Context;

    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(evt)=>{
        evt.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        showAlert("Note Added","success");
    };
    const onChange=(evt)=>{
        setNote({...note,[evt.target.name]:evt.target.value});
    };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
            <div id="title" className="form-text">Title should be atleast 3 characters long.</div>

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
            <div id="description" className="form-text">Description should be atleast 10 characters long.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>

          <button disabled={note.title.length<3 || note.description.length<10 || note.tag.length===0} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
