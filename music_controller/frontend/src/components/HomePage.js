import React, { Component } from "react"
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          roomCode: null,
        };
      }

    async componentDidMount() {
        fetch("/api/user-in-room")
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              roomCode: data.code,
            });
          });
      }

    renderHomePage() {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h3" compact="h3">
                House Party
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        );
      }
    
    render(){
        return(
        <Router>
            <Routes>
                <Route
                exact
                path="/"
                element={
                    this.state.roomCode?(
                        <Navigate to={`/room/${this.state.roomCode}`} />
                    ):(
                        this.renderHomePage()
                    )
                }
                >
                </Route>
                <Route path="/join" element = {<RoomJoinPage/>}/>
                <Route path="/create" element = {<CreateRoomPage/>}/>
                <Route path="/room/:roomCode" element = {<Room/>}/>
            </Routes>
        </Router>)
    }
}


