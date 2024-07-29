import { useState } from "react";
import NoteContext from "./NoteContext";;

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const Notes=[];
    const [notes,setNotes] = useState(Notes);
    
      const getNotes=async () =>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth-token",localStorage.getItem("token"));
        
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
          method: "GET",
          headers: myHeaders
        });
        const data = await response.json();
        setNotes(data);

      };

      const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
    
        const note = await response.json();
        setNotes(notes.concat(note))
      }
      const deleteNote=async (id)=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth-token",localStorage.getItem("token"));
        
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: myHeaders
        });
        const data =await response.json();
        console.log(data);

        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      const updateNote=async (id,title,description,tag)=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth-token",localStorage.getItem("token"));
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ title,description,tag })
        });
        const data =await response.json();
        console.log(data);
        //To make the deep copy of notes so we can edit it
        let newNotes = JSON.parse(JSON.stringify(notes));

        for(let index = 0;index<newNotes.length;index++){
          let element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            setNotes(newNotes);
            break;
          }
        }
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,updateNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;