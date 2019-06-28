import React from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import { connect } from 'react-redux';

const layout = (props) => {
        return (
            <React.Fragment>
                <Toolbar isAuthenticated={props.isAuthenticated} email={props.email} />
                <main className={`container-fluid ${classes.Content}`}>
                    {props.children}
                </main>
            </React.Fragment>
        );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        email: state.auth.email
    }
}

export default connect(mapStateToProps)(layout);