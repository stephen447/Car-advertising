import React, { Component } from "react"
import {useState } from "react";
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import {Button, } from "@mui/material";


export default function Myads(props){
    
    const [resp, setResp] = useState([])
    const [delresp, setDelResp] = useState([])

    const handleSubmit = (e) => {
        /* Send fetch request to API endpoint in the backend from here*/
        e.preventDefault()
        
        fetch("/api/myads")
          .then((response) => response.json())
          .then((data)=> setResp(data))  
    }

    const handleDelete = (event, delID) => {
        event.preventDefault()
        fetch("/api/delete?id="+delID)
          .then((response) => response.json())
          .then((data) => setDelResp(data));
          console.log(delresp)
    }

    return( 
        <div className="body">
            <div>
            <h1 className="title">My Ads</h1>
            </div>
            <div className="back_buttons">
                <Button variant="contained" onClick={handleSubmit}>Fetch My Ads</Button>
                <Button variant="contained" to = "/" component={Link} className="back_button">Back</Button>
            </div>
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
                                    <div className="picture">
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
                                    <div>
                                    <Button variant="contained" onClick={(event) => handleDelete(event,value.id)}>Delete</Button>
                                    </div>                                        
                                </div>   
                            )}
                        </div>
                    }
            </div>
        </div>
    )

}

