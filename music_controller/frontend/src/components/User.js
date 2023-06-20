import React, { Component } from "react"
import {useState, useEffect } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";



export default function User(props){
    const [details, setDetails] = useState("");
    const [LoggedIn, setLoggedIn] = useState(true);
    useEffect(() => {handleSubmit()});
    
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function handleSubmit() {
        // Perform API call
        var csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken}, 
          };

        fetch("/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => setDetails(data))
        
        if (details.error==true){
            setLoggedIn(false)
        }
        else{
            setLoggedIn(true)
        }
        //console.log(details)
    }

    function handleLogout(){
        // Perform API call
        var csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken}, 
          };
          
        fetch("/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data))
    
    }

    

    if(LoggedIn==true){
        return(
            <div>
                <div className="title">
                    <h1>My profile</h1>
                </div>
                <div className='user_details'>
                    <h2>Username: {details.username}</h2>
                    <h2>Email: {details.email}</h2>
                    <Button variant="contained" to = "/" component={Link} className="back_button">
                        Back
                    </Button>
                    <Button variant="contained" color="secondary" type="submit" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>      
            </div>
        )
    }
    else{
        return(<Navigate to='/login'/>)
    }
    
}