/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import {useState} from 'react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)   
//in main, use state to store array, add all the list names to the array, map the array to add new routes for each of the array elements 
//for server side code, change the app.jsx to the default route, but change the fetch methods to only get and post data specific to the current route. 