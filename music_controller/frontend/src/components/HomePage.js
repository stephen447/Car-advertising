import React, { Component } from "react"
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect} from "react-router-dom"
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
        <Router>
            <Routes>
                <Route path='/' element = {<h1>HomePage</h1>}></Route>
                <Route path="/join" element = {<RoomJoinPage/>}/>
                <Route path="/create" element = {<CreateRoomPage/>}/>
                <Route path="/room/:roomCode" element = {<Room/>}/>
            </Routes>
        </Router>)
    }
}


