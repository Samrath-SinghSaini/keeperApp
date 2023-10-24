import React, { useEffect, useState } from "react"
import axios from 'axios'
function Sidebar(){

    const [listArray, setListArray] = useState([])
    const [inputVal, setInputVal] = useState('')
    useEffect(()=>{
        fetchList()
    }, [])
    function fetchList(){
        axios.get('/list/app')
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
            let payload = {title:inputVal}
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
        <input type="text" onChange={(e)=>{inputChange(e)}} value={inputVal} ></input> <button onClick={addList}>+</button>
        </div>
        <div className="list-name-div">
        <h4>Your Lists</h4>
        <a href='/All'>All</a>
        <p></p>
         {listArray.map((element, index)=>{
            let path= '/'+element
           return  <>
             <a href={path}>{element}</a>
             <p></p>
           
             </>
        })}
        </div>
        
    </div>
}
export default Sidebar