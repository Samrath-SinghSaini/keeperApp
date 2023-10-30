const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { noteModel, listModel, userModel } = require("../model");
const {
  saveData,
  findData,
  deleteData,
  deleteNote,
  main,
  findNotes,
} = require("../queries");
const listRoutes = require("../routes/listRoutes");
const userRoutes = require("../routes/authRoutes");
let dbData;
let newfoundData;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/list", listRoutes);
app.use("/api/user", userRoutes);

//all the notes routes are in the main file. Why? why have I added all the routes for the notes in the main file itself? well because at the time I wrote this code I didn't know enough about routing to create a different file. And even though I should make a separate file I will not because I do not want to spend even a second longer debugging this app. that's why. But I might do that just because who knows

app.post("/api/note/post", async (req, res) => {
  console.log("Myself server singh sandhu");
  console.log(req.body);
  let title = req.body.title;
  let content = req.body.content;
  let listName = req.body.listName;
  let userName = req.body.userName;
  let fullReq = { title: title, content: content, list: listName };
  let dataObj = new noteModel(fullReq);
  let save = await saveData(dataObj);
  console.log("from /note/post");
  console.log(save._id);
  let user = await userModel.findOne({ userName: userName });
  if (user !== null) {
    console.log(user.notes);
    console.log(user.notes.push(save._id));
    user.save();
    console.log(user.notes);
  }
});

app.delete("/api/note/delete", async (req, res) => {
  console.log("mai chal gaya - delete circa 2023");
  let deletedNote = await deleteNote(req.query);
  if (deletedNote !== null) {
    let user = await userModel.findOne({ userName: "oneUser" });
    let index = user.notes.indexOf(deletedNote._id);
    if (index > -1) {
      user.notes.splice(index, 1);
      user.save();
    }
  }
});
app.get("/", (req, res) => {
  res.status(200).json({connected:true, message:"You are connected to the backend API server of the Note Keeper Application built by Samrath Singh Saini"})
});

app.get("/api/note/app", async (req, res) => {
  let listParam = req.query;
  console.log("listparam");
  console.log(listParam);
  let userNotesArr = [];
  let userName = listParam.userName;
  let userNotes = await userModel.findOne(
    { userName: userName },
    { notes: 1, _id: 0 }
  );
  if (userNotes) {
    console.log("these are the user notes.");
    console.log(userNotes);

    findNotes(listParam, userNotes.notes)
      .then((response) => {
        res.json({ data: response, message: "success" });
      })
      .catch((err) => {
        res.json({ data: err, message: "your request could not be completed" });
      });
  }
});

app.listen("3000", () => {
  console.log("Server has been started on port 3000");
});
let data = { title: "Something title", content: "Something content" };

main().catch((err) => {
  console.log(err);
});
