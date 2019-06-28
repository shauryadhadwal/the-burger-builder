import React, { Component } from 'react';
import classes from './About.css'

class About extends Component {
    render() {
        return (<div className={classes.AboutCard}>
            <h1>About</h1>
            <p>I made this app while exploring React.</p>
        </div>)
    }
}

export default About;