import React, { Component } from "react"
import {useState } from "react";
import {BrowserRouter as Router, Switch, Route, Routes, Link} from "react-router-dom"
import { Grid, Button } from "@mui/material";


export default function Search(props){
    const [resp, setResp] = useState([])
    const [Manufacturer, setManufacturer] = useState("Audi");
    const [MaxYear, setMaxYear] = useState(2023);
    const [MinYear, setMinYear] = useState(1960);
    const [MinPrice, setMinPrice] = useState(0);
    const [MaxPrice, setMaxPrice] = useState(999999);
    const [MaxMileage, setMaxMileage] = useState(999999);
    const [Transmission, setTransmission] = useState("Manual");
    const [SortBy, setSortBy]=useState("-price")

    const [Model, setModel] = useState("A1");
    const [Engine, setEngine] = useState(1.0);
    const [Location, setLocation] = useState("Dublin");
    const [Fuel, setFuel] = useState("Petrol");
    const [Colour, setColour] = useState("Black");
    const [Doors, setDoors] = useState(2);
    const [LoggedOut, setLoggedOut] = useState(false);

    const Manuf = ["Audi","Aston Martin", "Bentley", "BMW", "Citreon", "Dacia", "Ferrari", "Honda", "Hyundai", "Jaguar", "Lamborghini","Land Rover", "Lexus", "Maserati", "Mclaren", "Mercedes-Benz", "Porsche","Rolls Royce", "Seat", "Skoda", "Subaru","Tesla", "Toyota", "Volkswagen"];
    let makes = Manuf.map((make, i) => {return (<option value={make}>{make}</option>)})
    
    function validateForm() {

        return MinPrice<=MaxPrice && MinYear<=MaxYear;
    
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

      const handleSubmit = (e) =>{
        e.preventDefault()
        var csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},  
        };

        fetch("/api/advertise?manufacturer="+Manufacturer+"&maxyear="+MaxYear+"&minyear="+MinYear
        +"&maxprice="+MaxPrice+"&minprice="+MinPrice+"&maxmileage="+MaxMileage+"&transmission="+Transmission+"&sortby="+SortBy, requestOptions)
          .then((response) => response.json())
          .then((data) => setResp(data));
      }

    return(
        <Grid className="body">
            <Grid item className="title">
                <h1>Search</h1>
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
                        <label className="form_label">Miniumum Year
                        <input value={MinYear} onChange={(e) => setMinYear(e.target.value)} className="form_input" name="MinYear" max="2023" min="1960" required type={"number"}></input>
                        </label>

                        <label className="form_label">Maxiumum Year
                        <input value={MaxYear} onChange={(e) => setMaxYear(e.target.value)} className="form_input" name="MaxYear" max="2023" min="1960" required type={"number"}></input>
                        </label>
                    </div>

                    <div>
                        <label className="form_label">Miniumum Price
                        <input value={MinPrice} onChange={(e) => setMinPrice(e.target.value)} className="form_input" name="MinPrice" max="999999" min="0" required type={"number"}></input>
                        </label>

                        <label className="form_label">Maxiumum Price
                        <input value={MaxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form_input" name="MaxPrice" max="999999" min="0" required type={"number"}></input>
                        </label>
                    </div>
                    
                    <div>
                        <label className="form_label" >Transmission
                        <select value={Transmission} onChange={(e) => setTransmission(e.target.value)} className="form_input" name="Transmission">
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                        </label>

                        <label className="form_label">Maximum Mileage
                        <input value={MaxMileage} onChange={(e) => setMaxMileage(e.target.value)} className="form_input" name="MaxMileage" max="999999" min="0" type={"number"}required></input>
                        </label>
                    </div>
                    <div>
                        <label className="form_label" >Sort by
                        <select value={SortBy} onChange={(e) => setSortBy(e.target.value)} className="form_input" name="SortBy">
                            <option value="-price">Highest Price</option>
                            <option value="price">Lowest Price</option>
                            <option value="mileage">Lowest Mileage</option>
                            <option value="-year">Newest</option>
                        </select>
                        </label>
                    </div>
                    
                    <div className="buttons">
                        <Button variant="contained" to = "/" component={Link} className="back_button">
                            Back
                        </Button>
                        <Button variant="contained" onClick={handleSubmit} color="secondary" disabled={!validateForm()}  >
                            Submit
                        </Button>
                    </div>   
                </form>
                <div className="wrapper">
                    
                    {resp.length>0&& 
                        <div>
                            {Object.values(resp).map(value =>
                                <div className="advert">
                                    <div className="row">
                                        <div className="column">
                                            <h2>{value.manufacturer}</h2>
                                        </div>
                                        <div className="column">
                                            <h2>€ {value.price}</h2>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={value.image} className="image" ></img>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            <p><b>Year: </b>{value.year}</p>
                                            <p><b>Mileage: </b>{value.mileage} Km</p>
                                            <p><b>Transmission: </b>{value.transmission}</p>
                                            <p><b>Location: </b>{value.location}</p>
                                        </div>
                                        <div className="column">
                                            <p><b>Colour: </b>{value.colour}</p>   
                                            <p><b>Doors: </b>{value.doors}</p> 
                                            <p><b>Engine: </b>{value.engine} L</p>
                                            <p><b>Fuel: </b>{value.fuel}</p>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <h2>Description</h2>
                                        <p>{value.description}</p>
                                    </div>                                       
                                </div>   
                            )}
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    )

}

