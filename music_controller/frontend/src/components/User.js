import React, { Component } from "react"
import {useState } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";


export default function User(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {

        return email.length > 0 && password.length > 0;
    
    }

    function handleSubmit(event) {

        event.preventDefault();
        console.log(email)
        console.log(password)
    
    }

    return (
        <div>
        <div>
            <h1>Login</h1>
        </div>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
    
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
    
          </Form>
        </div>
        <div>
            <ButtonGroup className="home_buttons">
                <Button variant="contained" to = "/" component={Link} className="back_button">
                    Back
                </Button>
                <Button variant="contained" color="secondary" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </ButtonGroup>
        </div>
    </div>
    
      );

}









  

  

  

  