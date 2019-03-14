import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className="btn-group" role="group" aria-label="Edit Quantity">
            <button type="button" className="btn btn-light" style={{ width: '100px' }}>
                {props.label} <span className="badge badge-light">{props.quantity}</span>
                <span className="sr-only">unread messages</span>
            </button>
            <button type="button" onClick={props.removed} disabled={props.disabledMin} className="btn btn-danger">-</button>
            <button type="button" onClick={props.added} disabled={props.disabledMax} className="btn btn-success">+</button>
        </div>
    </div>
)

export default buildControl;