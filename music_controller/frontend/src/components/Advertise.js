import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import axios from 'axios';
import { color } from "@mui/system";


export default function Advertise(props){
    const [Manufacturer, setManufacturer] = useState("Audi");
    const [Model, setModel] = useState("A1");
    const [Year, setYear] = useState(2023);
    const [Engine, setEngine] = useState(1.0);
    const [Mileage, setMileage] = useState(0);
    const [Location, setLocation] = useState("Dublin");
    const [Fuel, setFuel] = useState("Petrol");
    const [Transmission, setTransmission] = useState("Manual");
    const [Colour, setColour] = useState("Black");
    const [Doors, setDoors] = useState(2);
    const [Description, setDescription] = useState("Default");
    const [Price, setPrice] = useState(0);
    const [LoggedOut, setLoggedOut] = useState(false);
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [file3, setFile3] = useState();
    const [file4, setFile4] = useState();
    useEffect(() => {logged_in()});

    const Manuf = ["Audi","Aston Martin", "Bentley", "BMW", "Citreon", "Dacia", "Ferrari", "Honda", "Hyundai", "Jaguar", "Lamborghini","Land Rover", "Lexus", "Maserati", "Mclaren", "Mercedes-Benz", "Porsche","Rolls Royce", "Seat", "Skoda", "Subaru","Tesla", "Toyota", "Volkswagen"];

    let makes = Manuf.map((make, i) => {return (<option value={make}>{make}</option>)})

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
    
    function handleSubmit(event){
        event.preventDefault();
        var csrftoken = getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('manufacturer', Manufacturer)
        formdata.append('year', Year)
        formdata.append('engine', Engine)
        formdata.append('mileage', Mileage)
        formdata.append('location', Location)
        formdata.append('fuel', Fuel)
        formdata.append('transmission', Transmission)
        formdata.append('colour', Colour)
        formdata.append('doors', Doors)
        formdata.append('description', Description)
        formdata.append('price', Price)
        formdata.append('image1', file)
        formdata.append('image2', file1)
        formdata.append('image3', file2)
        formdata.append('image4', file3)
        formdata.append('image5', file4)
    
        axios.post("/api/advertise", formdata, {
            headers: {'content-type': 'multipart/form-data', 'X-CSRFToken': csrftoken}
        }).then((response) => console.log(response.data));
    }
    
    function logged_in(){
        /* Send fetch request to API endpoint in the backend from here*/
        /*console.log(this.state.manufacturer)
        console.log(this.state.year)*/
        var csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
        };
        fetch("/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => setLoggedOut(data.error));
        //console.log(Description)
        //console.log(Manufacturer)
    }

    if(LoggedOut==true){
        return(<Navigate to='/user'/>)
    }
    else{
        return(
            <Grid>
                <Grid item className="title">
                    <h1>Advertise</h1>
                </Grid>
    
                <Grid item>
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <label className="form_label" >Manufacturer
                            <select value={Manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="form_input">
                            <option value="" disabled selected>Make</option>{makes}
                            </select>
                            </label>
                        </div>
    
                        <div>
                            <label className="form_label">Year
                            <input value={Year} onChange={(e) => setYear(e.target.value)} className="form_input" name="Year" maxValue={2023} minValue={1960} required></input>
                            </label>
    
                            <label className="form_label">Mileage
                            <input value={Mileage} onChange={(e) => setMileage(e.target.value)} className="form_input" name="Mileage" max={999999} min={0} required></input>
                            </label>
                        </div>
    
                        <div>
                            <label className="form_label">Location
                            <input value={Location} onChange={(e) => setLocation(e.target.value)} className="form_input" name="Location" required></input>
                            </label>
    
                            <label className="form_label">Doors
                            <input value={Doors} onChange={(e) => setDoors(e.target.value)} className="form_input" name="Doors" max={5} min={2} required></input>
                            </label>
                        </div>
                        <div>
                            <label className="form_label" >Transmission
                                <select value={Transmission} onChange={(e) => setTransmission(e.target.value)} className="form_input" name="Transmission">
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </label>
                            
                            <label className="form_label" >Fuel Type
                                <select value={Fuel} onChange={(e) => setFuel(e.target.value)} className="form_input" name="Fuel">
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option selected value="Hybrid">Hybrid</option>
                                    <option value="Electric">Electric</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="form_label" >Colour
                                <select value={Colour} onChange={(e) => setColour(e.target.value)} className="form_input" name="Colour">
                                    <option value="Red">Red</option>
                                    <option value="White">White</option>
                                    <option value="Grey">Grey</option>
                                    <option value="Green">Green</option>
                                    <option value="Yelllow">Yellow</option>
                                    <option value="Black">Black</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            
                            <label className="form_label">Engine Size
                            <input value={Engine} onChange={(e) => setEngine(e.target.value)} className="form_input" name="Engine"  required></input>
                            </label>
                        </div>
                        <div>
                            <label className="form_label">Price
                            <input value={Price} onChange={(e) => setPrice(e.target.value)} className="form_input" name="Price" required></input>
                            </label>
                        </div>
                        <div>
                            <label>Description
                            <textarea onChange={(e) => setDescription(e.target.value)} className="form_input"></textarea>
                            </label>
                        </div>
                        <div>
                            <input type="file" className="file_upload" accept="image/png, image/jpeg" onChange={(e) => setFile(e.target.files[0])}/>
                            <input type="file" className="file_upload" accept="image/png, image/jpeg" onChange={(e) => setFile1(e.target.files[0])}/>
                            <input type="file" className="file_upload" accept="image/png, image/jpeg" onChange={(e) => setFile2(e.target.files[0])}/>
                            <input type="file" className="file_upload" accept="image/png, image/jpeg" onChange={(e) => setFile3(e.target.files[0])}/>
                            <input type="file" className="file_upload" accept="image/png, image/jpeg" onChange={(e) => setFile4(e.target.files[0])}/>
                        </div>
    
    
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











/*
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

    
    
    render(){
        return(
            <Grid>
                <Grid item className="title">
                    <h1> Advertise</h1>
                </Grid>
                <Grid item className="title">
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
}*/