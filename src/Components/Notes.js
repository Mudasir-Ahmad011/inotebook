
import React,{useContext, useEffect,useRef, useState} from "react";
import NoteContext from "../Context/Notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import AlertContext from "../Context/Alert/AlertContext";

export default function Notes() {
    const ContextAlert = useContext(AlertContext);
    const {showAlert}=ContextAlert;

    const Context = useContext(NoteContext);
    const {notes,getNotes,updateNote}=Context;

    useEffect(()=>{
      getNotes();
      // eslint-disable-next-line
    },[]);
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const ref = useRef(null);
    const refClose = useRef(null);
    const editNote=(Currentnote)=>{
      ref.current.click();
      setNote({id:Currentnote._id,etitle:Currentnote.title,edescription:Currentnote.description,etag:Currentnote.tag});

    };
    const handleClick=(evt)=>{
        evt.preventDefault();
        updateNote(note.id,note.etitle,note.edescription,note.etag);
        ref.current.click();
        showAlert("Note Updated","success");
    };
    const onChange=(evt)=>{
        setNote({...note,[evt.target.name]:evt.target.value});
    };
  return (
    <div>
      <AddNote/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div> 
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<10 || note.etag.length===0} ref={refClose} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note} editNote={editNote}/>
        })}
      </div>
    </div>
  )
}
