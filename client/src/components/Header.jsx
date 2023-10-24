import React, {useState, useEffect} from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from "react-router-dom";
function Header(prop){
    const [darkMode, setDarkMode] = useState(false)
    const navigate = useNavigate()

    function toggleDarkMode(){
        if(!darkMode){
            setDarkMode(true)
        } else{
            setDarkMode(false)
        }
    }
    useEffect(()=>{
        prop.useDarkMode(darkMode)
    }, [darkMode])
    return <div className="header-container">
        <h1 className="main-heading">Keeper <EditNoteIcon  style={{fontSize:'32px', margin:'0', position:'relative', top:'8px'}}/></h1>
        <div className="header-btn-div">
        <button className="header-btn" onClick={()=>{navigate('/')}}>Home</button>
        <button className="header-btn"  onClick={()=>{navigate('/login')}}>Login</button>
        <button className="header-btn"  onClick={()=>{navigate('/register')}}>Register</button>
        <button className="header-btn"  onClick={()=>{navigate('/')}}>Logout</button>
        <button className="header-btn" onClick={()=>{toggleDarkMode()}}>{darkMode ? <DarkModeIcon style={{marginBottom:'-5px'}}/> : <LightModeIcon style={{marginBottom:'-5px'}}/>} </button>
        </div>
        
    </div>
}
export default Header