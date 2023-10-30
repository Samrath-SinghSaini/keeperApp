import React,{useState, useEffect} from 'react'
import axios from 'axios'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';


function Login(props){

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [submitMessage, setSubmitMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    // useEffect(()=>{
    //     window.open('https://keeperappbackend-ijry.onrender.com', '_blank')
    //   }, [])
      
    const navigate = useNavigate()
    function setVal(e){
        if(e.target.name == 'username'){
            setUserName(e.target.value)
        } else if(e.target.name == 'password'){
            setPassword(e.target.value)
        }
    }
    function showPasswordFunc(){
        !showPassword ? setShowPassword(true) : setShowPassword(false)
        let passwordField = document.getElementById('password')
        if(!showPassword){
          passwordField.type = 'text'
        } else{
          passwordField.type = 'password'
        }
      }
    function sendData(){
        setSubmitMessage('')
        if(userName === '' || password === ''){
            setSubmitMessage('One or more fields are empty, please fill all the fields.')
      return 
        }
        else{
        let userData = {userName:userName, password:password}
        axios.post('/api/user/login', userData, {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.authenticated){
            setSubmitMessage(res.data.message ?? 'You have been logged in')
        
            props.changeLogin(true, userName)
            setTimeout(navigate('/'), 5000)
            }
            else{
                setSubmitMessage(res.data.message ?? 'An error occurred, try again later')
            }
           
        }).catch((err)=>{
            console.log('there was an error with login:', err)
            setSubmitMessage('An error occurred, try again later')
        })
    }
    }
    return <div className="login-container">
    <div className="login-main">
        <h2>Sign In</h2>
        <h3>Log into your account</h3>
        <input type="text" placeholder="username" value={userName} onChange={(e)=>{setVal(e)}} name='username' className='login-input auth-input'></input>
       
        <div className="pass-div">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setVal(e);
          }}
          name="password"
          id="password"
          className="register-input auth-input password-input"
        ></input>
        <button onClick={showPasswordFunc} className="show-pass">{showPassword ? <VisibilityIcon style={{marginBottom:'-10px'}}/> : <VisibilityOffIcon style={{marginBottom:'-10px'}}/>}</button>
        </div>
        <button onClick={sendData} className='auth-btn'>Submit</button>
        <p>{submitMessage}</p>
    </div>
</div>
}

export default Login