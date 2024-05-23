import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class NavBar extends Component {


    
    render() {
        return (
            <div>
    <header id="header">
        <h1>Hotel Elephant Bay</h1>
        <p>Pinnawala, Sri Lanka</p>
        <nav className="tabs-container">
            <Link to="/Hotel/User/login" className="tab">Sign in</Link>
            <Link to="/Hotel/Customer/register" className="tab">Sign up</Link>
            <Link to="/" className="tab">Home</Link>
            <Link to="/reservations" className="tab">Reservations</Link>
            <Link to="/about" className="tab">About Us</Link>

              
        </nav>
    </header>
</div>
        )
    }
}
