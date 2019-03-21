import React from 'react';
import burgerLogo from '../../../assets/images/burger-logo.png'
import { NavLink } from 'react-router-dom';

const toolbar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/"><img src={burgerLogo} width="30px" height="30px" className="d-inline-block align-top" alt="" />
            Burger Builder
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav nav-pills">
                <li className="nav-item">
                    <NavLink className="nav-link px-1" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link px-1" to="/orders">Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link px-1" to="/about">About</NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default toolbar;