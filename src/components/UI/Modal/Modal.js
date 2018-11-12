import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx';

const modal = (props) => (
    <Auxx>
        <Backdrop show={props.show} closed={props.closed} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translate(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
            {props.children}
        </div>
    </Auxx>
);

export default modal;