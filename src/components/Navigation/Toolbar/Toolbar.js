import React from 'react';
import burgerLogo from '../../../assets/images/burger-logo.png'
import { NavLink } from 'react-router-dom';

const toolbar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/home"><img src={burgerLogo} width="30px" height="30px" className="d-inline-block align-top" alt="" />
            Burger Builder
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto nav-pills">
                <li className="nav-item">
                    <NavLink className="nav-link px-3" exact to="/home">Home</NavLink>
                </li>
                {
                    props.isAuthenticated &&
                    <li className="nav-item">
                        <NavLink className="nav-link px-3" to="/orders">Orders</NavLink>
                    </li>
                }
                <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/about">About</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav nav-pills">
                <li className="nav-item">
                    {
                        props.isAuthenticated ? (
                            <NavLink className="px-3" to="/logout">Logout</NavLink>
                        ) : (
                                <NavLink className="nav-link px-3" to="/auth">SignIn</NavLink>
                            )
                    }
                </li>
            </ul>
        </div>
    </nav>
)

export default toolbar;