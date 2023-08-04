import React, {useState, useEffect} from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function Header(prop){
    const [darkMode, setDarkMode] = useState(false)

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
        <button className="dark-mode" onClick={()=>{toggleDarkMode()}}>{darkMode ? <DarkModeIcon/> : <LightModeIcon/>} </button>
    </div>
}
export default Header