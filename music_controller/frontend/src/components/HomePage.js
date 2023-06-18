import React, { Component } from "react"
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Search from "./Search";
import Advertise from "./Advertise";
import Myads from "./Myads";
import Login from "./Login";
import Register from "./Register";
import User from "./User";

export default class HomePage extends Component{
    constructor(props) {
      super(props);
      
    }

    renderHomePage() {
      return (
        <Grid className="body">
          <Grid item xs={12} align="center" className="title">
            <Typography variant="h2">
              Sell your car
            </Typography>
          </Grid>
          <Grid item align="center" className="home_buttons">
            <ButtonGroup>
              <Button variant="contained" color="secondary" to="/search" component={Link} className="button">
                Search
              </Button>
              <Button variant="contained" color="secondary" to = "/advertise" component={Link} className="button">
                Advertise
              </Button>
              <Button variant="contained" color="secondary" to = "/myads" component={Link} className="button">
                My ads
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item align="center" className="home_buttons">
              <Button variant="contained" color="primary" to="/login" component={Link} className="button">
                Login
              </Button>
              <Button variant="contained" color="primary" to="/register" component={Link} className="button">
                Register
              </Button>
              <Button variant="contained" color="primary" to="/user" component={Link} className="button">
                My Profile
              </Button>
          </Grid>
        </Grid>
        )
      }
    
    render(){
        return(
        <Router>
            <Routes>
                <Route path="" element = {this.renderHomePage()}/>
                <Route path="search" element = {<Search/>}/>
                <Route path="advertise" element = {<Advertise/>}/>
                <Route path="myads" element = {<Myads/>}/>
                <Route path="login" element = {<Login/>}/>
                <Route path="register" element = {<Register/>}/>
                <Route path="user" element = {<User/>}/>

            </Routes>
        </Router>)
    }
}


