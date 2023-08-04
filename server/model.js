const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:String, 
    content:String
})

const noteModel = mongoose.model('NoteDb', noteSchema)

module.exports = {noteModel}