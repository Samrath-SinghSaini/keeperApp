const mongoose = require('mongoose')
const { noteModel } = require('./model')
const dotenv = require('dotenv')
dotenv.config()
//since the models and the queries required for the notemodel and the list model are the same, I have used the same methods and passed in the current model as a parameter. 

//db connection string 
async function main(){
    
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Could not connect to DB")
    })

}

//saving to db
async function saveData(dataObj){
    let returnVal
    console.log(dataObj)
     
    await dataObj.save()
    .then((res)=>{
        console.log("Data has been successfully saved")
        returnVal = res
    }).catch((err)=>{
        console.log("could not save data. have fun figuring this one out")
        console.log(err)
        returnVal = null
    })
    return returnVal
}

//this function finds all the data for the given model name
async function findData(modelName, userID){
    let foundVal = {}
    await modelName.find({userID:userID})
    .then((res)=>{

        dbData =  res
        
        foundVal = dbData
    }).catch((err)=>{
        console.log(err)
        foundVal = null
    })
    return foundVal
}

//this function finds all the notes in the db taking the listname parameter from the post request as a filter. if the listname All is requested then it returns all the notes.
async function findNotes(listParam, notes){
    let foundVal = {}
    console.log(listParam)
   
    let listFilter = listParam.listName
    let filter = {list:listFilter, _id:{$in:notes}}
    if(listParam.listName == 'All' || listParam.listName == 'all'){
        filter = {_id:{$in:notes}}
    } else if(listFilter == '' || listFilter == null || listFilter == undefined){
        filter = {list:'Default',  _id:{$in:notes}}
    } 
    
    
    await noteModel.find(filter)
    .then((res)=>{
        dbData =  res
        foundVal = dbData
    }).catch((err)=>{
        console.log(err)
        foundVal = null
    })
    return foundVal
}

//deletes the given object based on the model provided
async function deleteData(obj, modelName){
    
    console.log(obj.title)
    await modelName.findOneAndRemove({title:obj.title})
    .then((res)=>{
        console.log("deleted:")
        console.log(res)})
        .catch((err)=>{console.log("Could not delete")
        console.log(err)})
}
async function deleteNote(obj){
    
    console.log(obj.title)
    let returnObj
    await noteModel.findOneAndRemove({title:obj.title.trim()})
    .then((res)=>{
        console.log("deleted:")
        console.log(res)
        returnObj = res
        })
        .catch((err)=>{console.log("Could not delete")
        console.log(err)
        returnObj = null
    })
    return returnObj
}

module.exports = {main, findData, deleteData, deleteNote, saveData, findNotes}