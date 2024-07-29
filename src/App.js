import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import AlertState from "./Context/Alert/AlertState";



function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
        <Navbar/>
        <Alert />
          <div className="container">
          <Routes>
            <Route exact path="/home" element={<Home/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/"  element={<Login/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
          </Routes>
          </div>
        </Router>
        </NoteState>
        </AlertState>
    </>
  );
}

export default App;
