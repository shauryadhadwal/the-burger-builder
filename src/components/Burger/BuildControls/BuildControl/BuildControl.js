import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className="btn-group" role="group" aria-label="Edit Quantity">
            <button type="button" className="btn btn-light" style={{ width: '100px' }}>
                {props.label} <span className="badge badge-light">{props.quantity}</span>
                <span className="sr-only">unread messages</span>
            </button>
            <button type="button" onClick={props.removed} disabled={props.disabled} className="btn btn-danger">-</button>
            <button type="button" onClick={props.added} className="btn btn-success">+</button>
        </div>
        {/* <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
    <button className={classes.More} onClick={props.added}>More</button> */}
    </div>
)

export default buildControl;