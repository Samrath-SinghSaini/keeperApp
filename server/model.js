const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:String, 
    content:String, 
    list:String
})
const listSchema = new mongoose.Schema({
    title:String, 
    userID:{type:Schema.Types.ObjectId, ref:'userDb'}
})

const userSchema = new mongoose.Schema({
    userName:{type:String, required:true}, 
    password:{type:String, required:true}, 
    notes:[{type:Schema.Types.ObjectId, ref:'NoteDb'}]
})

const noteModel = mongoose.model('NoteDb', noteSchema)
const listModel = mongoose.model('listDB', listSchema)
const userModel = mongoose.model('userDb', userSchema)
module.exports = {noteModel, listModel,userModel }