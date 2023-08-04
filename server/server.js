const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Model = require('./model')

let dbData;
let newfoundData 
app.use(bodyParser.urlencoded({extended:true}))

app.post('/post', (req,res)=>{
    console.log("Myself server singh sandhu")
    let title = (req.body.title)
    let content = req.body.content
    let fullReq = {title:title, content:content}
    let dataObj = new Model.noteModel(fullReq)
    saveData(dataObj)
})

app.post('/delete', async (req, res)=>{
    console.log("mai chal gaya - delete circa 2023")
    await deleteData(req.body)
})
app.get('/', (req,res)=>{
    res.send("Server chal gaya bhaiyonnnn")
})

 app.get('/app', async (req,res)=>{
    
   let x = await findData().then(()=>{
    res.json(JSON.stringify(dbData))
   })

    
})


app.listen('3000', ()=>{
    console.log("Server has been started on port 3000")
})
let data = {title:"Something title", content:"Something content"}

main().catch((err)=>{console.log(err)})
async function main(){
    
    await mongoose.connect('mongodb://127.0.0.1:27017/keeper').then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Could not connect to DB")
    })

}

async function saveData(dataObj){
    await dataObj.save()
    .then(()=>{
        console.log("Data has been successfully saved")
    }).catch((err)=>{
        console.log("could not save data. have fun figuring this one out")
        console.log(err)
    })
}

async function findData(){
    await Model.noteModel.find()
    .then((res)=>{
        dbData =  res
    }).catch((err)=>{
        console.log(err)
    })
}

async function deleteData(obj){
    console.log(obj)
    console.log(obj.title)
    await Model.noteModel.findOneAndRemove({'title':obj.title})
    .then((res)=>{
        console.log("deleted:")
        console.log(res)})
        .catch((err)=>{console.log("Could not delete")
        console.log(err)})
}