const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const { userModel, noteModel } = require("../model");
const { route } = require("./listRoutes");
const { hashPass } = require("../middleware/auth");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
router.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
router.get("/notes", async (req, res) => {
  let userObj = req.body;
  console.log(userObj);
  let userName = userObj.userName;
  await userModel
    .findOne({ userName: userName }, { password: 0 })
    .populate("notes")
    .then((response) => {
      if (response != null) {
        console.log(response);
        res.status(200).json({ authenticated: true, message: response });
      }
    });
});

router.post("/", async (req, res) => {
  let newUserObj = req.body;
  //searching db for username
  let findArray = await userModel.find({ userName: newUserObj.userName });
  if (findArray.length > 0) {
    res
      .status(200)
      .json({
        registered: false,
        message:
          "Username already exists, please log into your account or use a different username.",
      });
    return;
  } else {
    
    let userPass = newUserObj.password;
    let hashedPass = hashPass(userPass);
    let userObj = new userModel({
      userName: newUserObj.userName,
      password: hashedPass,
    });
    userObj
      .save()
      .then((response) => {
        console.log("from register: ", response);
        res
          .status(200)
          .json({ registered: true, message: "Your account has been created" });
      })
      .catch((err) => {
        console.log("from register, an error occured: ", err);
        res
          .status(500)
          .json({
            registered: false,
            message: "Your account has not been created",
          });
      });
  }
});

router.post("/login", async (req, res) => {
  console.log("request body:\n", req.body);
  let userData = req.body;
  let userName = req.body.userName;
  let password = req.body.password;

  await userModel.findOne({ userName: userName }).then((response) => {
    console.log("db response: ", response);
    if (response === null) {
      res
        .status(500)
        .json({
          authenticated: false,
          message: "You do not have an account, please register",
        });
    } else {
      let foundUser = response;
      bcrypt.compare(password, response.password)
      .then((check)=>{
        console.log('from bcrypt compare, ', check)
        if(check){
            res
        .status(200)
        .cookie('loggedIn', true, {maxAge:1800000})
        .json({ authenticated: true, message: "You have been authenticated", userName:response.userName });
        } else {
            res
            .status(500)
            .cookie('loggedIn', false, {maxAge:1800000})
            .json({ authenticated: false, message: "Incorrect password, try again", userName:response.userName });
        }
      })
      .catch((err)=>{
        console.log('err from bcrypt compare, ', err)
        res
            .status(500)
            .cookie('loggedIn', false, {maxAge:1800000})
            .json({ authenticated: false, message: "Incorrect password, try again", userName:response.userName });
      })

    }
  });
});

module.exports = router;
