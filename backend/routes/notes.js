const express = require("express")
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");


// Route1: Notes || fetch all notes || Login Required
router.get('/fetchnotes',fetchuser,async (req,res)=>{
    try{
    const note = await Note.find({user : req.user.id});
    res.send(note);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

// Route2: Notes || Adding a note || Login Required
router.post('/addnote',fetchuser,[
    body("title","Enter the valid title").isLength({min:3}),
    body("description","Description should be at least 10 characters").isLength({min:10})
],async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {title,description,tag} = req.body;
        const note = new Note({
            user:req.user.id,
            title,
            description,
            tag
        })
       const savedNote = await note.save();
        res.json(savedNote);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route3: Notes || Updating a note || Login Required
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const{title,description,tag}=req.body;
    try{

        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        if(note.user.toString() !==req.user.id){return res.status(401).send("Not Allowed")};

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});


    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route4: Notes || Deleting a note || Login Required
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    try{        
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        if(note.user.toString() !==req.user.id){return res.status(401).send("Not Allowed")};

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted",note:note});


    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;