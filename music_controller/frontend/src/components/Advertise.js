import React, { Component } from "react"
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class Advertise extends Component{
    constructor(props){
        super(props)
        this.state={
            manufacturer: 'Audi',
            year: '2020'
        }
        this.handleManufChange = this.handleManufChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleManufChange(e) {
        console.log(this.state.manufacturer),
        this.setState({manufacturer: e.target.value})
        
    }
    handleYearChange(e) {
        console.log(this.state.year),
        this.setState({year: e.target.value})
        
    }

    handleSubmit() {
        /* Send fetch request to API endpoint in the backend from here*/
        /*console.log(this.state.manufacturer)
        console.log(this.state.year)*/
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              manufacturer: this.state.manufacturer,
              year: this.state.year
            }),
          };
        fetch("/api/advertise", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data.manufacturer));
      }
    
    render(){
        return(
            <Grid>
                <Grid item>
                    <h1> Advertise</h1>
                </Grid>
                <Grid item>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label className="form_label">Car Manufacturer
                            <select value={this.state.manufacturer} onChange={this.handleManufChange} className="form_input">
                                <option value="Audi">Audi</option>
                                <option value="BMW">BMW</option>
                                <option selected value="Jaguar">Jaguar</option>
                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                            </select>
                        </label>
                        <label>Year
                            <select value={this.state.year} onChange={this.handleYearChange} className="form_input">
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option selected value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                        </label>
                        <div className="buttons">
                        <Button variant="contained" to = "/" component={Link} className="back_button">
                            Back
                        </Button>
                        <input type="submit" value="Submit" className="sub_button"/>
                    </div>
                    </form>
                </Grid>
                
            </Grid>
            

        )
    }
}