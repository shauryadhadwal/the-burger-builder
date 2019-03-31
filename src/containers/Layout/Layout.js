import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar isAuthenticated={this.props.isAuthenticated} email={this.props.email} />
                <main className={`container-fluid ${classes.Content}`}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        email: state.auth.email
    }
}

export default connect(mapStateToProps)(Layout);