import React, { Component } from "react"
import {useState } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";


export default function Search(props){
    const [manufacturer,setManufacturer] = useState("Audi");
    const [year, setYear] = useState(2020)  
    const [resp, setResp] = useState([])
    
    const handleManufChange = (e) => {
        /*console.log(this.state.manufacturer),*/
        setManufacturer(e.target.value);
    }

    const handleYearChange = (e) => {
        /*console.log(this.state.year),*/
        setYear(e.target.value);
        
    }

    const handleSubmit = (e) => {
        /* Send fetch request to API endpoint in the backend from here*/
        /*console.log(manufacturer)
        console.log(manufacturer)*/
        e.preventDefault()
        
        fetch("/api/search?manufacturer="+manufacturer+"&year="+year)
          .then((response) => response.json())
          /*.then((data) => console.log("A "+data.manufacturer+" was found!"))*/
          .then((data)=> setResp(data))
        console.log(resp)
          
      }
    

    return(
        <Grid>
            <Grid item className="title">
                <h1>Search</h1>
            </Grid>

            <Grid item>
                <form onSubmit={handleSubmit} className="form">
                    <label className="form_label" >Manufacturer</label>
                    <select value={manufacturer} onChange={handleManufChange} className="form_input">
                        <option value="Audi">Audi</option>
                        <option value="BMW">BMW</option>
                        <option selected value="Jaguar">Jaguar</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                    </select>
                    
                    <label className="form_label">Year</label>
                    <select value={year} onChange={handleYearChange} className="form_input" name="Year">
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option selected value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                    <div className="buttons">
                        <Button variant="contained" to = "/" component={Link} className="back_button">
                            Back
                        </Button>
                        <input type="submit" value="Submit" className="sub_button"/>
                    </div>   
                </form>
                <div>
                    
                    {resp.length>0&& 
                        <div>
                            <h2>Results</h2>
                            {Object.values(resp).map(value =>
                                <div>
                                    <p>{value.manufacturer}</p>
                                    <p>{value.year}</p>
                                </div>   
                                    )}
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    )

}

/*
<div>
                        
                        {Object.values(resp).map(value => 
                            <div>
                                <p>{value.manufacturer}</p>
                                
                            </div>
                        )} 
                    </div>




export default class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            manufacturer: 'Audi',
            year: '2020',
            m: [0]
        }
        this.handleManufChange = this.handleManufChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleManufChange(e) {
        /*console.log(this.state.manufacturer),*
        this.setState({manufacturer: e.target.value})
        
    }
    handleYearChange(e) {
        /*console.log(this.state.year),*
        this.setState({year: e.target.value})
        
    }

    handleSubmit(e) {
        /* Send fetch request to API endpoint in the backend from here*
        /*console.log(this.state.manufacturer)
        console.log(this.state.year)*
        e.preventDefault()
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              manufacturer: this.state.manufacturer,
              year: this.state.year
            })
          };
        fetch("/api/search?manufacturer="+this.state.manufacturer)
          .then((response) => response.json())
          /*.then((data) => console.log("A "+data.manufacturer+" was found!"))*
          .then((data)=> this.setState({m: data}))
          
      }
    
    render(){
        return(
            <Grid>
                <Grid item className="title">
                    <h1> Search</h1>
                    <h1> {this.state.m}</h1>
                </Grid>

                <Grid item>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label className="form_label" >Manufacturer</label>
                        <select value={this.state.manufacturer} onChange={this.handleManufChange} className="form_input">
                            <option value="Audi">Audi</option>
                            <option value="BMW">BMW</option>
                            <option selected value="Jaguar">Jaguar</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                        </select>
                        
                        <label className="form_label">Year</label>
                        <select value={this.state.year} onChange={this.handleYearChange} className="form_input" name="Year">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option selected value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
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
}*/