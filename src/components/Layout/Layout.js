import React from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
const layout = (props) => (
    <React.Fragment>
        <Toolbar />
        <main className={`container-fluid mx-0 p-0 ${classes.Content}`}>
            <div className={classes.ContentPaddedContainer}>
                {props.children}
            </div>
        </main>
    </React.Fragment>
)

export default layout;