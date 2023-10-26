const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {listModel, noteModel,userModel} = require('../model')
const router = express.Router()
const {saveData, findData, deleteData, main} = require('../queries')

// router.use(()=>{
//     console.log('list route in use')
//     next()
// })
//all the routes for the lists 
router.get('/app', async (req,res)=>{
    let userName = req.query.userName
    console.log('from list get, ', userName)
    let userID = await userModel.find({userName:userName}, {_id:1})
    if(userID){
        let x = await findData(listModel, userID).then((response)=>{
            console.log('find list data response')
            console.log(response)
            res.json({listNames:response})
           })
           .catch((err)=>{
            console.log(err)
            res.status(500).json({listNames:null})
           })
    }
  
})

router.post("/post", async (req, res) => {
    console.log("Myself list singh saini");
   

    
    console.log('provided username',req.body.userName)
    let userName = req.body.userName
    let listTitle = req.body.title
    let userID = await userModel.findOne({userName:userName}, {_id:1})
    if(listTitle === undefined || null || ''){listTitle = 'Default'}
    let data = {title:req.body.title, userID:userID};
    let dataObj = new listModel(data);
    try{
        let post = await saveData(dataObj);
        console.log(post)
        res.status(200).json({saved:true, message:"your data has been saved"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({saved:false,message:err})
    }
    
  });
  
  
  router.delete("/delete", async (req, res) => {
    console.log("mai chal gaya - delete circa 2023");
    await deleteData(req.query, listModel);
  });

  
 module.exports = router