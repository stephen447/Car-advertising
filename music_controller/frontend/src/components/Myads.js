import React, { Component } from "react"
import {useState } from "react";
import { render } from "react-dom"
import {BrowserRouter as Router, Switch, Route, Routes, Link, Redirect, Navigate} from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";


export default function Myads(props){
    
    const [resp, setResp] = useState([])
    const [delresp, setDelResp] = useState([])
    const [delID, setDelID] = useState(0)

    const handleSubmit = (e) => {
        /* Send fetch request to API endpoint in the backend from here*/
        e.preventDefault()
        
        fetch("/api/myads?id=8")
          .then((response) => response.json())
          .then((data)=> setResp(data))  
    }

    const handleDelete = (e) => {
        e.preventDefault()
        fetch("/api/delete?id="+delID)
          .then((response) => response.json())
          .then((data) => setDelResp(data));
    }

    return( 
        <div>
            <div>
            <h1>My Ads</h1>
            <Button variant="contained" onClick={handleSubmit}>Fetch My Ads</Button>
            <Button variant="contained" to = "/" component={Link} className="back_button">Back</Button>
            </div>
            <div>
                {resp.length>0&& 
                    <div>
                        <h2>Results</h2>
                        {Object.values(resp).map(value =>
                            <div>
                                <p>{value.manufacturer}</p>
                                <p>{value.year}</p>
                                <p>{value.id}</p>
                            </div>   
                                )}
                    </div>
                }
            </div>
            <div>
                <form  className="form" onSubmit={handleDelete} >
                    <label>
                        Delete
                        <input type="number" onChange={(e)=>setDelID(e.target.value)} className="form_input"/>
                    </label>
                    <input type="submit" value="Submit" className="sub_button"/>
                </form>
                <p>{delresp}</p>
            </div>
            <div className="update"></div>
        </div>
    )

}

