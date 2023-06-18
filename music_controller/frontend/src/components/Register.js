import React, { Component } from "react"
import {useState, useEffect } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";


export default function Register(props){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    useEffect(() => {handleLogout()});

    function validateForm() {

        return email.length > 0 && password.length > 0 && password==password1;
    
    }
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

    function handleSubmit(event) {
        // Perform API call
        event.preventDefault();
        //console.log(email)
        //console.log(password)
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              username: username,
              password: password
            }),
          };
        fetch("/api/createuser", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data));
    }
    handleLogout();

    return (
        <div>
        <div className="title">
            <h1>Register</h1>
        </div>

        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label className="form_label">Email</Form.Label>
              <Form.Control autoFocus type="email" className="form_input" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group size="lg" controlId="username">
              <Form.Label className="form_label">Username</Form.Label>
              <Form.Control type="username" className="form_input"value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
    
            <Form.Group size="lg" controlId="password">
              <Form.Label className="form_label">Password</Form.Label>
              <Form.Control type="password" className="form_input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group  controlId="password">
              <Form.Label className="form_label">Confirm Password</Form.Label>
              <Form.Control type="password" className="form_input" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            </Form.Group>
          </Form>
        </div>

        <div>
            <ButtonGroup className="home_buttons">
                <Button variant="contained" to = "/" component={Link} className="back_button">
                    Back
                </Button>
                <Button variant="contained" color="secondary" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                    Register
                </Button>
                
            </ButtonGroup>
        </div>

    </div>
      );

}









  

  

  

  