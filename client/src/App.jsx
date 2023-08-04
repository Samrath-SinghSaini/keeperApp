/* eslint-disable no-unused-vars */
import 'vite/modulepreload-polyfill'

//import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Note from './components/Note'
import Notes from './notes'
import Entry from './components/Entry'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'; 


let newNoteEntry = { 
  key:null,
  title:"",
  content:""
}

// function getNotes(array){
//   return <Note title= {array.title} content={array.content} />
// }


function App() {
  const [entry, setEntry] = useState([])
  const [data, setData] = useState(); 
  const [api, setApi] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  let newArr = []
  useEffect(()=>{
    Axios.get('/app')
    .then((response)=>{
      let res = JSON.parse(response.data)
      res.forEach((element)=>{
        let newObj = {
          title:element.title, 
          content:element.content
        }
        newArr.push(newObj)
        
      })
      if(newArr){
        setEntry(newArr) 
        console.log("DONE!!!!! YIPPPIEEE")
      }
    
  })},[])

  let newNote = function (noteObject){
    let count = 4; 
    count +=1; 
    setEntry((prevItems)=>{
      return [...prevItems, noteObject]
    })

  }


  function dataTwo(noteObject){
    Axios.post('/post',(noteObject),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(()=>{console.log("success")
      console.log("THis is api sent:" + api)}
      )
      .catch((err)=>{
        console.log(err)
      }) 
  }
  function deleteEntry(key){
      
      let newArr = entry.filter((value, index)=>{
        if(index != key){
          return value
        }
      })
      setEntry(newArr)
      
      let element = entry[key]
      // entry.filter((value, index)=>{
      //   if(index == key){
      //     return value
      //   }
      // })
    Axios.post('/delete',(element),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res)=>console.log(res))
    .catch((err)=>{console.log(err)})
  }
  function changeBackground(mode){
    setDarkMode(mode)
  
  }
  useEffect(()=>{
    
    if(!darkMode){
      document.body.style.backgroundColor = "#DEE4E7"
    } else{document.body.style.backgroundColor='#393E46'}
  }, [darkMode])
  return <div className='root-container' style={darkMode ? {backgroundColor:"#393E46"} : {backgroundColor:"#DEE4E7"}}>
    <Header useDarkMode={changeBackground}/>
    <div className='main' >
    <Entry addNote={newNote}   sendData={dataTwo}/>
    {entry.map((element,index)=>{ 
    return <Note title={element.title} content={element.content} key={index} deleteNote={(id)=>{deleteEntry(id)}} id={index} />})}
    
    </div>  
    <Footer />
  </div>
}

export default App
