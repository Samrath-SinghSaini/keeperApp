import React, { useContext, useEffect, useState } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios'
import UserContext from "../Contexts";
function Sidebar(){

    const [listArray, setListArray] = useState([])
    const [inputVal, setInputVal] = useState('')
    let {userName} = useContext(UserContext)
    useEffect(()=>{
        fetchList()
    }, [])
    function fetchList(){
        axios.get('/list/app', {params:{userName:userName}})
        .then((res)=>{
            let listArr = res.data.listNames
            let tempArr = []
            listArr.map((element, index)=>{
                tempArr.push(element.title)
            })
            console.log(tempArr)
            setListArray(tempArr)
        })
    }
    function addList(){
        setListArray(()=>{
            let tempArr = listArray.slice()
            tempArr.push(inputVal)
            console.log(tempArr)
            console.log(inputVal)
            let payload = {title:inputVal, userName:userName}
            axios.post('/list/post', payload,  {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((res)=>{console.log(res)})
              .catch((err)=>{console.log(err)})
            return tempArr
        })
    }
    function inputChange(e){
        setInputVal(e.target.value)
    }
    return <div className="sidebar-div">
        <div className="input-list-div">
        <h4>Add new list</h4>
        <div className="input-div">
        <input type="text" onChange={(e)=>{inputChange(e)}} value={inputVal} ></input> <button  className="add-list-btn" onClick={addList}><AddCircleIcon style={{marginBottom:"-5px"}}/></button>
        </div>
        
        </div>
        <div className="list-name-div">
        <h4>Your Lists</h4>
        <p className="list-name"><a href='/All'>All</a></p>
        <p className="list-name"><a href='/Default'>Default</a></p>
         {listArray.map((element, index)=>{
            let path= '/'+element
           return  <div key={index}>
             <p className="list-name"><a href={path} >{element}</a></p>
             
           
             </div>
        })}
        </div>
        
    </div>
}
export default Sidebar