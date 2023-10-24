const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {listModel, noteModel} = require('../model')
const router = express.Router()
const {saveData, findData, deleteData, main} = require('../queries')

// router.use(()=>{
//     console.log('list route in use')
//     next()
// })
//all the routes for the lists 
router.get('/app', async (req,res)=>{
    let x = await findData(listModel).then((response)=>{
        console.log(response)
        res.json({listNames:response})
       })
       .catch((err)=>{
        console.log(err)
        res.status(500).json({listNames:null})
       })
})

router.post("/post", async (req, res) => {
    console.log("Myself list singh saini");
    console.log(req.body.title)

    let title = {title:req.body.title};
    let dataObj = new listModel(title);
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