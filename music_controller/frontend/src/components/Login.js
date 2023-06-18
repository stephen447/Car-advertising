import React, { Component } from "react"
import {useState } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";

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

export default function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("Unsucessful");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
      // Perform API call
      event.preventDefault();
      var csrftoken = getCookie('csrftoken');
      //console.log(email)
      //console.log(password)
      const requestOptions = {
          method: 'POST',
          headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
          body: JSON.stringify({
            username: username,
            password: password
          }),
        };
      fetch("/api/login", requestOptions)
        .then((response) => response.json())
        .then((data) => setLoginStatus(data));
      //console.log(loginStatus)
  }
  if(loginStatus=="Unsucessful"){
    return (
      <div>
      <div className="title">
          <h1>Login</h1>
      </div>
      <div className="form">
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label className="form_label">Username</Form.Label>
            <Form.Control autoFocus type="username" className="form_input" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
  
          <Form.Group size="lg" controlId="password">
            <Form.Label className="form_label">Password</Form.Label>
            <Form.Control type="password" className="form_input" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
  
        </Form>
      </div>
      <div>
          <ButtonGroup className="home_buttons">
              <Button variant="contained" to = "/" component={Link} className="back_button">
                  Back
              </Button>
              <Button variant="contained" color="secondary" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                  Login
              </Button>
          </ButtonGroup>
      </div>
      </div>
    );

  }
  else{
    return(<Navigate to='/user'/>)
  }

    

}









  

  

  

  