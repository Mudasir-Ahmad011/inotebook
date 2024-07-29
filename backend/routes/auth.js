const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_secret = "mudasir$by";

//Route1: Authentication || create user || no login required
router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password should be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "The user email already exist" });
      }


      let salt =  await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password,salt);



      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      let data = {
        user:{
            id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_secret);
      success=true;
      res.json({success,authtoken});
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route2: Authentication || login || no login required
router.post(
    "/login",
    [
      body("email", "Enter the valid email").isEmail(),
      body("password", "Password should not be blank").exists()
    ],
    async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body
      try {
        let user = await User.findOne({ email });
        if (!email) {
          return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        let passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
           return res.status(400).json({success, error: "Please try to login with correct credentials" });   
        }

        let data = {
          user:{
              id:user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_secret);
        success=true;
        res.json({success,authtoken});
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    }
  );

// Route3: Authentication || Get user Data || Login Required
router.post("/getuser",fetchuser,async (req, res) => {
    try{
    let userid = req.user.id;
    let user = await User.findById(userid).select("-password");
    res.send(user);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
});
module.exports = router;
