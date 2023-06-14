import React, { Component } from "react"
import {useState } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";


export default function Register(props){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    function validateForm() {

        return email.length > 0 && password.length > 0 && password==password1;
    
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

    return (
        <div>
        <div className="title">
            <h1>Register</h1>
        </div>

        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
    
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group  controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
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









  

  

  

  