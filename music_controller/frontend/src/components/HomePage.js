import React, { Component } from "react"
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Search from "./Search";
import Advertise from "./Advertise";
import Myads from "./Myads";
import User from "./User";

export default class HomePage extends Component{
    constructor(props) {
      super(props);
      
    }

    renderHomePage() {
      return (
        <Grid>
          <Grid item xs={12} align="center" >
            <Typography variant="h2" className="home_heading">
              Sell your car
            </Typography>
          </Grid>
          <Grid item xs={12} align="center" className="home_buttons">
            <ButtonGroup className="home_buttons">
              <Button variant="contained" color="primary" to="/search" component={Link}>
                Search
              </Button>
              <Button variant="contained" color="secondary" to = "/advertise" component={Link}>
                Advertise
              </Button>
              <Button variant="contained" color="primary" to = "/myads" component={Link}>
                My ads
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} align="center" className="home_buttons">
              <Button variant="contained" color="primary" to="/user" component={Link} className="buttons">
                Login
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
                <Route path="user" element = {<User/>}/>
            </Routes>
        </Router>)
    }
}


